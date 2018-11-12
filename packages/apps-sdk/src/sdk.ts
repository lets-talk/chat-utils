import postRobot from 'post-robot';
import * as queryString from 'query-string';

import { AppSettingsResult } from './types';

import {
  EVENT_TYPE_GET_APP_SETTINGS,
  EVENT_TYPE_LOAD_APP,
  EVENT_TYPE_REMOVE_APP,
  EVENT_TYPE_NOTIFY_APP_EVENT,
} from './constants';

export class SDK {
  private appName: string = '';
  private channelManager: any;
  private sendChannel: any;

  constructor(channelFactory = () => postRobot) {
    // Define Communication Channels
    this.channelManager = channelFactory();
    this.sendChannel = this.channelManager.client({ window: window.parent, domain: '*' });

    this.configureApp();
  }

  /**
   * configureApp Obtains the appName from the url and save it for later use
   */
  private configureApp(): void {
    // First we obtaing the id of this app from the url
    const parsed = queryString.parse(window.location.search);
    const parsedAppName = Array.isArray(parsed.appName) ? parsed.appName[0] : parsed.appName;
    this.appName = parsedAppName ? parsedAppName : 'messenger-iframe';
  }
  /**
   * openApp
   * @param appNamespace The app namespace to execute the open
   */
  public openApp(appNamespace: string): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_LOAD_APP, { appName: appNamespace });
  }

  /**
   * closeApp
   */
  public closeApp(): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_REMOVE_APP, { appName: `lt.${this.appName}.*` });
  }
  /**
   * getAppSettings: Returns a promise that resolves to the App Settings
   */
  public getAppSettings(): Promise<AppSettingsResult> {
    return this.sendChannel.send(EVENT_TYPE_GET_APP_SETTINGS, { appName: `lt.${this.appName}.*` });
  }

  /**
   * notify
   * @param appNamespace The app namespace to execute the executeAppMethod
   * @param method The method to call
   * @param args The data we want to pass to the function as arguments
   */
  public notify(eventName: string, data: any): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_NOTIFY_APP_EVENT, { appName: this.appName, payload: { eventName, data } });
  }
}