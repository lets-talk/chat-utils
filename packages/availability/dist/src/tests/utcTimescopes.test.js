"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utcTimescopes_1 = require("../utcTimescopes");
describe('utcTimescopes', () => {
    it('returns no utc timescope if no timescope is given', () => {
        const newTimescopes = utcTimescopes_1.utcTimescopes([]);
        expect(newTimescopes).toEqual([]);
    });
    it('is the same timescope if offset equals 0', () => {
        const originalTimescopes = [{ day: 3, open: '00:00:00', close: '23:59:59', offset: 0 }];
        const expectedTimescopes = [{ day: 3, open: [0, 0, 0], close: [23, 59, 59] }];
        const newTimescopes = utcTimescopes_1.utcTimescopes(originalTimescopes);
        expect(newTimescopes).toEqual(expectedTimescopes);
    });
    it('splits a timescope in two if the timezone makes it open on previous day', () => {
        const originalTimescopes = [
            { day: 3, open: '00:00:00', close: '23:59:59', offset: 12 * 3600 },
        ];
        const expectedTimescopes = [
            { day: 2, open: [12, 0, 0], close: [23, 59, 59] },
            { day: 3, open: [0, 0, 0], close: [11, 59, 59] },
        ];
        const newTimescopes = utcTimescopes_1.utcTimescopes(originalTimescopes);
        expect(newTimescopes).toEqual(expectedTimescopes);
    });
    it('splits a timescope in two if the timezone makes it close on next day', () => {
        const originalTimescopes = [
            { day: 3, open: '00:00:00', close: '23:59:59', offset: -12 * 3600 },
        ];
        const expectedTimescopes = [
            { day: 3, open: [12, 0, 0], close: [23, 59, 59] },
            { day: 4, open: [0, 0, 0], close: [11, 59, 59] },
        ];
        const newTimescopes = utcTimescopes_1.utcTimescopes(originalTimescopes);
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
        const newTimescopes = utcTimescopes_1.utcTimescopes(originalTimescopes);
        expect(newTimescopes).toEqual(expectedTimescopes);
    });
    it('can split and merge in the same step', () => {
        const offset = -4 * 3600;
        const originalTimescopes = [
            { day: 0, open: '00:00:00', close: '22:00:00', offset },
            { day: 6, open: '14:00:00', close: '23:59:59', offset },
        ];
        const expectedTimescopes = [
            { day: 0, open: [0, 0, 0], close: [23, 59, 59] },
            { day: 1, open: [0, 0, 0], close: [2, 0, 0] },
            { day: 6, open: [18, 0, 0], close: [23, 59, 59] },
        ];
        const newTimescopes = utcTimescopes_1.utcTimescopes(originalTimescopes);
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
        const newTimescopes = utcTimescopes_1.utcTimescopes(originalTimescopes);
        expect(newTimescopes).toEqual(expectedTimescopes);
    });
});
describe('includesDate', () => {
    const timescope = {
        day: 3,
        open: [12, 0, 0],
        close: [16, 0, 0]
    };
    it('returns false if date is before opening time', () => {
        const date = new Date(Date.UTC(2000, 12, 31, 11, 30, 59));
        expect(utcTimescopes_1.includesDate(date)(timescope)).toBeFalsy();
    });
    it('returns true if date is between opening and closing time', () => {
        const date = new Date(Date.UTC(2000, 12, 31, 14, 30, 59));
        expect(utcTimescopes_1.includesDate(date)(timescope)).toBeTruthy();
    });
    it('returns false if date is after closing time', () => {
        const date = new Date(Date.UTC(2000, 12, 31, 16, 30, 59));
        expect(utcTimescopes_1.includesDate(date)(timescope)).toBeFalsy();
    });
});
describe('timeUntilTimescope', () => {
    const timescope = {
        day: 3,
        open: [12, 0, 0],
        close: [16, 0, 0]
    };
    it('can count up to next timescope', () => {
        const date = new Date(Date.UTC(2000, 12, 31, 11, 58, 59));
        expect(utcTimescopes_1.timeUntilTimescope(date)(timescope)).toBe(61);
    });
    it('gives 0 seconds if it is the same time', () => {
        const date = new Date(Date.UTC(2000, 12, 31, 12, 0, 0));
        expect(utcTimescopes_1.timeUntilTimescope(date)(timescope)).toBe(0);
    });
    it('gives time until following the start time of the following week if opening aready passed', () => {
        const date = new Date(Date.UTC(2000, 12, 31, 12, 0, 1));
        const secondsInAWeek = 3600 * 24 * 7;
        expect(utcTimescopes_1.timeUntilTimescope(date)(timescope)).toBe(secondsInAWeek - 1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRjVGltZXNjb3Blcy50ZXN0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaW5vc2NyaXB0L3JlcG9zL2NoYXQtdXRpbHMvcGFja2FnZXMvYXZhaWxhYmlsaXR5LyIsInNvdXJjZXMiOlsic3JjL3Rlc3RzL3V0Y1RpbWVzY29wZXMudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFpRztBQUVqRyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM3QixFQUFFLENBQUMsbURBQW1ELEVBQUUsR0FBRyxFQUFFO1FBQzNELE1BQU0sYUFBYSxHQUFHLDZCQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7UUFDbEQsTUFBTSxrQkFBa0IsR0FBRyxDQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFFLENBQUM7UUFDMUYsTUFBTSxrQkFBa0IsR0FBRyxDQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDO1FBRWhGLE1BQU0sYUFBYSxHQUFHLDZCQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseUVBQXlFLEVBQUUsR0FBRyxFQUFFO1FBQ2pGLE1BQU0sa0JB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