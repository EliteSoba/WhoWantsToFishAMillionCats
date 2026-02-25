import React from 'react';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { FIRST_VALID_DAY } from '../../util/DayUtils';
import MonthView from './MonthView';
import { yearMonths } from '../../types/types';

interface Props { };

const Archive: React.FC<Props> = ({ }) => {
  const location = useLocation();
  /*
   * TODO:
   * Figure out first month (hardcoded?) and last (current) month
   * render calendar for single month
   * use math to figure out date range for single month
   * routing etc for months, including prev/next (index = latest month)
   * probably the month selector too, and conditional styling for the selected month
   */
  const firstYear = FIRST_VALID_DAY.getFullYear();
  const firstMonth = FIRST_VALID_DAY.getMonth();
  const today = new Date();
  const lastYear = today.getFullYear();
  const lastMonth = today.getMonth();

  // TODO: this is a map from year to month info, but idk if that's the best data format
  // it might be better to do an array of objects that hold year: string and monthinfos[]
  // to ensure ordering and better availability of indices
  const yearMonths: yearMonths = {};
  for (let year = firstYear; year <= lastYear; year++) {
    let floor = year === firstYear ? firstMonth : 0;
    let ceil = (year === lastYear ? lastMonth : 11) + 1;
    const allMonthsForYear = [...new Array(ceil - floor)].map((_, i) => floor + i);

    yearMonths[year] = allMonthsForYear.map(month => {
      const date = new Date(`${year}-${month + 1}-1`);
      return ({
        first: date,
        shortName: date.toLocaleDateString('en-US', { month: 'short' }),
        link: `${year}-${date.toLocaleDateString('en-US', { month: 'long' }).toLocaleLowerCase()}`,
      });
    });
  }

  // lmao
  const flatYearMonths = Object.keys(yearMonths).flatMap(key => yearMonths[key]);
  const curYearMonth = location.pathname?.split('/')[2] || flatYearMonths[flatYearMonths.length - 1].link;

  const renderGrid = () => {
    const data = Object.keys(yearMonths).reverse().map(year => {
      const months = yearMonths[year].map(month => (
        <Link
          key={month.link}
          to={`/archive/${month.link}`}
          className={`is-link block py-1.5 rounded-md no-underline ${curYearMonth === month.link ? 'bg-[#043d2f]' : ''}`}
        >
          {month.shortName}
        </Link>
      )
      );
      return (
        <React.Fragment key={year}>
          <div className="py-1.5 font-sans font-bold text-emerald-500">{year}</div>
          <div className="grid auto-cols-fr grid-cols-6 gap-0.5">
            {months}
          </div>
        </React.Fragment>
      );
    });
    return (
      <div className="grid grid-cols-[auto_1fr] items-start gap-2 text-center select-none sm:gap-x-4 text-xl leading-7">
        {data}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm pt-2 pb-8">
      <Routes>
        <Route path='/' element={<MonthView yearMonths={flatYearMonths} />} />
        <Route path=':yearmonth' element={<MonthView yearMonths={flatYearMonths} />} />
      </Routes>
      <hr className="mt-2 sm:mt-4" />
      {renderGrid()}
    </div>
  );
}

Archive.displayName = 'Archive';

export default Archive;
