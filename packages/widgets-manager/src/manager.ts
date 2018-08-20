import 'isomorphic-fetch';
import { App, ObjectIndex } from "./types";

export class AppManager {
  baseUrl: string;
  urlParams: ObjectIndex;

  constructor(baseURL: string, params: ObjectIndex) {
    this.baseUrl = baseURL;
    this.urlParams = params;
  }

  addStyleString = (cssRules: string) => {
    const node = document.createElement('style');
    node.innerHTML = cssRules;
    document.body.appendChild(node);
  }

  mountApp = (appId: Number, appOnload: () => void) => {
    const iframe = document.createElement('iframe');
    iframe.id = `letstalk-app-${appId}`;
    iframe.onload = appOnload;
    
    const urlParams = Object.keys(this.urlParams).map(key => `${key}=${encodeURIComponent(this.urlParams[key])}`).join('&');
    const widgetAppUrl = `${this.baseUrl}/api/v1/widget_apps/${appId}?${urlParams}`;
    fetch(widgetAppUrl).then((widgetAppResonse) => {
      widgetAppResonse.json().then((appConfiguration: App) => {
        if (appConfiguration.payload_type === 'html') {
          iframe.src = appConfiguration.payload;
        }
        // Add css style tag with style rules
        this.addStyleString(appConfiguration.settings.css);
        
        // Apply settings to the iframe style property
        Object.keys(appConfiguration.settings.inlineCss).forEach((key: string) => {
          iframe.style.setProperty(key, appConfiguration.settings.inlineCss[key]);
        });
        // After setting all the configuration I append it to the dom
        document.body.appendChild(iframe);
      });
    });
  };
  
  unMountApp = (appId: Number) => {
    const appIframe = document.getElementById(`letstalk-app-${appId}`);
    if (appIframe) {
      document.body.removeChild(appIframe);
    }
  };

  updateAppSettings = (appId: Number, settings: ObjectIndex) => {
    const appIframe = document.getElementById(`letstalk-app-${appId}`);
    if (appIframe) {
      Object.keys(settings).forEach((key: string) => {
        appIframe.style.setProperty(key, settings[key]);
      });
    }
  };
}


export const setupManager = (
  baseUrl: string,
  params: ObjectIndex,
) => {
  const appManager = new AppManager(baseUrl, params);
  return appManager;
};



