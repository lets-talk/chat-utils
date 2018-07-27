"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compatibility_1 = require("../compatibility");
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
];
describe('isAvailable', () => {
    it('Should return false when there are not defined time_scopes', () => {
        const settings = {
            time_scopes: null,
            disabled: false,
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date(), 0);
        expect(isWidgetAvailable).toBeFalsy();
        expect(timeToWait).toBe(Infinity);
    });
    it('Should return false when are not defined time_scopes and is disabled using disabled=true', () => {
        const settings = {
            time_scopes: null,
            disabled: true,
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date(), 0);
        expect(isWidgetAvailable).toBeFalsy();
        expect(timeToWait).toBeGreaterThan(0);
    });
    it('Should return false when are empty time_scopes and is disabled using disabled=true', () => {
        const settings = {
            disabled: true,
            time_scopes: [],
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date(), 0);
        expect(isWidgetAvailable).toBeFalsy();
        expect(timeToWait).toBeGreaterThan(0);
    });
    it('Should return false when is disabled by settings', () => {
        const settings = {
            disabled: true,
            time_scopes: alwaysAvailableTimescope,
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date(), 0);
        expect(isWidgetAvailable).toBeFalsy();
        expect(timeToWait).toBeGreaterThan(0);
    });
    it('Should return false if current time is in time_scopes but we do not pass a serverDate', () => {
        const settings = {
            time_scopes: alwaysAvailableTimescope,
            disabled: false,
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date(), null);
        expect(isWidgetAvailable).toBeFalsy();
        expect(timeToWait).toBeGreaterThan(0);
    });
    it('Should return true when current time is in time_scopes', () => {
        const settings = {
            time_scopes: alwaysAvailableTimescope,
            disabled: false,
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date(), 0);
        expect(isWidgetAvailable).toBeTruthy();
        expect(timeToWait).toBe(0);
    });
    it('Should return false when is not available. Time < Open. Using Server provided date. Using GTM time in overlapping date 09:30 -> 20:30 (08:30:11 GTM)', () => {
        const settings = {
            disabled: true,
            time_scopes: chileanWorkingHoursTimescope,
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date('Tue, 15 May 2018 08:30:11 GMT'), 0);
        expect(isWidgetAvailable).toBeFalsy();
        expect(timeToWait).toBeGreaterThan(0);
    });
    it('Should return true when is available. Time < Open. Using Server provided date. Using GTM time in overlapping date 09:30 -> 20:30 (00:29 GTM)', () => {
        const settings = {
            disabled: false,
            time_scopes: chileanWorkingHoursTimescope,
        };
        const { isWidgetAvailable, timeToWait } = compatibility_1.isAvailable(settings, new Date('Wed, 16 May 2018 00:29:00 GMT'), 0);
        expect(isWidgetAvailable).toBeTruthy();
        expect(timeToWait).toBe(0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGF0aWJpbGl0eS50ZXN0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaW5vc2NyaXB0L3JlcG9zL2NoYXQtdXRpbHMvcGFja2FnZXMvYXZhaWxhYmlsaXR5LyIsInNvdXJjZXMiOlsic3JjL3Rlc3RzL2NvbXBhdGliaWxpdHkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUErQztBQUUvQyxNQUFNLHdCQUF3QixHQUFHO0lBQy9CLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0NBQ2hFLENBQUM7QUFFRixNQUFNLDRCQUE0QixHQUFHO0lBQ25DLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0lBQy9ELEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFO0NBQ2hFLENBQUE7QUFFRCxRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUMzQixFQUFFLENBQUMsNERBQTRELEVBQUUsR0FBRyxFQUFFO1FBQ3BFLE1BQU0sUUFBUSxHQUFHO1lBQ2YsV0FBVyxFQUFFLElBQUk7WUFDakIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQztRQUVGLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsR0FBRywyQkFBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRS9FLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEZBQTBGLEVBQUUsR0FBRyxFQUFFO1FBQ2xHLE1BQU0sUUFBUSxHQUFHO1lBQ2YsV0FBVyxFQUFFLElBQUk7WUFDakIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO1FBRUYsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxHQUFHLDJCQUFXLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFL0UsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxvRkFBb0YsRUFBRSxHQUFHLEVBQUU7UUFDNUYsTUFBTSxRQUFRLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUM7UUFFRixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLEdBQUcsMkJBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUvRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtRQUMxRCxNQUFNLFFBQVEsR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLHdCQUF3QjtTQUN0QyxDQUFDO1FBRUYsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxHQUFHLDJCQUFXLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFL0UsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1RkFBdUYsRUFBRSxHQUFHLEVBQUU7UUFDL0YsTUFBTSxRQUFRLEdBQUc7WUFDZixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUM7UUFFRixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLEdBQUcsMkJBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVsRixNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEdBQUcsRUFBRTtRQUNoRSxNQUFNLFFBQVEsR0FBRztZQUNmLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQztRQUVGLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsR0FBRywyQkFBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRS9FLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0pBQXNKLEVBQUUsR0FBRyxFQUFFO1FBQzlKLE1BQU0sUUFBUSxHQUFHO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsNEJBQTRCO1NBQzFDLENBQUM7UUFFRixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLEdBQUcsMkJBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsK0JBQStCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU5RyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhJQUE4SSxFQUFFLEdBQUcsRUFBRTtRQUN0SixNQUFNLFFBQVEsR0FBRztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsV0FBVyxFQUFFLDRCQUE0QjtTQUMxQyxDQUFDO1FBRUYsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxHQUFHLDJCQUFXLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLCtCQUErQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFOUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=