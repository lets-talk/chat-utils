import postRobot from 'post-robot';
import * as queryString from 'query-string';

import { AppSettingsResult } from './types';
import {
  deserialize,
} from './utils/serialization';

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
  public openApp(appNamespace: string, initialData: any): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_LOAD_APP, { appName: appNamespace, initialData });
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
    return this.sendChannel.send(EVENT_TYPE_GET_APP_SETTINGS, { appName: this.appName });
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

  /**
   * Calls a public method from an encoded data
   * @param encodedData String encoded of the function call with args
   */
  public async executeSDKEvent64(encodedData: string): Promise<any> {
    const deserialzed = deserialize(encodedData);
    const { appName, method, args } = deserialzed;
    if (!(Array.isArray(args) && (typeof method === 'string'))) {
      // If deserializad method and args are not of the proper shape throw an error
      throw new Error('Invalid deserialized object');
    }
    return this.executeSDKEvent(appName, deserialzed.method, deserialzed.args);
  }

  public async executeSDKEvent(appName: string, method: string, params: any[]): Promise<any> {
    let eventData;
    switch (method) {
      case 'openApp':
        eventData =  { appName, initialData: params[0], payload: { method } };
        break;
    
      default:
        break;
    }
    return this.sendChannel.send('execute-app-sdk-method', eventData).then((event: any) => {
      console.log(`Called method ${method}:`, event);
    }).catch((error: any) => {
      console.error('postRobot client error:', error);
    });
  }

}