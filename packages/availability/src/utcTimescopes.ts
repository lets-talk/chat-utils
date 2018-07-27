/*
*
* UTC Timescopes
*
*/

import {
  poorMansFlatmap,
  lastFromArray,
} from "./utils";

export type Time = [
  number, // hours
  number, // minutes
  number  // seconds
];

export type UtcTimescope = {
  day: number;
  open: Time;
  close: Time;
};

const timeFromDate = (date: Date): Time => {
  return [
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ];
}
export const includesDate = (date: Date) => (timescope: UtcTimescope): boolean => {
  if (timescope.day !== date.getUTCDay()) return false;

  const time = timeFromDate(date);

  const openingTime = secondsFromTime(timescope.open);
  const currentTime = secondsFromTime(time);
  const closingTime = secondsFromTime(timescope.close);

  return openingTime <= currentTime && currentTime <= closingTime;
};

export const timeUntilTimescope = (date: Date) => (timescope: UtcTimescope): number => {
  const day = date.getUTCDay();
  const time = timeFromDate(date);
  const currentTime = secondsFromDayAndTime(day, time);
  const openingTime = secondsFromDayAndTime(timescope.day, timescope.open);
  const nextOpening = openingTime >= currentTime
    ? openingTime
    : secondsFromDayAndTime(timescope.day + 7, timescope.open);
  return nextOpening - currentTime;
}

export const utcTimescopes = (oldTimescopes: TimeScope[]): UtcTimescope[] => {
  const rawUtcTimescopes = oldTimescopes.map(rawUtcTimescope);
  return poorMansFlatmap(rawUtcTimescopes, splitTimescope)
    .sort(compareTimescopes)
    .reduce(appendTimescope, []);
};

const rawUtcTimescope = (oldTimescope: TimeScope): UtcTimescope => {
  return {
    day: oldTimescope.day,
    open:  applyOffset(timeFromString(oldTimescope.open ), oldTimescope.offset),
    close: applyOffset(timeFromString(oldTimescope.close), oldTimescope.offset),
  }
};

const timeFromString = (time: string): Time => {
  const parse = (s: string) => parseInt(s, undefined);
  const [hours, minutes, seconds] = time.split(':').map(parse);
  return [hours, minutes, seconds];
};

const secondsFromTime = (time: Time): number => {
  const [hours, minutes, seconds] = time;
  return (hours * 60 + minutes) * 60 + seconds;
};

const secondsFromDayAndTime = (day: number, time: Time): number => {
  return day * 24 * 3600 + secondsFromTime(time);
};

const compareTimescopes = (lhs: UtcTimescope, rhs: UtcTimescope): number => {
  const lhsSeconds = secondsFromDayAndTime(lhs.day, lhs.open);
  const rhsSeconds = secondsFromDayAndTime(rhs.day, rhs.open);
  return lhsSeconds - rhsSeconds;
};

const modulo = (dividend: number, divisor: number): number => {
  return ((dividend % divisor) + divisor) % divisor;
};

const applyOffset = (time: Time, offset: number): Time => {
  const timeInSeconds = secondsFromTime(time) - offset;
  const newSeconds = modulo(timeInSeconds, 60);
  const remainingMinutes = (timeInSeconds - newSeconds) / 60;
  const newMinutes = modulo(remainingMinutes, 60);
  const newHours = (remainingMinutes - newMinutes) / 60;
  return [ newHours, newMinutes, newSeconds ];
};

/**
 * This method assumes that the original raw timescope can only span two days.
 */
const splitTimescope = (raw: UtcTimescope): UtcTimescope[] => {
  const openingHour = raw.open[0];
  if (openingHour < 0) {
    return [
      {
        day: modulo(raw.day - 1, 7),
        open: [raw.open[0] + 24, raw.open[1], raw.open[2]],
        close: [23, 59, 59],
      },
      {
        day: raw.day,
        open: [0, 0, 0],
        close: raw.close,
      }
    ]
  }
  const closingHour = raw.close[0];
  if (closingHour > 23) {
    return [
      {
        day: raw.day,
        open: raw.open,
        close: [23, 59, 59],
      },
      {
        day: modulo(raw.day + 1, 7),
        open: [0, 0, 0],
        close: [raw.close[0] - 24, raw.close[1], raw.close[2]]
      }
    ]
  }

  return [raw];
};

const appendTimescope = (
  timescopes: UtcTimescope[], newTimescope: UtcTimescope
): UtcTimescope[] => {
  const lastTimescope = lastFromArray(timescopes);

  if (lastTimescope === null) {
    return [newTimescope];
  }

  if (lastTimescope.day === newTimescope.day) {
    const oneSecondAfterClose = secondsFromTime(lastTimescope.close) + 1;
    const nextOpeningTime = secondsFromTime(newTimescope.open);
    if (oneSecondAfterClose == nextOpeningTime) {
      const mergedTimescope = {
        day: lastTimescope.day,
        open: lastTimescope.open,
        close: newTimescope.close
      }
      return timescopes
        .slice(0, -1)
        .concat(mergedTimescope);
    }
  }
  
  return timescopes.concat(newTimescope);
};
