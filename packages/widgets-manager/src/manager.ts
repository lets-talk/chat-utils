import 'isomorphic-fetch';
import { App } from "./types";

export class AppManager {
  baseUrl: string;

  constructor(baseURL: string) {
    this.baseUrl = baseURL;
  }

  mountApp = (appId: Number, appOnload: () => void) => {
    const iframe = document.createElement('iframe');
    iframe.id = `letstalk-app-${appId}`;
    iframe.onload = appOnload;
  
    const widgetAppUrl = `${this.baseUrl}/api/v1/widget_apps/${appId}`;
    fetch(widgetAppUrl).then((widgetAppResonse) => {
      widgetAppResonse.json().then((appConfiguration: App) => {
        if (appConfiguration.payload_type === 'html') {
          iframe.src = appConfiguration.payload;
        }
  
        Object.keys(appConfiguration.settings).forEach((key: string) => {
          iframe.style.setProperty(key, appConfiguration.settings[key]);
        });
      });
    });

    document.body.appendChild(iframe);
  };
  
  unMountApp = (appId: Number) => {
    const appIframe = document.getElementById(`letstalk-app-${appId}`);
    if (appIframe) {
      document.body.removeChild(appIframe);
    }
  };
}


export const setupManager = (
  baseUrl: string,
) => {
  const appManager = new AppManager(baseUrl);
  return appManager;
};



