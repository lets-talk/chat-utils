/*
 *
 * Availability
 *
 */

import { firstFromArray } from "./utils";
import { availableRightNow } from "./constants";
import { utcTimescopes, includesDate, timeUntilTimescope, UtcTimescope } from "./utcTimescopes";

const isInSomeTimescope = (
  date: Date,
  timeScopes: UtcTimescope[],
): boolean => {
  if (timeScopes.length == 0) {
    // empty timescopes = always on
    return true;
  }

  return timeScopes.some(includesDate(date));
}

export const isAvailable = (
  time_scopes: TimeScope[],
  now: Date,
  forceDisabled: boolean,
): Availability => {
  const timescopes = utcTimescopes(time_scopes);
  const isWidgetAvailable = !forceDisabled
    && isInSomeTimescope(now, timescopes);

  if (isWidgetAvailable) {
    return availableRightNow;
  }

  const timeUntilNextOpenings = timescopes.map(timeUntilTimescope(now))
  const timeUntilNextOpening = firstFromArray(timeUntilNextOpenings.sort())
    || Infinity;

  const randomWaitMilliseconds = Math.floor(Math.random()*10000);
  const timeToWait = timeUntilNextOpening + randomWaitMilliseconds;

  return { isWidgetAvailable: false, timeToWait };
};
