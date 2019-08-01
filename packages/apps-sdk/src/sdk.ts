import postRobot from 'post-robot';
import * as qs from 'qs';

type EventData = {
  data: ObjectIndex<any>,
}

import { AppSettingsResult, ObjectIndex } from './types';
import { decoder } from './utils/url';
import {
  deserialize,
} from './utils/serialization';

import {
  EVENT_TYPE_GET_APP_SETTINGS,
  EVENT_TYPE_LOAD_APP,
  EVENT_TYPE_REMOVE_APP,
  EVENT_TYPE_NOTIFY_APP_EVENT,
  APP_MODE_IFRAME,
  APP_MODE_POPUP,
  EVENT_TYPE_EXECUTE_APP_METHOD,
} from './constants';

export class SDK {
  private appName: string = '';
  private queryParams: ObjectIndex<any> = {};
  private initialData: ObjectIndex<any> = {};
  private channelFactory: () => any;
  private channelManager: any;
  private sendChannel: any;
  private recieveChannel: any;
  private handlers: any;

  constructor(channelFactory = () => postRobot) {
    this.handleExecuteAppMethod = this.handleExecuteAppMethod.bind(this);

    this.channelFactory = channelFactory;
    this.configureApp();
    this.setUpListeners();
  }

  /**
   * configureApp Obtains the appName from the url and save it for later use
   */
  private configureApp(): void {
    // First we obtaing the id of this app from the url
    const parsed = qs.parse(window.location.search.substring(1), { decoder });
    const parsedAppName = Array.isArray(parsed.appName) ? parsed.appName[0] : parsed.appName;

    this.queryParams = Array.isArray(parsed.queryParams) ? parsed.queryParams[0] : parsed.queryParams;
    this.initialData = Array.isArray(parsed.initialData) ? parsed.initialData[0] : parsed.initialData;
    this.appName = parsedAppName ? parsedAppName : 'messenger-iframe';

    const mode = this.queryParams && this.queryParams.mode ? this.queryParams.mode : APP_MODE_IFRAME;
    const channelConfig = mode === APP_MODE_POPUP ? { window: window.opener } : { window: window.parent };

    // Define Communication Channels
    this.channelManager = this.channelFactory();
    this.sendChannel = this.channelManager.client({ ...channelConfig, domain: '*' });
    this.recieveChannel = this.channelManager.listener({ ...channelConfig, domain: '*' });
  }

  /**
   * setUpListeners Set the handlers for different events we want to listen for
   */
  private setUpListeners(): void {
    this.recieveChannel.on(EVENT_TYPE_EXECUTE_APP_METHOD, this.handleExecuteAppMethod);
  }

  /**
   * setUpListeners Set the handlers for different events we want to listen for
   */
  public addEventHandlers(handlers: any): void {
    this.handlers = handlers;
  }

  private handleExecuteAppMethod(event: EventData) {
    const { payload } = event.data;
    const { method, args } = payload;
    if (this.handlers && typeof this.handlers[method] === 'function') {
      this.handlers[method](...args);
    }
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
    return new Promise((resolve, reject) => {
      return this.sendChannel.send(EVENT_TYPE_GET_APP_SETTINGS, { appName: this.appName }).then((result: AppSettingsResult) => {
        // Here we extend the app initialData with what we have in this.initialData
        const extendedResult = { 
          ...result,
          data: { 
            ...result.data,
            initialData: {
              ...result.data.initialData,
              payload: {
                ...result.data.initialData.payload,
                ...this.initialData,
              }
            }
          }
        }
        resolve(extendedResult);
      }).catch((err: Error) => reject(err));
    });
  }

  /**
   * getAppInitialData: Returns a promise that resolves to the App InitialData
   */
  public getAppInitialData(): ObjectIndex<any> {
    return this.initialData;
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