import * as qs from 'qs';
import { Observer } from './stream/observer';
import { makePostionStrategy } from './strategies/position/creator';
import { diffBy } from './utils/index';
import { POSITION_RELATIVE_TO_ELEMENT, POSITION_RELATIVE_TO_PLACE, POSITION_FIXED_TO_TOP, APP_MODE_POPUP, APP_MODE_IFRAME } from './constants';
import { GridManager } from './grid';
import { App, GridCell, ObjectIndex, PromisedFunction } from "./types";
import { ReplaceAppStrategy } from './strategies/mounting/replace';

const diffByAppId = diffBy((x: App, y: App ) => x.id === y.id);

type Observable = {
  id: number,
  observer: Observer,
}

export class AppManager {
  gridManager: GridManager;
  fetchAppData: PromisedFunction;
  registeredApps: App[];
  observables: Observable[];
  
  constructor(registeredApps: App[], fetchAppData: PromisedFunction, gridManager: GridManager) {
    this.fetchAppData = fetchAppData;
    this.gridManager = gridManager;
    this.registeredApps = registeredApps || [];
    this.observables = [];
  }

  private getAppPositionName = (app: App) => {
    const positionStrategy = makePostionStrategy(app.settings.position.type);
    const positionName = positionStrategy.getNameId(app);
    return positionName;
  }

  private getAppMode = (app: App): string => {
    if (app.settings.queryParams && app.settings.queryParams['mode']) {
      return app.settings.queryParams['mode'];
    }

    return APP_MODE_IFRAME;
  }

  private addStyleString = (app: App) => {
    const { css } = app.settings;
    
    const node = document.createElement('style');
    node.id = `lt-${app.slug}-styles`;
    node.innerHTML = css;
    document.body.appendChild(node);
  }

  private subscribeToDomEvents(app: App) {
    if (app.settings.position.type === POSITION_RELATIVE_TO_ELEMENT) {
      const relativeElementId = app.settings.position.payload.relativeId;
      const relativeElement = document.getElementById(relativeElementId);
      if (relativeElement) {
        const observer = new Observer([relativeElement], () => {
          this.updateAppSettings(app.id, app.settings.inlineCss);
        });
        const observable = {
          id: app.id,
          observer: observer,
        }
        this.observables.push(observable);
      }
    }
  }

  private unSubscribeToDomEvents(appId: number) {
    const removeObservable = this.observables.find((elem) => elem.id === appId);
    if (removeObservable) {
      removeObservable.observer.disconnect();
    }
    this.observables = this.observables.filter((elem) => elem.id !== appId);
  }

  private createPopupForApp = (app: App) : Window | null => {
    const stringifiedUrlParams = qs.stringify({ queryParams: app.settings.queryParams }, { encode: false });

    return window.open(
      `${app.source}?appName=${app.slug}&${stringifiedUrlParams}`,
      `${app.slug}-popup`,
      `width=${parseInt(app.settings.size.width, 10)},height=${parseInt(app.settings.size.height, 10)},scrollbars=no,resizable=no`
    )
  }

  private createIframeForApp = (app: App, cell: GridCell): Node | null => {
    try {
      const positionStrategy = makePostionStrategy(app.settings.position.type);
      let iframe = this.getAppIframe(app) as HTMLIFrameElement;

      if (!iframe) {
        // We only create a new iframe if it does not exist
        // If not we just reuse the one we have it created
        iframe = document.createElement('iframe');
        iframe.id = `lt-${app.slug}`;
        
        if (app.payload_type === 'lt-basic-container-multimedia' ||
            app.payload_type === 'lt-webrtc'
        ) {
          (iframe as any).allow = "microphone *; camera *";
        }
      }

      const stringifiedUrlParams = qs.stringify({ queryParams: app.settings.queryParams }, { encode: false });

      iframe.src = `${app.source}?appName=${app.slug}&${stringifiedUrlParams}`;
      iframe.style.setProperty('width', app.settings.size.width);
      iframe.style.setProperty('height', app.settings.size.height);

      // Apply settings to the iframe style property
      Object.keys(app.settings.inlineCss).forEach((key: string) => {
        iframe.style.setProperty(key, app.settings.inlineCss[key]);
      });

      const positionProps = positionStrategy.getPositionProps(app, cell);

      Object.keys(positionProps).forEach((key: string) => {
        iframe.style.setProperty(key, positionProps[key]);
      });

      document.body.appendChild(iframe);

      // Add css style tag with style rules
      this.addStyleString(app);
      return iframe;
    } catch (error) {
      console.error('Could not position app on the screen. Check your configuration', error)
    }

    return null;
  }

  private getAppIframe = (app: App): HTMLElement | null => {
    return document.getElementById(`lt-${app.slug}`);
  }

  private getAppStyles = (app: App): HTMLElement | null => {
    return document.getElementById(`lt-${app.slug}-styles`);
  }

