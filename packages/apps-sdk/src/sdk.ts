import postRobot from 'post-robot';
import Listener from './listener';

import { EventData } from './types';

import {
  EVENT_TYPE_EXECUTE_APP_METHOD,
  EVENT_TYPE_GET_APP_SETTINGS,
  EVENT_TYPE_LOAD_APP,
  EVENT_TYPE_REMOVE_APP,
} from './constants';

export class SDK extends Listener {
  private channelManager: any;
  private sendChannel: any;
  private recieveChannel: any;

  constructor(channelFactory = () => postRobot) {
    super();
    // Define Communication Channels
    this.channelManager = channelFactory();
    this.sendChannel = this.channelManager.client({ window: parent.top, domain: '*' });
    this.recieveChannel = this.channelManager.listener({ window: parent.top, domain: '*' });

    // Register the listeners for recieve messages
    this.recieveChannel.on(EVENT_TYPE_EXECUTE_APP_METHOD, (event: EventData) => {
      const { method, args } = event.data;
      return this.fire(method, args);
    });
  }
  /**
   * openApp
   * @param appNamespace The app namespace to execute the open
   */
  public openApp(appNamespace: string): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_LOAD_APP, { appNamespace });
  }
  /**
   * getAppSettings
   * @param appNamespace The app namespace to execute the open
   */
  public getAppSettings(appNamespace: string): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_GET_APP_SETTINGS, { appNamespace });
  }
  /**
   * closeApp
   * @param appNamespace The app namespace to execute the close
   */
  public closeApp(appNamespace: string): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_REMOVE_APP, { appNamespace });
  }
  /**
   * ExecuteAppMethod
   * @param appNamespace The app namespace to execute the executeAppMethod
   * @param method The method to call
   * @param args The data we want to pass to the function as arguments
   */
  public executeAppMethod(appNamespace: string, method: string, args: any): Promise<any> {
    return this.sendChannel.send(EVENT_TYPE_EXECUTE_APP_METHOD, { appNamespace, payload: { method, args } });
  }

  public registerMethod(method: string, callback: () => void) {
    this.addListener(method, callback);
  }
}