import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import StartScreen from './game/StartScreen';
import Game from './game/Game';
import Archive from './archive/Archive';
import { getArchiveSvg } from '../util/svgs';

const App: React.FC = () => {
  // Jank way of forcing a reload by keying each game instance to a typically unique value
  // this is where all my cs professors get mad at me for trusting dates
  // only matters if going from Game -> Game, which is only the replay button I think
  const location = useLocation();

  // TODO: Menu items can probably be abstracted but I only have one
  //  maybe a fast replay-random button on top?
  //  also maybe better active class checking? this one is ugly and i should just do location.pathname.split('/') or something
  return (
    <section className='min-h-dvh'>
      <div className='max-h-dvh flex flex-col'>
        <header className="relative flex">
          <Link to='/'>
            <div className="pt-4 pl-4 sm:pl-8 -translate-y-0.5 leading-none text-amber-400 underlined-text">
              <span className="xs:text-4xl text-2xl font-normal tracking-normal md:text-5xl">{'Who wants to '}</span>
              <span className="xs:text-4xl text-2xl font-normal tracking-normal italic md:text-5xl">{'fish'}</span>
              <span className="xs:text-4xl font-serif text-2xl font-normal tracking-normal md:text-5xl">{' a million '}</span>
              <span className="xs:text-2xl font-sans text-xl font-bold uppercase md:text-[2.5rem]">{'Cats?'}</span>
            </div>
          </Link>
          <menu className="flex grow items-stretch justify-end gap-x-0.5">
            <Link to="/archive" title="Archive" className={`${location.pathname.includes('archive') ? 'bg-[#fde68a4d]' : ''} is-link flex flex-col px-2 items-center justify-center w-full max-w-22 gap-y-1`}>
              {getArchiveSvg('inline w-6 h-6')}
              <span className="font-sans">Archive</span>
            </Link>
          </menu>
          <div className="bg-catfish absolute top-0 right-0 left-0 -z-10 h-65 bg-size-[80%] bg-position-[right_-1px_top_0px] bg-no-repeat sm:bg-size-[65%]" />
        </header>
        <Routes>
          <Route path='/' index element={<StartScreen />} />
          <Route path='game'>
            <Route index element={<Game key={location.state?.lastPlayedDate} />} />
            <Route path='random' element={<Game key={location.state?.lastPlayedDate} />} />
            <Route path=':day' element={<Game key={location.state?.lastPlayedDate} />} />
          </Route>
          <Route path='archive/*' element={<Archive />} />
        </Routes>
      </div>
    </section>
  );
}

App.displayName = 'App';

export default App;
