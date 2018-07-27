/*
 *
 * Utils
 *
 */

export const firstFromArray = <T>(array: T[]): T | null => {
  return array.length >= 1 ? array[0] : null;
}

export const lastFromArray = <T>(array: T[]): T | null => {
  const lastElementIndex = array.length - 1;
  return lastElementIndex >= 0 ? array[lastElementIndex] : null;
}

export const poorMansFlatmap = <T, U>(a: T[], f: (t: T)=>U[]): U[] => {
  return a.reduce((acc, val) => acc.concat(f(val)), [] as U[]);
};
