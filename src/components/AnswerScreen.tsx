import React from 'react';
import { Popular, QuestionDataWithAnswer } from '../types/types';
import WikiLink from './WikiLink.tsx';
import StyledLink from './StyledLink.tsx';

interface Props {
  guess: Popular,
  questionData: QuestionDataWithAnswer
}

const rightSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline" width="1em" height="1em">
    <path fill="currentColor" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clipRule="evenodd"></path>
  </svg>
);

const wrongSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline" width="1em" height="1em">
    <path fill="currentColor" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clipRule="evenodd"></path>
  </svg>
);

const correctClasses = 'bk-emerald-400/80 text-[#002218]';

const interleave = (arr: any[], x: any) => arr.flatMap(e => [e, x]).slice(0, -1);

const AnswerScreen: React.FC<Props> = ({ guess, questionData }) => {
  const renderHeader = () => {

    return (
      <section className={`default-padding grid grid-cols-[auto_1fr] items-center gap-x-2 py-3 text-4xl/none tracking-normal sm:text-5xl/none svelte-1l6mrgb text-[#002218] ${guess[1] ? 'bg-emerald-400/80' : 'bg-[#f87171e6]'}`}>
        {guess[1] ? rightSvg : wrongSvg}
        {questionData.title}
      </section>
    );
  };

  const renderImg = () => {
    if (!questionData.imageData) {
      return null;
    }
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
      wikiLink = <WikiLink url={`https://en.wikipedia.org/wiki/${questionData.title}`}/>;
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
        <section className="grid grid-cols-[auto_1fr] items-center gap-x-1.5 gap-y-2 pt-4 text-emerald-500">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline">
            <path fill="currentColor" d="m11.4 18.161 7.396-7.396a10.3 10.3 0 0 1-3.326-2.234 10.3 10.3 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.6 6.6 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56q.647-.308 1.211-.749c.318-.248.607-.537 1.184-1.114M20.848 8.713a3.932 3.932 0 0 0-5.561-5.561l-.887.887.038.111a8.75 8.75 0 0 0 2.092 3.32 8.75 8.75 0 0 0 3.431 2.13z"></path>
            </svg>
          </div>
          <div>
            <span className="label svelte-1l6mrgb">{'You guessed '}</span>
            <span className="text-base/tight text-amber-200 sm:text-lg/tight">{guess[0]}</span>
          </div>
          <div className="h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline">
              <path fill="currentColor" fillRule="evenodd" d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M7.25 8A.75.75 0 0 1 8 7.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M8 15.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z" clipRule="evenodd"></path>
            </svg>
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
      <div className='default-padding overflow-auto pb-4'>
        {renderSummary()}
      </div>
    </>
  );
};

AnswerScreen.displayName = 'AnswerScreen';

export default AnswerScreen;
