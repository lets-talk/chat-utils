import { utcTimescopes, includesDate, UtcTimescope, timeUntilTimescope } from '../utcTimescopes';

describe('utcTimescopes', () => {
  it('returns no utc timescope if no timescope is given', () => {
    const newTimescopes = utcTimescopes([]);

    expect(newTimescopes).toEqual([]);
  });

  it('is the same timescope if offset equals 0', () => {
    const originalTimescopes = [ { day: 3, open: '00:00:00', close: '23:59:59', offset: 0 } ];
    const expectedTimescopes = [ { day: 3, open: [0, 0, 0], close: [23, 59, 59] } ];

    const newTimescopes = utcTimescopes(originalTimescopes);
    expect(newTimescopes).toEqual(expectedTimescopes);
  });
  
  it('splits a timescope in two if the timezone makes it open on previous day', () => {
    const originalTimescopes = [
      { day: 3, open: '00:00:00', close: '23:59:59', offset: 12*3600 },
    ];
    const expectedTimescopes = [
      { day: 2, open: [12, 0, 0], close: [23, 59, 59] },
      { day: 3, open: [ 0, 0, 0], close: [11, 59, 59] },
    ];
    const newTimescopes = utcTimescopes(originalTimescopes);
    expect(newTimescopes).toEqual(expectedTimescopes);
  });

  it('splits a timescope in two if the timezone makes it close on next day', () => {
    const originalTimescopes = [
      { day: 3, open: '00:00:00', close: '23:59:59', offset: -12*3600 },
    ];
    const expectedTimescopes = [
      { day: 3, open: [12, 0, 0], close: [23, 59, 59] },
      { day: 4, open: [ 0, 0, 0], close: [11, 59, 59] },
    ];
    const newTimescopes = utcTimescopes(originalTimescopes);
    expect(newTimescopes).toEqual(expectedTimescopes);
  });

  it('merges two consecutive timescopes in the same day', () => {
    const originalTimescopes = [
      { day: 3, open: '12:00:00', close: '13:59:59', offset: 0 },
      { day: 3, open: '14:00:00', close: '15:59:59', offset: 0 },
    ];
    const expectedTimescopes = [
      { day: 3, open: [12, 0, 0], close: [15, 59, 59] },
    ];
    const newTimescopes = utcTimescopes(originalTimescopes);
    expect(newTimescopes).toEqual(expectedTimescopes);
  });

  it('can split and merge in the same step', () => {
    const offset = -4*3600;
    const originalTimescopes = [
      { day: 0, open: '00:00:00', close: '22:00:00', offset },
      { day: 6, open: '14:00:00', close: '23:59:59', offset },
    ];
    const expectedTimescopes = [
      { day: 0, open: [ 0, 0, 0], close: [23, 59, 59] },
      { day: 1, open: [ 0, 0, 0], close: [ 2,  0,  0] },
      { day: 6, open: [18, 0, 0], close: [23, 59, 59] },
    ];
    const newTimescopes = utcTimescopes(originalTimescopes);
    expect(newTimescopes).toEqual(expectedTimescopes);
  });

  it('keeps being always open, even with offset', () => {
    const offset = 1234;
    const originalTimescopes = [
      { day: 0, open: '00:00:00', close: '23:59:59', offset },
      { day: 1, open: '00:00:00', close: '23:59:59', offset },
      { day: 2, open: '00:00:00', close: '23:59:59', offset },
      { day: 3, open: '00:00:00', close: '23:59:59', offset },
      { day: 4, open: '00:00:00', close: '23:59:59', offset },
      { day: 5, open: '00:00:00', close: '23:59:59', offset },
      { day: 6, open: '00:00:00', close: '23:59:59', offset },
    ];
    const expectedTimescopes = [
      { day: 0, open: [0, 0, 0], close: [23, 59, 59] },
      { day: 1, open: [0, 0, 0], close: [23, 59, 59] },
      { day: 2, open: [0, 0, 0], close: [23, 59, 59] },
      { day: 3, open: [0, 0, 0], close: [23, 59, 59] },
      { day: 4, open: [0, 0, 0], close: [23, 59, 59] },
      { day: 5, open: [0, 0, 0], close: [23, 59, 59] },
      { day: 6, open: [0, 0, 0], close: [23, 59, 59] },
    ];
    const newTimescopes = utcTimescopes(originalTimescopes);
    expect(newTimescopes).toEqual(expectedTimescopes);
  });
});

describe('includesDate', () => {
  const timescope: UtcTimescope = {
    day: 3, // 2000-12-31 was a Wednesday
    open: [12, 0, 0],
    close: [16, 0, 0]
  };

  it('returns false if date is before opening time', () => {
    const date = new Date(Date.UTC(2000, 12, 31, 11, 30, 59));
    expect(includesDate(date)(timescope)).toBeFalsy();
  });
  it('returns true if date is between opening and closing time', () => {
    const date = new Date(Date.UTC(2000, 12, 31, 14, 30, 59));
    expect(includesDate(date)(timescope)).toBeTruthy();
  });
  it('returns false if date is after closing time', () => {
    const date = new Date(Date.UTC(2000, 12, 31, 16, 30, 59));
    expect(includesDate(date)(timescope)).toBeFalsy();
  });
});

describe('timeUntilTimescope', () => {
  const timescope: UtcTimescope = {
    day: 3, // 2000-12-31 was a Wednesday
    open: [12, 0, 0],
    close: [16, 0, 0]
  };

  it('can count up to next timescope', () => {
    const date = new Date(Date.UTC(2000, 12, 31, 11, 58, 59));
    expect(timeUntilTimescope(date)(timescope)).toBe(61);
  });
  it('gives 0 seconds if it is the same time', () => {
    const date = new Date(Date.UTC(2000, 12, 31, 12, 0, 0));
    expect(timeUntilTimescope(date)(timescope)).toBe(0);
  });
  it('gives time until following the start time of the following week if opening aready passed', () => {
    const date = new Date(Date.UTC(2000, 12, 31, 12, 0, 1));
    const secondsInAWeek = 3600 * 24 * 7;
    expect(timeUntilTimescope(date)(timescope)).toBe(secondsInAWeek - 1);
  });
});
