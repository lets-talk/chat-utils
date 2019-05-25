declare module 'lt-analytics' {
  type TrackinEventDescription = {
    enabled: boolean;
    format?: string;
  }

  type TrackingEvent = { [key:string]: TrackinEventDescription };

  interface TrackingEvents {
    [key:string]: TrackingEvent;
  }

  export interface ILTAnalyticsOptions {
    provider: string;
    trackers: string[];
    events: TrackingEvents;
    screenViews: TrackingEvents;
    createOptions?: ObjectIndex<any>;
  }

  export interface ILTAnalytics {
    event(category: string, action: string, label?: string, value?: number): void;
    screenview(screenName: string, options: any): void;
    set(key: string, value: string): void;
  }
}