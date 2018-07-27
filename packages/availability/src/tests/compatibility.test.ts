import { isAvailable } from '../compatibility';

const alwaysAvailableTimescope = [
  { day: 0, open: '00:00:00', close: '23:59:59', offset: -50400 },
  { day: 1, open: '00:00:00', close: '23:59:59', offset: -50400 },
  { day: 2, open: '00:00:00', close: '23:59:59', offset: -50400 },
  { day: 3, open: '00:00:00', close: '23:59:59', offset: -50400 },
  { day: 4, open: '00:00:00', close: '23:59:59', offset: -50400 },
  { day: 5, open: '00:00:00', close: '23:59:59', offset: -50400 },
  { day: 6, open: '00:00:00', close: '23:59:59', offset: -50400 },
];

const chileanWorkingHoursTimescope = [
  { day: 0, open: '09:30:00', close: '20:30:00', offset: -14400 },
  { day: 1, open: '09:30:00', close: '20:30:00', offset: -14400 },
  { day: 2, open: '09:30:00', close: '20:30:00', offset: -14400 },
  { day: 3, open: '09:30:00', close: '20:30:00', offset: -14400 },
  { day: 4, open: '09:30:00', close: '20:30:00', offset: -14400 },
  { day: 5, open: '09:30:00', close: '20:30:00', offset: -14400 },
  { day: 6, open: '09:30:00', close: '20:30:00', offset: -14400 },
]

describe('isAvailable', () => {
  it('Should return false when there are not defined time_scopes', () => {
    const settings = {
      time_scopes: null,
      disabled: false,
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date(), 0);
    
    expect(isWidgetAvailable).toBeFalsy();
    expect(timeToWait).toBe(Infinity);
  });

  it('Should return false when are not defined time_scopes and is disabled using disabled=true', () => {
    const settings = {
      time_scopes: null,
      disabled: true,
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date(), 0);

    expect(isWidgetAvailable).toBeFalsy();
    expect(timeToWait).toBeGreaterThan(0);
  });

  it('Should return false when are empty time_scopes and is disabled using disabled=true', () => {
    const settings = {
      disabled: true,
      time_scopes: [],
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date(), 0);

    expect(isWidgetAvailable).toBeFalsy();
    expect(timeToWait).toBeGreaterThan(0);
  });

  it('Should return false when is disabled by settings', () => {
    const settings = {
      disabled: true,
      time_scopes: alwaysAvailableTimescope,
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date(), 0);

    expect(isWidgetAvailable).toBeFalsy();
    expect(timeToWait).toBeGreaterThan(0);
  });

  it('Should return false if current time is in time_scopes but we do not pass a serverDate', () => {
    const settings = {
      time_scopes: alwaysAvailableTimescope,
      disabled: false,
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date(), null);

    expect(isWidgetAvailable).toBeFalsy();
    expect(timeToWait).toBeGreaterThan(0);
  });

  it('Should return true when current time is in time_scopes', () => {
    const settings = {
      time_scopes: alwaysAvailableTimescope,
      disabled: false,
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date(), 0);
    
    expect(isWidgetAvailable).toBeTruthy();
    expect(timeToWait).toBe(0);
  });

  it('Should return false when is not available. Time < Open. Using Server provided date. Using GTM time in overlapping date 09:30 -> 20:30 (08:30:11 GTM)', () => {
    const settings = {
      disabled: true,
      time_scopes: chileanWorkingHoursTimescope,
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date('Tue, 15 May 2018 08:30:11 GMT'), 0);

    expect(isWidgetAvailable).toBeFalsy();
    expect(timeToWait).toBeGreaterThan(0);
  });

  it('Should return true when is available. Time < Open. Using Server provided date. Using GTM time in overlapping date 09:30 -> 20:30 (00:29 GTM)', () => {
    const settings = {
      disabled: false,
      time_scopes: chileanWorkingHoursTimescope,
    };

    const { isWidgetAvailable, timeToWait } = isAvailable(settings, new Date('Wed, 16 May 2018 00:29:00 GMT'), 0);

    expect(isWidgetAvailable).toBeTruthy();
    expect(timeToWait).toBe(0);
  });
});
