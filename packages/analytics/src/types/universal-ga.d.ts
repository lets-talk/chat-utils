interface ObjectIndex<T> {
  [key:string]: T;
}

declare module 'universal-ga' {
  function initialize(trackingID: string, options?: ObjectIndex<any>): void;
  function name(trackerName: string): any;
  function create(trackingID: string, options: any): any;
  function set(key: string, value: string): any;
  function pageview(pagename: string, options: any): any;
  function screenview(pagename: string, options: any): any;
  function event(category: string, action: string, options: any): any;
}