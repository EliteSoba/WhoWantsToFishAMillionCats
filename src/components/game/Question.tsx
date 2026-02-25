import React, { useState } from 'react';

import { Popular, QuestionDataWithAnswer } from '../../types/types';
import AnswerScreen from './AnswerScreen';
import { dayToDate } from '../../util/DayUtils';

interface Props {
  questionData: QuestionDataWithAnswer,
  callback: (guess: Popular) => void,
  day: string,
  score: number,

  // TODO: uh should I just pass all game data in directly instead?
  articleCount: number,
  curArticle: number,
}

const Question: React.FC<Props> = ({
  questionData,
  callback,
  day,
  score,
  articleCount,
  curArticle,
}) => {
  const [guess, setGuess] = useState<Popular>(['', 0, 0, 0]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleGuess = (guess: Popular) => {
    setGuess(guess);
    setShowAnswer(true);
  };

  const renderGuess = (guess: Popular) => {
    return (
      <button
        className='bg-emerald-900 enabled:hover:bg-emerald-700 p-4 rounded-md border-emerald-700 border'
        key={guess[0]}
        onClick={() => handleGuess(guess)}
      >
        {guess[0]}
      </button>
    )
  };

  const renderCategories = () => {
    return (
      <>
        {questionData.categories.map(cat => <span key={cat}>{cat}</span>)}
      </>
    );
  };

  const renderGuessScreen = () => {
    return (
      <div className='default-padding overflow-auto'>
        <h3 className="my-2 text-xl font-bold uppercase leading-tight tracking-widest text-emerald-400">Guess the article from its categories</h3>
        <div className="categories [&>span]:separator categories-md text-amber-100 text-2xl leading-normal">
          {renderCategories()}
        </div>
      </div>
    );
  };

  const renderGuesses = () => {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-emerald-700 p-6 font-sans text-sm/none font-bold text-emerald-600'>
        {questionData.allChoices.map(renderGuess)}
      </div>
    );
  };

  const renderAnswerScreen = () => {
    return (
      <AnswerScreen
        guess={guess}
        questionData={questionData}
      />
    );
  };

  const renderNextButton = () => {
    return (
      <button type="button" title="Next [keyboard: Enter]" className="large w-full px-4 h-20" onClick={() => callback(guess)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className='m-2'>
          <path fill="currentColor" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10m.47-13.53a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H8a.75.75 0 0 1 0-1.5h6.19l-1.72-1.72a.75.75 0 0 1 0-1.06" clipRule="evenodd"></path>
        </svg>
        Next
      </button>
    );
  };

  return (
    <>
      {showAnswer ? renderAnswerScreen() : renderGuessScreen()}
      <div className='progress border-t border-emerald-700'>
        <section className="grid grid-cols-[1fr_auto_1fr] items-center font-sans text-sm/none font-bold text-emerald-600 select-none sm:text-base/none default-padding">
          <div>
            {'Q '}
            <data className="text-emerald-200">{curArticle + 1}</data>
            {` · ${articleCount}`}
          </div>
          <div className="bg-[#043d2f] flex h-6 items-center px-3 text-emerald-300 sm:h-7">
            {`${day} · ${dayToDate(day) }`}
          </div>
          <div className="text-right">Score · <data className="text-emerald-200">{score + guess[1]}</data></div>
        </section>
        {showAnswer ? renderNextButton() : renderGuesses()}
      </div>
    </>
  );
}

Question.displayName = 'Question';

export default Question;
