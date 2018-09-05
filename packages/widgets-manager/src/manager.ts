import { makePostionStrategy } from './strategies/position/creator';
import { diffBy } from './utils/index';
import { POSITION_RELATIVE_TO_ELEMENT, POSITION_RELATIVE_TO_PLACE, POSITION_FIXED_TO_TOP } from './constants';
import { GridManager } from './grid';
import { App, ObjectIndex, GridCell } from "./types";
import { ReplaceAppStrategy } from './strategies/mounting/replace';

const diffByAppId = diffBy((x: App, y: App ) => x.id === y.id);

export class AppManager {
  gridManager: GridManager;
  fetchAppData: (appId: number) => Promise<any>;
  
  constructor(fetchAppData: (appId: number) => Promise<any>, gridManager: GridManager) {
    this.fetchAppData = fetchAppData;
    this.gridManager = gridManager;
  }

  _addStyleString = (app: App) => {
    const { css } = app.settings;
    const node = document.createElement('style');
    node.id = `letstalk-app-${app.id}-styles`;
    node.innerHTML = css;
    document.body.appendChild(node);
  }

  _createIframeForApp = (app: App, cell: GridCell) => {
    if (!document.getElementById(`letstalk-app-${app.id}`)) {
      const iframe = document.createElement('iframe');
      iframe.id = `letstalk-app-${app.id}`;

      if (app.payload_type === 'html') {
        iframe.src = `${app.payload}?appId=${app.id}`;
      }

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
    }
  }

  _removeIframeForApp = (appId: number) => {
    const appIframe = document.getElementById(`letstalk-app-${appId}`);
    const appStyles = document.getElementById(`letstalk-app-${appId}-styles`);
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
      this.gridManager.removeApp(app.id);
    });
  }

  _mountApps = (cell: GridCell, apps: App[]) => {
    apps.forEach((app) => {
      this._createIframeForApp(app, cell);
    });
  }

  mountApp = (appId: number) => {
    this.fetchAppData(appId).then((widgetAppResonse) => {
      widgetAppResonse.json().then((appConfiguration: App) => {
        const { position } = appConfiguration.settings;
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
        this.gridManager.addAppToCell(positionId, appConfiguration);
        const newApps = this.gridManager.getAppsInCell(positionId);

        const removeapps = diffByAppId(currentApps, newApps);
        const addapps = diffByAppId(newApps, currentApps);

        const cell = this.gridManager.getGridCell(positionId);
        if (cell) {
          this._unMountApps(removeapps);
          this._mountApps(cell, addapps);
        }
      });
    });
  };
  
  unMountApp = (appId: number) => {
    this.gridManager.removeApp(appId);
    this._removeIframeForApp(appId);
  };

  getApp = (appId: number) => {
    return this.gridManager.getApp(appId);
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
  fetchAppData: (appId: number) => Promise<any>,
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

