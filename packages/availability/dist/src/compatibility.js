"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const availability_1 = require("./availability");
exports.isAvailable = (settings, date, dateError, forceAvailable = false) => {
    if (dateError == null)
        return constants_1.neverAvailable;
    if (forceAvailable)
        return constants_1.availableRightNow;
    const timeScopes = settings.time_scopes || [];
    const now = (function (localDate, differenceBetweenServerAndLocal) {
        const date = new Date(localDate.getTime() + differenceBetweenServerAndLocal);
        return date;
    })(date, dateError);
    const availability = availability_1.isAvailable(timeScopes, now, settings.disabled);
    return availability;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGF0aWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbmlub3NjcmlwdC9yZXBvcy9jaGF0LXV0aWxzL3BhY2thZ2VzL2F2YWlsYWJpbGl0eS8iLCJzb3VyY2VzIjpbInNyYy9jb21wYXRpYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsMkNBQWdFO0FBQ2hFLGlEQUE2RDtBQUVoRCxRQUFBLFdBQVcsR0FBRyxDQUN6QixRQUFrQixFQUNsQixJQUFVLEVBQ1YsU0FBd0IsRUFDeEIsY0FBYyxHQUFHLEtBQUssRUFDUixFQUFFO0lBQ2hCLElBQUksU0FBUyxJQUFJLElBQUk7UUFBRSxPQUFPLDBCQUFjLENBQUM7SUFDN0MsSUFBSSxjQUFjO1FBQUUsT0FBTyw2QkFBaUIsQ0FBQztJQUU3QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxNQUFNLEdBQUcsR0FBRyxDQUFDLFVBQVMsU0FBUyxFQUFFLCtCQUErQjtRQUM5RCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsK0JBQStCLENBQUMsQ0FBQztRQUM3RSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVwQixNQUFNLFlBQVksR0FBSSwwQkFBWSxDQUNoQyxVQUFVLEVBQ1YsR0FBRyxFQUNILFFBQVEsQ0FBQyxRQUFRLENBQ2xCLENBQUM7SUFDRixPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUEifQ==