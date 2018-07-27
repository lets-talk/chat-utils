/*
 *
 * Compatibility
 *
 */

import { availableRightNow, neverAvailable } from "./constants";
import { isAvailable as _isAvailable } from "./availability";

export const isAvailable = (
  settings: Settings,
  date: Date,
  dateError: number | null,
  forceAvailable = false,
): Availability => {
  if (dateError == null) return neverAvailable;
  if (forceAvailable) return availableRightNow;

  const timeScopes = settings.time_scopes || [];
  const now = (function(localDate, differenceBetweenServerAndLocal) {
    const date = new Date(localDate.getTime() + differenceBetweenServerAndLocal);
    return date;
  })(date, dateError);

  const availability =  _isAvailable(
    timeScopes,
    now,
    settings.disabled,
  );
  return availability;
}
