import React, { useState } from 'react';
import { getCategoriesSvg, getGuessPencilSvg, getPeopleSvg, getRightSvg, getSuggestionSvg, getWikiSvg, getWrongSvg } from '../util/svgs';
import { Popular, QuestionDataWithAnswer } from '../types/types';
import StyledLink from './StyledLink';

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
//   show suggested by
//   open/close animation
const GuessSummary: React.FC<Props> = ({ guess, questionData }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const correctRate = roundNumber(questionData.correctRate);
  const closeRate = roundNumber(questionData.closeRate);

  const renderPill = (guess: Popular) => {
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

  const renderSuggested = () => {
    if (!questionData.suggestedBy) {
      return null;
    }
    return (
      <>
        <div className="mt-1 flex items-center gap-x-1 py-1 text-sm/none sm:text-base/none">
          {getSuggestionSvg('mr-0.5 inline text-emerald-600')}
          <div className="font-sans text-xs/none text-emerald-600 sm:text-sm/none">{'Suggested by '}</div>
          <div className="whitespace-nowrap text-amber-200">{questionData.suggestedBy}</div>
        </div>
      </>
    );
  };

  const renderCats = () => {
    if (!expanded) {
      return null;
    }
    return (
      <div className='text-sm/relaxed sm:text-base/relaxed'>
        <div className='text-amber-dim-UNUSED'>
          {getCategoriesSvg('inline mr-0.5 text-[#7f7623]')}
          <span className="categories">
            {questionData.categories.map(cat => <span key={cat}><StyledLink href={`https://en.wikipedia.org/wiki/Category:${cat.replaceAll(' ', '_')}`} className='not-hover:decoration-[#7f7623]'>{cat}</StyledLink></span>)}
          </span>
        </div>
        {renderSuggested()}
      </div>
    )
  };

  return (
    <div className={`group relative bg-emerald-950 pt-1 pb-1.5 select-none cursor-pointer ${guess[1] === 1 ? 'correct' : 'incorrect'} ${expanded ? 'expanded' : ''}`} title={expanded ? undefined : "Tap to expand"} onClick={() => setExpanded(prev => !prev)}>
      <div className="bg-emerald-935 absolute top-0 right-0 bottom-0 z-0" style={{ width: `${(correctRate + closeRate) / 2}%` }}>
        <div className="bg-emerald-925 absolute top-0 right-0 bottom-0 z-0" style={{ width: `${correctRate * 100 / (correctRate + closeRate)}%` }}>
        </div>
      </div>
      <div className="relative z-10">
        <div className={`grid grid-cols-[auto_1fr_auto_30px] items-center pt-1 pr-2 pb-1.5 group-[.correct]:text-emerald-300 group-[.incorrect]:text-red-300`}>
          {guess[1] === 1 ? getRightSvg('min-h-[1.75rem] min-w-[1.75rem]') : getWrongSvg('min-h-[1.75rem] min-w-[1.75rem]')}
          <div className="mx-1.5 text-3xl/none sm:text-3xl/tight correct clickable end-title">{questionData.title}</div>
          <div className="mr-1">
            <a href="https://en.wikipedia.org/wiki/Dril" target="_blank" title="Open Wikipedia article in new tab" className="bg-emerald-darkest hover:text-emerald-darkest block h-6 w-6 rounded-full p-0.5 text-amber-400 no-underline hover:bg-amber-400">
              {getWikiSvg('h-full w-full')}
            </a>
          </div>
          <div className="text-right font-sans text-sm text-amber-200" title={`${correctRate}% correct, ${closeRate}% close enough`}>{Math.floor(correctRate + closeRate)}<span className="text-xs">%</span></div>
        </div>
        <div className="pill-wrapper relative z-10 px-1 font-sans text-sm/none text-emerald-600 sm:text-base/none  line-clamp-1 group-[.expanded]:line-clamp-none">
          {getGuessPencilSvg('text-amber-200 inline mr-0.5')}
          <div className="mr-1 line-clamp-none inline-block whitespace-nowrap text-amber-200 italic">{guess[0]}</div>
          {getPeopleSvg('inline mr-0.5')}
          {questionData.allAnswers.map(renderPill)}
        </div>
        {renderCats()}
      </div>
    </div>
  );
}

GuessSummary.displayName = 'GuessSummary';

export default GuessSummary;
