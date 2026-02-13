import React from 'react';
import { getGuessPencilSvg, getWikiSvg } from '../util/svgs';

interface Props { };

const GuessSummary: React.FC<Props> = ({ }: Props) => {
  return (
    <div className="group relative bg-emerald-950 pt-1 pb-1.5 select-none svelte-103q45c cursor-pointer" title="Tap to expand">
      <div className="bg-emerald-935 absolute top-0 right-0 bottom-0 z-0">
        <div className="bg-emerald-925 absolute top-0 right-0 bottom-0 z-0">
        </div>
      </div>
      <div className="relative z-10">
        <div className="grid grid-cols-[auto_1fr_auto_30px] items-center pt-1 pr-2 pb-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="icon text-emerald-300 svelte-103q45c">
            <path fill="currentColor" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clipRule="evenodd">
            </path>
          </svg>
          <div className="mx-1.5 text-3xl/none sm:text-3xl/tight svelte-103q45c correct clickable">Dril
          </div>
          <div className="mr-1">
            <a href="https://en.wikipedia.org/wiki/Dril" target="_blank" title="Open Wikipedia article in new tab" className="bg-emerald-darkest hover:text-emerald-darkest block h-6 w-6 rounded-full p-0.5 text-amber-400 no-underline hover:bg-amber-400">
              {getWikiSvg('h-full w-full')}
            </a>
          </div>
          <div className="text-right font-sans text-sm text-amber-200" title="27% correct, 0.4% close enough">28
            <span className="text-xs">%
            </span>
          </div>
        </div>
        <div className="pill-wrapper relative z-10 px-1 font-sans text-sm/none text-emerald-600 sm:text-base/none svelte-103q45c line-clamp-1">
          {getGuessPencilSvg('text-amber-200 inline mr-0.5')}
          <div className="mr-1 line-clamp-none inline-block whitespace-nowrap text-amber-200 italic">dril
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline svelte-103q45c">
            <circle cx="9.001" cy="6" r="4" fill="currentColor">
            </circle>
            <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4">
            </ellipse>
            <path fill="currentColor" d="M21 17c0 1.657-2.036 3-4.521 3 .732-.8 1.236-1.805 1.236-2.998 0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17M18 6a3 3 0 0 1-4.029 2.82A5.7 5.7 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001">
            </path>
          </svg>
          <span className="pill svelte-103q45c text-emerald-500">Dril</span>
          <span className="pill svelte-103q45c text-red-400">Xkcd</span>
          <span className="pill svelte-103q45c text-emerald-500">Wint</span>
          <span className="pill svelte-103q45c text-red-400">Bo Burnham</span>
          <span className="pill svelte-103q45c text-red-400">Jordan Peele</span>
          <span className="pill svelte-103q45c text-red-400">The Oatmeal</span>
          <span className="pill svelte-103q45c text-red-400">Kevin Hart</span>
        </div>
      </div>
    </div>
  );
}

GuessSummary.displayName = 'GuessSummary';

export default GuessSummary;
