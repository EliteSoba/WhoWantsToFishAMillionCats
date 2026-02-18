import React from 'react';
import { Popular, QuestionDataWithAnswer } from '../types/types';
import StyledLink from './StyledLink';
import WikiLink from './WikiLink';

import { getCameraSvg, getCategoriesSvg, getGuessPencilSvg, getRightSvg, getWrongSvg } from '../util/svgs';

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

  const renderAttribution = () => {
    if (!questionData.attribution) {
      return null;
    }
    const {
      artist,
      licenseUrl,
      licenseName,
      wikimediaSource
    } = questionData.attribution;

    // Sometimes we get artists as <a> tags, but we just want the actual text
    // The options are to create a simple div and inject the HTML in, then read the innerText
    // or, the safer option, to just do this magic regex to strip all tags and hope for the best
    // Source - https://stackoverflow.com/a/6744068
    // Posted by jcomeau_ictx, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-02-17, License - CC BY-SA 4.0
    const artistElement = artist && <span key='artist'>{artist?.replace(/<[^>]*>/g, '')}</span>;
    const licenseInfoElement = licenseUrl
      ? <a href={licenseUrl} target="_blank" key='license'>{licenseName}</a>
      : <span key='license'>{licenseName}</span>;
    const wikimediaSourceElement = <a href={wikimediaSource} target="_blank" key='wikimedia'>Wikimedia Commons</a>;

    const attributionData = interleave([artistElement, licenseInfoElement, wikimediaSourceElement].filter(element => !!element), ' · ');
    return (
      <>
        <div className="h-full">
          {getCameraSvg()}
        </div>
        <div className="dim-links font-sans text-xs text-emerald-600 sm:text-sm">
          {attributionData}
        </div>
      </>
    );
  };

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

    questionData.attribution?.licenseName

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
          {renderAttribution()}
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
