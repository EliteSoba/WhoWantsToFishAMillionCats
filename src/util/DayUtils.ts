export const ZEROTH_DAY = new Date('2024-06-24');

export const dayToDate = (day: string) => {
  const date = new Date(ZEROTH_DAY);
  date.setDate(date.getDate() + parseInt(day, 10));
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
