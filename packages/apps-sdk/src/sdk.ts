import postRobot from 'post-robot';

import {
  EVENT_TYPE_GET_APP_SETTINGS,
  EVENT_TYPE_LOAD_APP,
  EVENT_TYPE_REMOVE_APP,
} from './constants';

export class SDK {
  private channelManager: any;
  private sendChannel: any;

  constructor(channelFactory = () => postRobot) {
    super();
    // Define Communication Channels
    this.channelManager = channelFactory();
    this.sendChannel = this.channelManager.client({ window: parent.top, domain: '*' });
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
}