import React from 'react';
import { Popular, QuestionDataWithAnswer } from '../types/types';
import WikiLink from './WikiLink';
import StyledLink from './StyledLink';

import { getCategoriesSvg, getGuessPencilSvg, getRightSvg, getWrongSvg } from '../util/svgs';

interface Props {
  guess: Popular,
  questionData: QuestionDataWithAnswer
}

const correctClasses = 'bk-emerald-400/80 text-[#002218]';

const interleave = (arr: any[], x: any) => arr.flatMap(e => [e, x]).slice(0, -1);

const AnswerScreen: React.FC<Props> = ({ guess, questionData }) => {
  const renderHeader = () => {
    return (
      <section className={`default-padding grid grid-cols-[auto_1fr] items-center gap-x-2 py-3 text-4xl/none tracking-normal sm:text-5xl/none svelte-1l6mrgb text-[#002218] ${guess[1] ? 'bg-emerald-400/80' : 'bg-[#f87171e6]'}`}>
        {guess[1] ? getRightSvg() : getWrongSvg()}
        {questionData.title}
      </section>
    );
  };

  const renderImg = () => {
    if (!questionData.imageData) {
      return null;
    }

    // Scale image to be no taller than 256 px (width gets defaulted to 300 from the API call)
    let width = questionData.imageData.width;
    let height = questionData.imageData.height;
    if (height > 256) {
      width /= (height / 256);
      height = 256;
    }
    return (
      <WikiLink url={`https://en.wikipedia.org/wiki/${questionData.title}`}>
        <img src={questionData.imageData.source} alt={questionData.title} width={width} height={height} className="mw-[10%]" />
      </WikiLink>
    );
  }

  const renderMainSummary = () => {
    const img = renderImg();
    let wikiLink: React.ReactNode | null;
    if (!img) {
      wikiLink = <WikiLink url={`https://en.wikipedia.org/wiki/${questionData.title}`} />;
    }
    return (
      <div className="mx-auto flex min-h-80 max-w-screen-sm items-center justify-center sm:min-h-72 text-amber-100">
        <div>
          {img}
          <div>{questionData.summary}</div>
          {wikiLink}
          <div className="clear-both"></div>
        </div>
      </div>
    )
  }

  const renderSummary = () => {
    const categories = questionData.categories.map(cat => {
      return (
        <StyledLink
          key={cat}
          href={`https://en.wikipedia.org/wiki/Category:${cat.replaceAll(' ', '_')}`}
        >
          {cat}
        </StyledLink>
      );
    });

    const splitCategories = interleave(categories, ' · ');
    return (
      <>
        <section className="from-emerald-darkest/80 bg-linear-to-b to-transparent pt-4 text-base sm:text-lg">
          {renderMainSummary()}
        </section>
        <section className="default-padding grid grid-cols-[auto_1fr] items-center gap-x-1.5 gap-y-2 pt-4 text-emerald-500">
          <div>
            {getGuessPencilSvg()}
          </div>
          <div>
            <span className="font-sans select-none text-base">{'You guessed '}</span>
            <span className="text-base/tight text-amber-200 sm:text-lg/tight">{guess[0]}</span>
          </div>
          <div className="h-full">
            {getCategoriesSvg()}
          </div>
          <div className="text-base/relaxed">
            {splitCategories}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {renderHeader()}
      <div className='overflow-auto pb-4'>
        {renderSummary()}
      </div>
    </>
  );
};

AnswerScreen.displayName = 'AnswerScreen';

export default AnswerScreen;
