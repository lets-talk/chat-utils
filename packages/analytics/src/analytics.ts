import * as analytics from 'universal-ga';
import { ILTAnalytics, ILTAnalyticsOptions } from 'lt-analytics';

export class LTAnalytics implements ILTAnalytics {
  private allTrackersIDs: string[];
  private options: ILTAnalyticsOptions;

  constructor(appName: string, options: ILTAnalyticsOptions) {
    this.options = options;
    this.allTrackersIDs = this.options.trackers;

    if (!this.allTrackersIDs || this.allTrackersIDs.length < 1) {
      throw new Error('Configuration Error. You must specify at least one tracker');
    }

    const defaultTrackingID = this.allTrackersIDs[0];
    analytics.initialize(defaultTrackingID, options.createOptions);

    this.allTrackersIDs.forEach((tracker) => {
      const trackerName = this.getTrackerName(tracker);
      analytics.create(tracker, trackerName);
      analytics.name(trackerName).set('appName', appName);
    })

  }

  private getTrackerName(trackerID: string) {
    const alphaNumericTrackerID = trackerID.split('-').join('');
    return `${this.options.provider}${alphaNumericTrackerID}`;
  }

  private shouldTrackEvent(trackerID: string, eventCategory: string) {
    return this.options.events[trackerID][eventCategory] && this.options.events[trackerID][eventCategory].enabled;
  }

  private shouldTrackScreenView(trackerID: string, screenName: string) {
    return this.options.screenViews[trackerID][screenName] && this.options.screenViews[trackerID][screenName].enabled;
  }

  public set(key: string, value: string) {
    this.allTrackersIDs.forEach((trackerID) => {
      analytics.name(this.getTrackerName(trackerID)).set(key, value);
    });
  }

  public screenview(screenName: string, options: any) {
    this.allTrackersIDs.forEach((trackerID) => {
      if (this.shouldTrackScreenView(trackerID, screenName)){
        return analytics.name(this.getTrackerName(trackerID))
                .screenview(screenName, options);
      }
    });

    return this;
  }

  public event(category: string, action: string, label?: string, value?: number) {
    this.allTrackersIDs.forEach((trackerID) => {
      if (this.shouldTrackEvent(trackerID, category)){
        return analytics.name(this.getTrackerName(trackerID))
                .event(category, action, { eventLabel: label, eventValue: value });
      }
    });

    return this;
  }
}