import React, { ReactNode, useState } from 'react';

import StartScreen from './StartScreen.tsx';
import Game from './Game.tsx';

type StateTypes = {
  [key: string]: number,
};

const States: StateTypes = {
  START: 1,
  GAME: 2,
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<StateTypes[string]>(States.START);
  const [round, setRound] = React.useState(0);

  const incrementRound = () => setRound(prevRound => prevRound + 1);

  const startCallback = () => {
    setCurrentView(States.GAME);
    incrementRound();
  }

  let content : ReactNode;
  if (currentView === States.START) {
    content = <StartScreen callback={startCallback}/>;
  }
  else {
    content = <Game key={round} replay={startCallback} />;
  }

  return (
    <section className='h-screen flex flex-col'>
      <header className="relative">
        <a
          href="./index.html"
          className="pl-4 sm:pl-8 -translate-y-0.5 leading-none text-amber-400 hover:underline hover:decoration-1 hover:underline-offset-4"
        >
          <span className="xs:text-4xl  text-3xl font-normal tracking-normal md:text-5xl">Who wants to </span>
          <span className="xs:text-4xl  text-3xl font-normal tracking-normal italic md:text-5xl">fish</span>
          <span className="xs:text-4xl font-serif text-3xl font-normal tracking-normal md:text-5xl"> a million </span>
          <span className="xs:text-2xl font-sans text-xl font-bold uppercase md:text-[2.1rem]">Cats?</span>
        </a>
        <div
          className="bg-catfish absolute top-0 right-0 left-0 -z-10 h-[260px] bg-[size:80%] bg-[right_-1px_top_0px] bg-no-repeat sm:bg-[size:65%]">
        </div>
      </header>
      {content}
    </section>
  );
}

export default App;
