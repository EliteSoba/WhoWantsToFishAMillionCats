import React, { useState } from 'react';
import { getGuessPencilSvg, getRightSvg, getWikiSvg, getWrongSvg } from '../util/svgs';
import { Popular, QuestionDataWithAnswer } from '../types/types';

interface Props {
  guess: Popular,
  questionData: QuestionDataWithAnswer,
};

const roundNumber = (num: number) => {
  // Default for 10+ and between 1 and 2
  let precision = 2;
  if (num < 10 && num >= 2) {
    // 2-9 are just 1 precision
    precision = 1;
  }
  else if (num < 1) {
    // Decimals are also 1 precision
    precision = 1
  }
  return parseFloat(num.toPrecision(precision));
}

// TODO:
//  expanded view
//   add %s to guesses
//   show categories
//   show suggested by
//   open/close animation
const GuessSummary: React.FC<Props> = ({ guess, questionData }) => {
  const correctRate = roundNumber(questionData.correctRate);
  const closeRate = roundNumber(questionData.closeRate);
  const [expanded, setExpanded] = useState<boolean>(false);

  const renderPill = (guess: Popular, expanded = false) => {
    return (
      <span
        key={guess[0]}
        className={`pill ${guess[1] === 1 ? 'text-emerald-500' : 'text-red-400'}`}
      >
        {guess[0]}
        {expanded && <span className='opacity-80'>{' · '}{guess[2]}%</span>}
      </span>
    );
  };

  return (
    <div className={`group relative bg-emerald-950 pt-1 pb-1.5 select-none svelte-103q45c cursor-pointer ${guess[1] === 1 ? 'correct' : 'incorrect'}`} title={expanded ? undefined: "Tap to expand"} onClick={() => setExpanded(prev => !prev)}>
      <div className="bg-emerald-935 absolute top-0 right-0 bottom-0 z-0" style={{ width: `${(correctRate + closeRate) / 2}%` }}>
        <div className="bg-emerald-925 absolute top-0 right-0 bottom-0 z-0" style={{ width: `${correctRate * 100 / (correctRate + closeRate)}%` }}>
        </div>
      </div>
      <div className="relative z-10">
        <div className={`grid grid-cols-[auto_1fr_auto_30px] items-center pt-1 pr-2 pb-1.5 ${guess[1] === 1 ? 'text-emerald-300' : 'text-red-300'}`}>
          {guess[1] === 1 ? getRightSvg('min-h-[1.75rem] min-w-[1.75rem]') : getWrongSvg('min-h-[1.75rem] min-w-[1.75rem]')}
          <div className="mx-1.5 text-3xl/none sm:text-3xl/tight svelte-103q45c correct clickable end-title">{questionData.title}</div>
          <div className="mr-1">
            <a href="https://en.wikipedia.org/wiki/Dril" target="_blank" title="Open Wikipedia article in new tab" className="bg-emerald-darkest hover:text-emerald-darkest block h-6 w-6 rounded-full p-0.5 text-amber-400 no-underline hover:bg-amber-400">
              {getWikiSvg('h-full w-full')}
            </a>
          </div>
          <div className="text-right font-sans text-sm text-amber-200" title={`${correctRate}% correct, ${closeRate}% close enough`}>{Math.floor(correctRate + closeRate)}<span className="text-xs">%</span></div>
        </div>
        <div className="pill-wrapper relative z-10 px-1 font-sans text-sm/none text-emerald-600 sm:text-base/none svelte-103q45c line-clamp-1">
          {getGuessPencilSvg('text-amber-200 inline mr-0.5')}
          <div className="mr-1 line-clamp-none inline-block whitespace-nowrap text-amber-200 italic">{guess[0]}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline mr-0.5">
            <circle cx="9.001" cy="6" r="4" fill="currentColor"></circle>
            <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4"></ellipse>
            <path fill="currentColor" d="M21 17c0 1.657-2.036 3-4.521 3 .732-.8 1.236-1.805 1.236-2.998 0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.7 5.7 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001"></path>
          </svg>
          {questionData.allAnswers.map(guess => renderPill(guess, expanded))}
        </div>
      </div>
    </div>
  );
}

GuessSummary.displayName = 'GuessSummary';

export default GuessSummary;
