import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';

import StartScreen from './StartScreen';
import Game from './Game';

const App: React.FC = () => {
  // Jank way of forcing a reload by keying each game instance to a typically unique value
  // this is where all my cs professors get mad at me for trusting dates
  // only matters if going from Game -> Game, which is only the replay button I think
  const location = useLocation();

  return (
    <section className='h-screen flex flex-col'>
      <header className="relative">
        <Link to='/'>
          <div className="pl-4 sm:pl-8 -translate-y-0.5 leading-none text-amber-400 underlined-text">
            <span className="xs:text-4xl text-3xl font-normal tracking-normal md:text-5xl">{'Who wants to '}</span>
            <span className="xs:text-4xl text-3xl font-normal tracking-normal italic md:text-5xl">{'fish'}</span>
            <span className="xs:text-4xl font-serif text-3xl font-normal tracking-normal md:text-5xl">{' a million '}</span>
            <span className="xs:text-2xl font-sans text-xl font-bold uppercase md:text-[2.1rem]">{'Cats?'}</span>
          </div>
        </Link>
        <div className="bg-catfish absolute top-0 right-0 left-0 -z-10 h-65 bg-size-[80%] bg-position-[right_-1px_top_0px] bg-no-repeat sm:bg-size-[65%]" />
      </header>
      <Routes>
        <Route path='/' index element={<StartScreen />} />
        <Route path='game'>
          <Route index element={<Game key={location.state?.lastPlayedDate} />} />
          <Route path='random' element={<Game key={location.state?.lastPlayedDate} />} />
          <Route path=':day' element={<Game key={location.state?.lastPlayedDate} />} />
        </Route>
      </Routes>
    </section>
  );
}

App.displayName = 'App';

export default App;
