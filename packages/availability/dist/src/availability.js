"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const utcTimescopes_1 = require("./utcTimescopes");
const isInSomeTimescope = (date, timeScopes) => {
    if (timeScopes.length == 0) {
        return true;
    }
    return timeScopes.some(utcTimescopes_1.includesDate(date));
};
exports.isAvailable = (time_scopes, now, forceDisabled) => {
    const timescopes = utcTimescopes_1.utcTimescopes(time_scopes);
    const isWidgetAvailable = !forceDisabled
        && isInSomeTimescope(now, timescopes);
    if (isWidgetAvailable) {
        return constants_1.availableRightNow;
    }
    const timeUntilNextOpenings = timescopes.map(utcTimescopes_1.timeUntilTimescope(now));
    const timeUntilNextOpening = utils_1.firstFromArray(timeUntilNextOpenings.sort())
        || Infinity;
    const randomWaitMilliseconds = Math.floor(Math.random() * 10000);
    const timeToWait = timeUntilNextOpening + randomWaitMilliseconds;
    return { isWidgetAvailable: false, timeToWait };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmlsaXR5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaW5vc2NyaXB0L3JlcG9zL2NoYXQtdXRpbHMvcGFja2FnZXMvYXZhaWxhYmlsaXR5LyIsInNvdXJjZXMiOlsic3JjL2F2YWlsYWJpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLG1DQUF5QztBQUN6QywyQ0FBZ0Q7QUFDaEQsbURBQWdHO0FBRWhHLE1BQU0saUJBQWlCLEdBQUcsQ0FDeEIsSUFBVSxFQUNWLFVBQTBCLEVBQ2pCLEVBQUU7SUFDWCxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBRTFCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsNEJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQTtBQUVZLFFBQUEsV0FBVyxHQUFHLENBQ3pCLFdBQXdCLEVBQ3hCLEdBQVMsRUFDVCxhQUFzQixFQUNSLEVBQUU7SUFDaEIsTUFBTSxVQUFVLEdBQUcsNkJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsYUFBYTtXQUNuQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFeEMsSUFBSSxpQkFBaUIsRUFBRTtRQUNyQixPQUFPLDZCQUFpQixDQUFDO0tBQzFCO0lBRUQsTUFBTSxxQkFBcUIsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGtDQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDckUsTUFBTSxvQkFBb0IsR0FBRyxzQkFBYyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO1dBQ3BFLFFBQVEsQ0FBQztJQUVkLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsTUFBTSxVQUFVLEdBQUcsb0JBQW9CLEdBQUcsc0JBQXNCLENBQUM7SUFFakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQztBQUNsRCxDQUFDLENBQUMifQ==