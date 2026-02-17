// Source - https://stackoverflow.com/a/12646864
// Posted by Laurens Holst, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-16, License - CC BY-SA 4.0
export function shuffleArray<Type>(array: Type[]) {
  if (!array.length) {
    return array;
  }
  const clonedArray = [...array];
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
  }
  return clonedArray;
}

/**
 * Returns a random number from 0 inclusive to range exclusive, so [0, range)
 */
export function randomInt(range: number) {
  return Math.floor(Math.random() * range);
}
