export const ZEROTH_DAY = new Date('2024-06-24');

export const FIRST_VALID_DAY = new Date('2024-07-25');

export const dayToDate = (day: string) => {
  const date = new Date(ZEROTH_DAY);
  date.setDate(date.getDate() + parseInt(day, 10));
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Source - https://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th#comment135270134_15397495
// Posted by sam-tolton
// Retrieved 2026-02-23, License - CC BY-SA 4.0
export const nth = (n: number) => n > 3 && n < 21 ? "th" : n % 10 == 1 ? "st" : n % 10 == 2 ? "nd" : n % 10 == 3 ? "rd" : "th";

import latestData from '../data/latest.json';

// TODO: i should fetch this instead
export const getLatestGame = () => {
  return latestData.latest;
};

export const getEarliestGame = () => {
  return 32;
}
