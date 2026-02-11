import React, { useEffect, useState } from 'react';

// import data from '../data/catfishing.json';

import { GameDay, QuestionData, QuestionDataWithAnswer, WikiData } from '../types/types';
import Question from './Question.tsx';

const wikiTemplate = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&formatversion=2&redirects=1&prop=extracts%7Cpageimages&exchars=500&exintro=1&explaintext=1&piprop=name%7Cthumbnail&pithumbsize=300&pilicense=free&exlimit=10&pilimit=10&titles=';
const wikiImageTemplate = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&formatversion=2&prop=imageinfo&iiprop=extmetadata%7Curl&iiextmetadatafilter=Artist%7CLicenseShortName%7CLicenseUrl&titles=';

interface Props {
  replay: () => void
};

const Game:React.FC<Props> = ({ replay }) => {
  const [gameData, setGameData]= useState<QuestionDataWithAnswer[] | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // no clue why this needs a default value
  const [chosenDay, setChosenDay] = useState<string>('0');

  useEffect(() => {
    (async () => {
      const data = await import('../data/catfishing.json') as any;

      const allDays = Object.keys(data);
      let chosenDay = allDays[Math.floor(Math.random() * allDays.length)];
      // chosenDay = "343";
      setChosenDay(chosenDay);

      const dayData = data[chosenDay] as GameDay;

      const gameData = dayData.articles.map((article, i) => {
        const popular = dayData.stats.articles[i].popular;
        const correctAnswer = popular.find(data => data[1] === 1);
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
      const wikiQuery = gameData.map(({ title }) => title).join('|');
      const wikiData = await fetch(`${wikiTemplate}${wikiQuery}`);
      const parsedData = await wikiData.json() as WikiData;
      // Note: this is necessary for attributions
      // const wikiImageQuery = parsedData.pages.map(({ pageImage }) => pageImage)
      //   .filter(image => !!image)
      //   .join('|');
      // const wikiImageData = await fetch(`${wikiImageQuery}${wikiImageQuery}`);
      // const parsedImages =
      console.log(parsedData);

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
        <div className='font-sans text-sm/none font-bold text-emerald-600'>
          game over
        </div>
        <div className='font-sans text-sm/none font-bold text-emerald-600'>score: {score} / {gameData.length}</div>
        <button
          onClick={() => replay()}
          className='bg-emerald-900 enabled:hover:bg-emerald-700 p-4 rounded-md border-emerald-700 border font-sans text-sm/none font-bold text-emerald-600'
        >
          play again?
        </button>
      </>
    );
  }

  const answerQuestion = (wasCorrect: boolean) => {
    if (wasCorrect) {
      console.log('correct');
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
