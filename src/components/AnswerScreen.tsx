import React from 'react';
import { Popular, QuestionDataWithAnswer } from '../types/types';

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
      <a href={`https://en.wikipedia.org/wiki/${questionData.title}`} target="_blank" className="bg-[#043d2f] float-right ml-3 flex flex-col items-center border border-emerald-800 px-0.5 pt-0.5 pb-1 text-sm select-none sm:text-base" title="Open Wikipedia in a new tab [keyboard: w]">
        <img src={questionData.imageData.source} alt={questionData.title} width={width} height={height} className="mw-[10%]" />
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="mr-1 inline">
            <path fill="currentColor" d="M8.387 5.08a10 10 0 0 0-.5-.745A6.97 6.97 0 0 1 12 3c1.32 0 2.555.365 3.608 1q-.022.134-.066.303c-.106.399-.272.78-.413 1.002-.049.077-.25.273-.613.544-.162.12-.341.231-.556.36l-.074.043c-.187.112-.402.24-.609.382-.488.334-.996.786-1.338 1.517a2.1 2.1 0 0 0-.12 1.456c.035.135.054.27.055.39 0 .037-.015.096-.097.165a.52.52 0 0 1-.327.118c-1.077-.012-1.927-.904-2.05-2.327-.094-1.082-.536-2.084-1.013-2.874M16.652 14.509q.396-.005.745-.05a7 7 0 0 1-3.418 2.257c-.046-.381-.016-.84.209-1.263.192-.362.678-.633 1.334-.794a5.5 5.5 0 0 1 1.109-.15h.021"></path>
            <path fill="currentColor" d="M5 10c0-1.72.62-3.294 1.648-4.512q.154.215.301.46c.402.664.713 1.416.777 2.15.17 1.97 1.481 3.837 3.705 3.862.961.01 2.126-.712 2.123-1.968 0-.287-.046-.567-.112-.815a.44.44 0 0 1 .019-.315c.17-.364.422-.607.766-.842.16-.11.326-.21.518-.324l.077-.046c.216-.129.461-.278.698-.454.345-.257.79-.618 1.027-.99.187-.294.36-.671.494-1.063A6.98 6.98 0 0 1 19 10q-.002.799-.172 1.55c-.067.199-.151.385-.303.582-.237.307-.712.685-1.89.697h-.036l-.096.003a7.134 7.134 0 0 0-1.382.195c-.759.186-1.871.61-2.417 1.639-.43.811-.48 1.645-.382 2.327A7.003 7.003 0 0 1 5 10"></path>
            <path fill="currentColor" fillRule="evenodd" d="M18.004 1.5a.75.75 0 0 1 1.058-.059 11.04 11.04 0 0 1 3.688 8.246c0 5.751-4.389 10.478-10 11.013v.55H14a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1 0-1.5h1.25v-.509a11.04 11.04 0 0 1-7.809-3.678.75.75 0 1 1 1.118-1 9.54 9.54 0 0 0 7.128 3.187 9.563 9.563 0 0 0 9.563-9.563 9.54 9.54 0 0 0-3.188-7.128.75.75 0 0 1-.059-1.06" clipRule="evenodd"></path>
          </svg>
          Open Wikipedia
        </span>
      </a>
    );
  }

  const renderSummary = () => {
    const categories = questionData.categories.map(cat => {
      return (
        <a
          key={cat}
          href={`https://en.wikipedia.org/wiki/Gategory:${cat.replaceAll(' ', '_')}`}
          target='_blank'
          className='underline decoration-1 underline-offset-4 not-italic text-amber-400'
        >
          {cat}
        </a>
      );
    });

    const splitCategories = interleave(categories, ' · ');
    return (
      <>
        <section className="from-emerald-darkest/80 bg-gradient-to-b to-transparent pt-4 text-base sm:text-lg">
          <div className="mx-auto flex min-h-80 max-w-screen-sm items-center justify-center sm:min-h-72 text-amber-100">
            <div>
              {renderImg()}
              <div>{questionData.summary}</div>
              <div className="clear-both"></div>
            </div>
          </div>
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
