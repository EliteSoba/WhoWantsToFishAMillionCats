import React, { MouseEventHandler } from 'react';
import StyledLink from './StyledLink.tsx';

interface Props {
  callback: MouseEventHandler<HTMLButtonElement>
};

const StartScreen: React.FC<Props> = ({ callback }) => {

  const getPlayButton = () => {
    return (
      <button type="button" className="h-full large w-full px-4 [&>svg]:sm:mr-4!" title="Play today [keyboard: Enter]" onClick={callback}>
        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline">
          <path fill="currentColor" fillRule="evenodd" d="M4.25 19a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75m3 3a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path><path fill="currentColor" d="M5.25 12c0 1.178.302 2.286.833 3.25H2a.75.75 0 0 0 0 1.5h9.25v-4.94l-.72.72a.75.75 0 1 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72v4.94H22a.75.75 0 0 0 0-1.5h-4.083A6.75 6.75 0 1 0 5.25 12"></path>
        </svg>
        <span>Play today</span>
      </button>
    )
  }

  return (
    <>
      <div className='info-section mx-auto w-full max-w-screen-sm pb-6'>
        <div className='divide-y-2 divide-dotted divide-emerald-800 border-b-2 border-dotted border-emerald-800'>
          <div className='grid border-collapse grid-cols-[auto_1fr] items-center gap-x-2 py-1.5 text-amber-200 sm:py-2'>
            <div className='text-amber-400 [&>svg]:h-5 [&>svg]:w-5'>
              <svg xmlns='http://www.w3.org/2000/svg' width='1rem' height='1rem' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true' className='inline' slot='icon'>
                <path fill='currentColor' fillRule='evenodd' d='M22 12c0 5.523-4.477 10-10 10-1.6 0-3.112-.376-4.452-1.044a1.63 1.63 0 0 0-1.149-.133l-2.226.596a1.3 1.3 0 0 1-1.591-1.592l.595-2.226a1.63 1.63 0 0 0-.134-1.148A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10m-14.5-.892c0 1.369 1.319 2.805 2.529 3.834.823.7 1.235 1.051 1.971 1.051s1.148-.35 1.971-1.051c1.21-1.03 2.529-2.465 2.529-3.834 0-2.677-2.475-3.676-4.5-1.608-2.025-2.068-4.5-1.069-4.5 1.608' clipRule='evenodd' />
              </svg>
            </div>
            <div className='text-base/normal italic sm:text-xl/tight'>
              {'Data stolen from '}
              <StyledLink href='https://catfishing.net/'>catfishing</StyledLink>.
            </div>
          </div>
        </div>

        <ul className="list-disc marker:text-emerald-600 xs:text-xl/relaxed mt-2 space-y-2 text-lg/relaxed sm:text-2xl/relaxed text-amber-100">
          <li><span className="font-medium text-emerald-400">Guess the Wikipedia article from its categories.</span></li>
          <li>Every day there are <span className="font-medium text-emerald-400">10 notable, diverse, and interesting people, places, and things</span> to guess.</li>
          <li><span className="font-medium text-emerald-400">It's a challenging test of general knowledge,</span> and a source of new Wikipedia discoveries!</li>
        </ul>
      </div>
      <div className="border-y border-emerald-700 h-20 justify-center bg-emerald-900 text-emerald-100 text-3xl">
        {getPlayButton()}
      </div>
    </>
  );
}

StartScreen.displayName = 'StartScreen';

export default StartScreen;
