import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { monthInfo, yearMonths } from '../../types/types';
import { getLeftArrowSvg, getRightArrowSvg, getThisMonthSvg } from '../../util/svgs';
import { FIRST_VALID_DAY, nth, ZEROTH_DAY, getLatestGame, getEarliestGame } from '../../util/DayUtils';

interface Props {
  yearMonths: monthInfo[],
};

const MonthView: React.FC<Props> = ({
  yearMonths
}) => {
  const params = useParams();
  const today = new Date();

  let yearmonth = yearMonths.find(({ link }) => link === params.yearmonth) || yearMonths[yearMonths.length - 1];

  const yearmonthIndex = yearMonths.findIndex(ym => ym === yearmonth);
  const prev = yearMonths[yearmonthIndex - 1];
  const next = yearMonths[yearmonthIndex + 1];

  const nextMonth = new Date(yearmonth.first);
  nextMonth.setMonth(yearmonth.first.getMonth() + 1);

  // rounding because im dealing with DST here and idc how to get around it right now lmao
  const numDaysInMonth = Math.round((nextMonth.getTime() - yearmonth.first.getTime()) / (24 * 3_600_000));

  const renderPrevSelector = () => {
    if (!prev) {
      return <div />;
    }
    return (
      <Link to={`/archive/${prev.link}`} className={'is-link text-xl'}>
        {getLeftArrowSvg('mr-1 inline')}
        <span className="sm:inline hidden">Previous</span>
      </Link>
    );
  };

  const renderNextSelector = () => {
    if (!next) {
      return <div />;
    }
    return (
      <Link to={`/archive/${next.link}`} className="text-right is-link text-xl">
        <span className="sm:inline hidden">Next</span>
        {getRightArrowSvg('ml-1 inline')}
      </Link>
    );
  };

  // TODO: change "this month" selector to be active iff !next
  // also the entire calendar and the whole styling thing and the whole cleanup thing

  const month = yearmonth.first.toLocaleDateString('en-US', { month: 'long' });
  const year = yearmonth.first.getFullYear();

  const firstDOW = yearmonth.first.getDay();
  const allDays = [...new Array(firstDOW)].map((_, i) => <div key={-i} />);


  for (let i = 0; i < numDaysInMonth; i++) {
    const curDay = new Date(yearmonth.first.getTime() + i * 24 * 3_600_000);

    // TODO: idk how this math works lmao too much rounding
    const gameDay = Math.floor((curDay.getTime() - ZEROTH_DAY.getTime()) / (24 * 3_600_000)) + 1;

    if (gameDay > getLatestGame() || gameDay < getEarliestGame()) {
      // Day data not available
      allDays.push(
        <div key={gameDay} className="text-3xl text-[#065f46]">
          {`${gameDay} `}
          <div className="text-base leading-6">
            {i + 1}
            <span className="ordinal svelte-aupvl6">{nth(i + 1)}</span>
          </div>
        </div>
      );
    }
    else {
      allDays.push(
        <Link to={`/game/${gameDay}`} key={gameDay} className="text-3xl text-amber-400">
          {`${gameDay} `}
          <div className="text-base leading-6 text-[#a4ac90]">
            {i + 1}
            <span className="ordinal svelte-aupvl6">{nth(i + 1)}</span>
          </div>
        </Link>
      );
    }
  }

  const getThisMonthSection = () => {
    const content = (
      <>
        This month
        {getThisMonthSvg("ml-1 inline h-5 w-5 -translate-y-0.5")}
      </>
    );
    if (!next) {
      // We're already in this month
      return (
        <span className="text-sm text-emerald-500 select-none sm:text-lg">
          {content}
        </span>
      );
    }
    return (
      <Link to="/archive" className="text-sm sm:text-lg is-link">
        {content}
      </Link>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl">Archive</h1>
        {getThisMonthSection()}
      </div>
      <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center select-none">
        {renderPrevSelector()}
        <div className="text-center text-2xl sm:text-3xl text-amber-100">{month} <span className="text-[#cbcba6] text-xl font-medium sm:text-2xl">{year}</span></div>
        {renderNextSelector()}
      </div>
      <hr className="mb-2 sm:mb-4" />
      <div className="mb-1 grid auto-cols-fr grid-cols-7 text-center font-sans text-xs font-bold tracking-widest text-emerald-500 uppercase select-none sm:mb-2 sm:text-sm">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="grid auto-rows-[56px] grid-cols-7 gap-0.5 text-center select-none sm:auto-rows-[72px]" data-sveltekit-preload-data="off">
        {allDays}
      </div>
    </>
  );
}

MonthView.displayName = 'MonthView';

export default MonthView;
