import React from 'react';
import { dayToDate } from '../util/DayUtils.ts';

interface Props {
  score: number,
  day: string
};

const EndScreen: React.FC<Props> = ({ score, day }) => {
  const renderHeader = () => {
    return (
      <section className="default-padding grid select-none grid-cols-[1fr_auto] items-center gap-x-4 bg-emerald-300/20 py-2 sm:py-4">
        <div className="text-lg/normal sm:text-2xl/normal">You scored <span className="badge-large svelte-14dvxjo badge-emerald">{score}</span></div>
        <div className="text-right font-sans text-xs/tight font-bold uppercase tracking-wider text-amber-100 sm:text-base/tight">
           Day {day}
           <br />
           {dayToDate(day)}
        </div>
      </section>
    );
  };
  return (
    <>
      {renderHeader()}
    </>
  );
}

EndScreen.displayName = 'EndScreen';

export default EndScreen;
