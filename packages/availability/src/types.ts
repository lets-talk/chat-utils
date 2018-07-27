/*
 *
 * Types
 *
 */

type Settings = {
  time_scopes: TimeScope[] | null;
  disabled: boolean;
};

type Availability = {
  isWidgetAvailable: boolean;
  timeToWait: number;
};

type TimeScope = {
  day: number;
  open: string; //'00:00:00'
  close: string; //'23:59:59'
  offset: number; // timezone offset in seconds
};
