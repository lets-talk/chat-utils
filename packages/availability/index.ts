/*
 *
 * Availability
 *
 * Changes:
 *  - forceAvailable = !!(LTWdigetDebug && LTWdigetDebug.make_available)
 *  - date = new Date()
 *  - dateError = serverReferenceDate.getTime() - localReferenceDate.getTime()
 *  - isBci removed, pass dateError = null if serverReferenceDate in unknown
 * 
 */

export { isAvailable } from "./src/compatibility";
