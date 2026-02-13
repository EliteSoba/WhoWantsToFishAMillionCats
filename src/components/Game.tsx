import React, { useEffect, useState } from 'react';

// import data from '../data/catfishing.json';

import { GameDay, QuestionData, QuestionDataWithAnswer, WikiData } from '../types/types';
import Question from './Question';
import CatfishingData from '../data/catfishing.json';
import EndScreen from './EndScreen';

const wikiTemplate = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&formatversion=2&redirects=1&prop=extracts%7Cpageimages&exchars=500&exintro=1&explaintext=1&piprop=name%7Cthumbnail&pithumbsize=300&pilicense=free&exlimit=10&pilimit=10&titles=';
const wikiImageTemplate = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&formatversion=2&prop=imageinfo&iiprop=extmetadata%7Curl&iiextmetadatafilter=Artist%7CLicenseShortName%7CLicenseUrl&titles=';

interface Props {
  replay: () => void
};

const Game: React.FC<Props> = ({ replay }) => {
  const [gameData, setGameData] = useState<QuestionDataWithAnswer[] | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // no clue why this needs a default value
  const [chosenDay, setChosenDay] = useState<string>('0');

  useEffect(() => {
    (async () => {
      // TODO: both of these approaches kinda suck
      // const data = await import('../data/catfishing.json') as any;
      const data: any = CatfishingData;

      const allDays = Object.keys(data);
      let chosenDay = allDays[Math.floor(Math.random() * allDays.length)];
      const paramDay = new URLSearchParams(window.location.search).get('day');
      if (paramDay) {
        chosenDay = paramDay;
      }
      setChosenDay(chosenDay);

      const dayData = data[chosenDay] as GameDay;

      // TODO: what to do if dayData is undefined

      const gameData = dayData.articles.map((article, i) => {
        const popular = dayData.stats.articles[i].popular;

        // Pick a random passing answer from all the popular answers that were accepted
        const correctAnswers = popular.filter(data => data[1] === 1);
        const correctAnswer = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];

        const incorrectGuesses = popular.filter(data => data[1] === 0);
        if (correctAnswer && incorrectGuesses.length >= 3) {
          return {
            title: article.title,
            categories: article.categories,
            correctAnswer: correctAnswer,
            wrongAnswers: incorrectGuesses.slice(0, 3)
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

  if (index + 8 >= gameData.length) {
    // TODO: game ended screen
    return (
      <>
        <EndScreen score={score} day={chosenDay} />
        <button
          onClick={() => replay()}
          className='bg-emerald-900 enabled:hover:bg-emerald-700 p-4 rounded-md border-emerald-700 border font-sans text-sm/none font-bold text-emerald-600 w-fit'
        >
          Play Again?
        </button>
      </>
    );
  }

  const answerQuestion = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    incrementIndex();
  };

  return (
    <Question
      key={index}
      questionData={gameData[index]}
      callback={wasCorrect => answerQuestion(wasCorrect)}
      day={chosenDay}
      score={score}
      articleCount={gameData.length}
      curArticle={index}
    />
  );
}

Game.displayName = 'Game';

export default Game;