  private removeIframeForApp = (app: App) => {
    const appIframe = this.getAppIframe(app);
    const appStyles = this.getAppStyles(app);
    if (appIframe) {
      document.body.removeChild(appIframe);
    }
    if (appStyles) {
      document.body.removeChild(appStyles);
    }
  }

  private unMountApps = (apps: App[]): void => {
    apps.forEach((app) => {
      this.unMountApp(app.id);
    });
  }

  private mountApps = (cell: GridCell, apps: App[]) => {
    apps.forEach((app) => {
      if (this.getAppMode(app) === APP_MODE_POPUP) {
        this.createPopupForApp(app);
      } else {
        this.createIframeForApp(app, cell);
        this.subscribeToDomEvents(app);
      }
    });
  }

  public mountApp = (appId: number, initialData: any) => {
    this.fetchAppData(appId)
      .then((app: App) => {
        // Set app initial data if any
        this.setAppInitialData(appId, initialData);

        // Determine app position
        const { position } = app.settings;
        let positionId;
        switch (position.type) {
          case POSITION_RELATIVE_TO_ELEMENT:
            positionId = position.payload.relativeId;
            break;
          case POSITION_RELATIVE_TO_PLACE:
            positionId = position.payload.positionId;
            break;
          case POSITION_FIXED_TO_TOP:
            positionId = position.type;
            break;
          default:
            positionId = '';
            break;
        }
        
        // Get current loaded apps for the position
        const currentApps = this.gridManager.getAppsInCell(positionId);
        // Add this app to the positionId cell.id
        // This will call the proper strategy for adding
        this.gridManager.addAppToCell(positionId, app);
        const newApps = this.gridManager.getAppsInCell(positionId);

        // Obtain apps we need to add / remove
        const removeapps = diffByAppId(currentApps, newApps);
        const addapps = diffByAppId(newApps, currentApps);

        const cell = this.gridManager.getGridCell(positionId);
        if (cell) {
          this.unMountApps(removeapps);
          this.mountApps(cell, addapps);
        }
      });
  };
  
  public unMountApp = (appId: number) => {
    const app = this.getApp(appId);
    if (app) {
      this.removeIframeForApp(app);
      this.gridManager.removeApp(appId);
      this.unSubscribeToDomEvents(appId);
    }
  };

  public getApp = (appId: number) => {
    return this.registeredApps.find((app) => app.id === appId);
  };
  
  public getAppByName = (appName: string) => {
    return this.registeredApps.find((app) => app.slug === appName);
  };

  public getApps = (): App[] => {
    return this.registeredApps;
  }

  public setAppInitialData = (appId: number, initialData: any): void => {
    const appIndex = this.registeredApps.findIndex((app) => app.id === appId);
    if (appIndex !== -1) {
      this.registeredApps[appIndex].initialData = {...this.registeredApps[appIndex].initialData, ...initialData };
    }
  }

  public updateAllAppSettings = () => {
    this.gridManager.refreshGridDimension();
    const apps: App[] = this.getApps();
    apps.forEach((app) => {
      this.updateAppSettings(app.id, app.settings.inlineCss);
    });
  }

  public updateAppSettings = (appId: number, settings: ObjectIndex<string>) => {
    const app = this.getApp(appId);
    const cell = this.gridManager.getAppCell(appId);
    
    if (app && cell) {
      const positionStrategy = makePostionStrategy(app.settings.position.type);
      const positionProps = positionStrategy.getPositionProps(app, cell);

      const appIframe = this.getAppIframe(app);

      Object.keys(settings).forEach((key: string) => {
        appIframe && appIframe.style.setProperty(key, settings[key]);
      });

      Object.keys(positionProps).forEach((key: string) => {
        appIframe && appIframe.style.setProperty(key, positionProps[key]);
      });
    }
  };

  public getAllAppsForNamespace = (appNamespace: string): App[] => {
    const matchRule = (str: string, rule: string): boolean => {
      return new RegExp("^" + rule.split(".").join("\\.").split("*").join(".*") + "$").test(str);
    }
    const matchedApps = this.registeredApps.filter((app) => {
      const positionName = this.getAppPositionName(app);
      
      return matchRule(positionName, appNamespace);
    });

    return matchedApps;
  }
  
}


export const setupManager = (
  registeredApps: App[],
  fetchAppData: PromisedFunction,
) => {
  const settings = {
    columns: 3,
    gutter: 10,
    padding: 10,
    positions: [
      'top-left',
      'top-center',
      'top-right',
      'mid-left',
      'mid-center',
      'mid-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]
  };
  const replaceAppStrategy = new ReplaceAppStrategy();
  const gridManager = new GridManager(settings, window, replaceAppStrategy);
  const appManager = new AppManager(registeredApps, fetchAppData, gridManager);
  return appManager;
};

