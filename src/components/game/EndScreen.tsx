import React from 'react';
import { dayToDate } from '../../util/DayUtils';
import GuessSummary from './GuessSummary';
import { Popular, QuestionDataWithAnswer } from '../../types/types';

interface Props {
  score: number,
  day: string,
  guesses: Popular[],
  allQuestionData: QuestionDataWithAnswer[],
};

const EndScreen: React.FC<Props> = ({ score, day, guesses, allQuestionData }) => {
  const renderHeader = () => {
    return (
      <section className="default-padding grid select-none grid-cols-[1fr_auto] items-center gap-x-4 bg-emerald-300/20 py-2 sm:py-4">
        <div className="text-lg/normal sm:text-2xl/normal text-amber-100">You scored <span className={`badge-large inline-flex h-7 justify-center ${score ? 'badge-emerald' : 'badge-red'}`}>{score}</span></div>
        <div className="text-right font-sans text-xs/tight font-bold uppercase tracking-wider text-amber-100 sm:text-base/tight">
          Day {day}
          <br />
          {dayToDate(day)}
        </div>
      </section>
    );
  };

  const renderCorrectness = () => {
    return (
      <div className="text-right font-sans text-sm/none italic text-emerald-500 sm:text-base/none">
        Players who were correct or close
        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline h-[1.2em] w-[1.2em]">
          <path fill="currentColor" fillRule="evenodd" d="M17.53 13.97a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-5-5a.75.75 0 1 1 1.06-1.06l3.72 3.72V9.5c0-.713-.22-1.8-.859-2.687C9.781 5.965 8.756 5.25 7 5.25a.75.75 0 0 1 0-1.5c2.244 0 3.72.952 4.609 2.187.861 1.196 1.141 2.61 1.141 3.563v8.19l3.72-3.72a.75.75 0 0 1 1.06 0" clipRule="evenodd"></path>
        </svg>
      </div>
    );
  };

  const renderContents = () => {
    return (
      <section className="default-padding pt-4 overflow-auto">
        <div className="min-w-0 sm:row-span-3 sm:row-start-1">
          <div className="pb-4">
            <div className="flex items-end justify-between pb-2">
              <h3 className="mb-0!">Questions</h3>
              {renderCorrectness()}
            </div>
            <div className="divide-y divide-dotted divide-emerald-900">
              {guesses.map((guess, i) => <GuessSummary key={i} guess={guess} questionData={allQuestionData[i]} />)}
              <div key='dumb-empty-div-just-to-force-the-bottom-divider-border' />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {renderHeader()}
      {renderContents()}
    </>
  );
}

EndScreen.displayName = 'EndScreen';

export default EndScreen;
