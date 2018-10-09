import { Observer } from './stream/observer';
import { makePostionStrategy } from './strategies/position/creator';
import { diffBy } from './utils/index';
import { POSITION_RELATIVE_TO_ELEMENT, POSITION_RELATIVE_TO_PLACE, POSITION_FIXED_TO_TOP } from './constants';
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
  observables: Observable[]; 
  
  constructor(fetchAppData: PromisedFunction, gridManager: GridManager) {
    this.fetchAppData = fetchAppData;
    this.gridManager = gridManager;
    this.observables = [];
  }

  _addStyleString = (app: App) => {
    const { css } = app.settings;
    const node = document.createElement('style');
    node.id = `letstalk-app-${app.id}-styles`;
    node.innerHTML = css;
    document.body.appendChild(node);
  }

  _subscribeToDomEvents(app: App) {
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

  _unSubscribeToDomEvents(appId: number) {
    const removeObservable = this.observables.find((elem) => elem.id === appId);
    if (removeObservable) {
      removeObservable.observer.disconnect();
    }
    this.observables = this.observables.filter((elem) => elem.id !== appId);
  }

  _createIframeForApp = (app: App, cell: GridCell): Node | null => {
    if (!this._getAppIframe(app.id)) {
      const iframe = document.createElement('iframe');
      iframe.id = `letstalk-app-${app.id}`;

      if (app.payload_type === 'html' || app.payload_type === 'markdown') {
        iframe.src = `${app.source}?appId=${app.id}`;
      }

      iframe.style.setProperty('width', app.settings.size.width);
      iframe.style.setProperty('height', app.settings.size.height);

      // Apply settings to the iframe style property
      Object.keys(app.settings.inlineCss).forEach((key: string) => {
        iframe.style.setProperty(key, app.settings.inlineCss[key]);
      });

      try {
        const positionStrategy = makePostionStrategy(app.settings.position.type);
        const positionProps = positionStrategy.getPositionProps(app, cell);
  
        Object.keys(positionProps).forEach((key: string) => {
          iframe.style.setProperty(key, positionProps[key]);
        });
  
        document.body.appendChild(iframe);
  
        // Add css style tag with style rules
        this._addStyleString(app);
      } catch (error) {
        console.error('Could not position app on the screen. Check your configuration', error)
      }

      return iframe;
    }

    return null;
  }

  _getAppIframe = (appId: number): HTMLElement | null => {
    return document.getElementById(`letstalk-app-${appId}`);
  }

  _getAppStyles = (appId: number): HTMLElement | null => {
    return document.getElementById(`letstalk-app-${appId}-styles`);
  }

  _removeIframeForApp = (appId: number) => {
    const appIframe = this._getAppIframe(appId);
    const appStyles = this._getAppStyles(appId);
    if (appIframe) {
      document.body.removeChild(appIframe);
    }
    if (appStyles) {
      document.body.removeChild(appStyles);
    }
  }

  _unMountApps = (apps: App[]): void => {
    apps.forEach((app) => {
      this.unMountApp(app.id);
    });
  }

  _mountApps = (cell: GridCell, apps: App[]) => {
    apps.forEach((app) => {
      this._createIframeForApp(app, cell);
      this._subscribeToDomEvents(app);
    });
  }

  mountApp = (appId: number) => {
    this.fetchAppData(appId)
      .then((widgetAppResonse) => widgetAppResonse.json())
      .then((app: App) => {
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
        
        const currentApps = this.gridManager.getAppsInCell(positionId);
        // Add this app to the positionId cell.id
        // This will call the proper strategy for adding
        this.gridManager.addAppToCell(positionId, app);
        const newApps = this.gridManager.getAppsInCell(positionId);

        const removeapps = diffByAppId(currentApps, newApps);
        const addapps = diffByAppId(newApps, currentApps);

        const cell = this.gridManager.getGridCell(positionId);
        if (cell) {
          this._unMountApps(removeapps);
          this._mountApps(cell, addapps);
        }
      });
  };
  
  unMountApp = (appId: number) => {
    this._removeIframeForApp(appId);
    this.gridManager.removeApp(appId);
    this._unSubscribeToDomEvents(appId);
  };

  getApp = (appId: number) => {
    return this.gridManager.getApp(appId);
  };

  updateAllAppSettings = () => {
    this.gridManager.refreshGridDimension();
    const apps: App[] = this.gridManager.getApps();
    apps.forEach((app) => {
      this.updateAppSettings(app.id, app.settings.inlineCss);
    });
  }

  updateAppSettings = (appId: number, settings: ObjectIndex) => {
    const app = this.gridManager.getApp(appId);
    const cell = this.gridManager.getAppCell(appId);
    const appIframe = this._getAppIframe(appId);
    if (app && appIframe) {
      Object.keys(settings).forEach((key: string) => {
        appIframe.style.setProperty(key, settings[key]);
      });

      const positionStrategy = makePostionStrategy(app.settings.position.type);
      const positionProps = positionStrategy.getPositionProps(app, cell);

      Object.keys(positionProps).forEach((key: string) => {
        appIframe.style.setProperty(key, positionProps[key]);
      });
    }
  };
}


export const setupManager = (
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
  const appManager = new AppManager(fetchAppData, gridManager);
  return appManager;
};

