import React, { useEffect, useState } from 'react';

import { GameDay, Popular, QuestionData, QuestionDataWithAnswer, WikiData } from '../types/types';
import Question from './Question';
import EndScreen from './EndScreen';
import { randomInt, shuffleArray } from '../util/Util';

const wikiTemplate = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&formatversion=2&redirects=1&prop=extracts%7Cpageimages&exchars=500&exintro=1&explaintext=1&piprop=name%7Cthumbnail&pithumbsize=300&pilicense=free&exlimit=10&pilimit=10&titles=';
const wikiImageTemplate = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&formatversion=2&prop=imageinfo&iiprop=extmetadata%7Curl&iiextmetadatafilter=Artist%7CLicenseShortName%7CLicenseUrl&titles=';

interface Props {
  replay: () => void
};

const Game: React.FC<Props> = ({ replay }) => {
  const [gameData, setGameData] = useState<QuestionDataWithAnswer[] | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [guesses, setGuesses] = useState<Popular[]>([]);

  // no clue why this needs a default value
  const [chosenDay, setChosenDay] = useState<string>('0');

  useEffect(() => {
    (async () => {
      // Surely there's a cleaner implementation
      const MIN_DAY = 32;
      const ZEROTH_DAY: any = new Date('2024-06-24');
      let MAX_DAY = Math.floor((new Date() as any - ZEROTH_DAY) / (24 * 3_600_000));

      let chosenDay = `${randomInt(MAX_DAY - MIN_DAY) + MIN_DAY}`;
      const paramDay = new URLSearchParams(window.location.search).get('day');
      if (paramDay) {
        chosenDay = paramDay;
      }
      setChosenDay(chosenDay);

      const dayData = await (await fetch(`./data/${chosenDay}.json`)).json() as GameDay;

      // TODO: what to do if dayData is undefined
      const gameData = dayData.articles.map((article, i) => {
        const popular = dayData.stats.articles[i].popular;

        // In an ideal world we'd have 1 correct answer and 3 incorrect but vaguely believable,
        // but distinct choices. Not only would this be annoying/hard to implement, but it's
        // also particularly painful because I don't actually have a lot of data to work with.
        // The base idea of 1 correct answer and 3 random incorrect answers has a few key issues:
        // 1. There may not be enough incorrect answers to reach the necessary 4 choices
        // 2. Many wrong answers are very similar, which allows people to metagame
        // Our solution instead is to pick between 1-3 correct answers, and fill the remaining space
        // with random incorrect answers, which should solve all these issues.
        // We still need to be able to pad in case there aren't enough options.

        // y = 3 * x^3 + 1. Odds are { 1: 69%, 2: 18%, 3: 13% }
        // Is this a completely arbitrary calculation? Absolutely
        const numCorrectToPick = Math.floor(Math.pow(Math.random(), 3) * 3) + 1;

        // Pick a random passing answer from all the popular answers that were accepted
        const shuffledAnswers = shuffleArray(popular);
        const correctAnswers = shuffledAnswers.filter(data => data[1] === 1).slice(0, numCorrectToPick);
        const incorrectGuesses = shuffledAnswers.filter(data => data[1] === 0).slice(0, correctAnswers.length);

        let allChoices = [...correctAnswers, ...incorrectGuesses];
        allChoices = allChoices.concat(shuffledAnswers.filter(data => !allChoices.includes(data))).slice(0, 4);
        allChoices = shuffleArray(allChoices);

        if (allChoices.length === 4) {
          return {
            title: article.title,
            categories: article.categories,
            allChoices: allChoices,
            correctRate: dayData.stats.articles[i].correctRate,
            closeRate: dayData.stats.articles[i].closeRate,
            allAnswers: popular,
          } as QuestionData;
        }
        return null;
      }).filter(a => !!a);

      if (gameData.length === 0) {
        throw Error('Picked a day with no articles');
      }

      // TODO: this can take a while. Loading screen?
      // TODO: Manually replacing '&' chars, but idk what other problematic chars there are
      const wikiQuery = gameData.map(({ title }) => encodeURI(title).replaceAll('&', '%26')).join('|');
      const wikiData = await fetch(`${wikiTemplate}${wikiQuery}`);
      const parsedData = await wikiData.json() as WikiData;
      // Note: this is necessary for attributions
      // const wikiImageQuery = parsedData.pages.map(({ pageImage }) => pageImage)
      //   .filter(image => !!image)
      //   .join('|');
      // const wikiImageData = await fetch(`${wikiImageQuery}${wikiImageQuery}`);
      // const parsedImages =

      const gameDataWithAnswer = gameData.map(questionData => {
        const wikiData = parsedData.query.pages.find(({ title }) => title === questionData.title);
        if (!wikiData) {
          return null;
        }
        return {
          ...questionData,
          summary: wikiData.extract,
          imageData: wikiData.thumbnail,
        };
      }).filter(data => !!data);

      setGameData(gameDataWithAnswer);
    })();
  }, []);

  const incrementIndex = () => {
    setIndex(i => i + 1);
  }

  if (gameData === null) {
    return null;
  }

  if (index >= gameData.length) {
    // TODO: game ended screen
    return (
      <>
        <EndScreen score={score} day={chosenDay} guesses={guesses} allQuestionData={gameData} />
        <div className='default-padding'>
          <button
            onClick={() => replay()}
            className='bg-emerald-900 enabled:hover:bg-emerald-700 p-4 rounded-md border-emerald-700 border font-sans text-sm/none font-bold text-emerald-600 w-fit'
          >
            Play Again?
          </button>
        </div>
      </>
    );
  }

  const answerQuestion = (guess: Popular) => {
    setGuesses(prevGuesses => [...prevGuesses, guess]);
    if (guess[1] === 1) {
      setScore(prevScore => prevScore + 1);
    }
    incrementIndex();
  };

  return (
    <Question
      key={index}
      questionData={gameData[index]}
      callback={guess => answerQuestion(guess)}
      day={chosenDay}
      score={score}
      articleCount={gameData.length}
      curArticle={index}
    />
  );
}

Game.displayName = 'Game';

export default Game;
