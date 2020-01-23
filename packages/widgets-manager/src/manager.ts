import * as qs from 'qs';
import { Observer } from './stream/observer';
import { makePostionStrategy } from './strategies/position/creator';
import { diffBy } from './utils/index';
import { POSITION_RELATIVE_TO_ELEMENT, POSITION_RELATIVE_TO_PLACE, POSITION_FIXED_TO_TOP, APP_MODE_POPUP, APP_MODE_IFRAME } from './constants';
import { GridManager } from './grid';
import { App, GridCell, AppInlineStyle } from "./types";
import { Store } from 'redux';
import { selectApps, selectCurrentlyMountedApps } from './selectors/apps';
import { initialState } from './store/initialState';
import { ApplicationState } from './store/types';

const debug = require('debug')('widgets-manager:manager');
const diffByAppId = diffBy((x: App, y: App ) => x.id === y.id);

type Observable = {
  id: string,
  observer: Observer,
}

export class AppManager {
  store?: Store;
  state: ApplicationState;
  gridManager!: GridManager;
  observables!: Observable[];
  
  constructor(gridManager: GridManager) {
    this.gridManager = gridManager;
    this.observables = [];
    this.state = initialState;
  }

  private _getAppPositionName = (app: App) => {
    const positionStrategy = makePostionStrategy(app.settings.position.type);
    const positionName = positionStrategy.getNameId(app);
    return positionName;
  }

  private _getAppMode = (app: App): string => {
    if (app.settings.queryParams && app.settings.queryParams['mode']) {
      return app.settings.queryParams['mode'];
    }

    return APP_MODE_IFRAME;
  }

  private _addStyleString = (app: App) => {
    const { css } = app.settings;
    
    const node = document.createElement('style');
    node.id = `lt-${app.slug}-styles`;
    node.innerHTML = css;
    document.body.appendChild(node);
  }

  private _subscribeToDomEvents(app: App) {
    if (app.settings.position.type === POSITION_RELATIVE_TO_ELEMENT) {
      const relativeElementId = app.settings.position.payload.relativeId;
      const relativeElement = document.getElementById(relativeElementId);
      if (relativeElement) {
        const observer = new Observer([relativeElement], () => {
          this.updateAppSettings(app.slug, app.settings.inlineCss);
        });
        const observable = {
          id: app.slug,
          observer: observer,
        }
        this.observables.push(observable);
      }
    }
  }

  private _unSubscribeToDomEvents(appName: string) {
    const removeObservable = this.observables.find((elem) => elem.id === appName);
    if (removeObservable) {
      removeObservable.observer.disconnect();
    }
    this.observables = this.observables.filter((elem) => elem.id !== appName);
  }

  private _createPopupForApp = (app: App) : Window | null => {
    const stringifiedUrlParams = qs.stringify({ queryParams: app.settings.queryParams }, { encode: false });

    return window.open(
      `${app.source}?appName=${app.slug}&${stringifiedUrlParams}`,
      `${app.slug}-popup`,
      `width=${parseInt(app.settings.size.width, 10)},height=${parseInt(app.settings.size.height, 10)},scrollbars=no,resizable=no`
    )
  }

  private _createContainerForApp = (app: App, cell: GridCell, iframe: HTMLElement): Node => {
    const positionStrategy = makePostionStrategy(app.settings.position.type);

    const div = document.createElement('div');
    div.id = `lt-app-container-${app.slug}`;
    div.style.display = 'block';
    div.style.padding = '0';
    div.style.margin = '0';
    div.style.border = 'none';
    div.style.display = 'block';

    const innerDiv = document.createElement('div');
    innerDiv.id = `lt-app-frame-${app.slug}`
    innerDiv.style.height = app.settings.size.height;
    innerDiv.style.width = app.settings.size.width;
    innerDiv.style.position = 'fixed';
    innerDiv.style.overflow = 'hidden!important';
    innerDiv.style.opacity = '1!important';

    // Apply settings to the iframe style property
    Object.keys(app.settings.inlineCss.default).forEach((key: string) => {
      innerDiv.style.setProperty(key, app.settings.inlineCss.default[key]);
    });

    const positionProps = positionStrategy.getPositionProps(app, cell);

    Object.keys(positionProps).forEach((key: string) => {
      innerDiv.style.setProperty(key, positionProps[key]);
    });

    innerDiv.appendChild(iframe);

    div.appendChild(innerDiv);
    document.body.appendChild(div);
    return div;
  }

  private _createAppIframe = (app: App): HTMLIFrameElement => {
    // We only create a new iframe if it does not exist
    // If not we just reuse the one we have it created
    const iframe = document.createElement('iframe');
    iframe.id = `lt-app-iframe-${app.slug}`;
    
    if (app.payload_type === 'lt-basic-container-multimedia' ||
        app.payload_type === 'lt-webrtc'
    ) {
      (iframe as any).allow = "microphone *; camera *";
    }

    const stringifiedUrlParams = qs.stringify({ queryParams: app.settings.queryParams }, { encode: false });

    iframe.src = `${app.source}?appName=${app.slug}&${stringifiedUrlParams}`;
    iframe.style.setProperty('width', '100%');
    iframe.style.setProperty('height', '100%');
    iframe.style.setProperty('border', 'none');

    return iframe;
  }

  private _createDivContainerForApp = (app: App, cell: GridCell): Node | null => {
    try {
      let iframe = this._getAppIframe(app) as HTMLIFrameElement;

      if (!iframe) {
        // We only create a new iframe if it does not exist
        // If not we just reuse the one we have it created
        iframe = this._createAppIframe(app);
        // Create app-container and frame-container divs
        this._createContainerForApp(app, cell, iframe);
        // Add css style tag with style rules
        this._addStyleString(app);
      }

      return iframe;
    } catch (error) {
      console.error('Could not position app on the screen. Check your configuration', error)
    }

    return null;
  }

  private _getAppContainer = (app: App): HTMLElement | null => {
    return document.getElementById(`lt-app-container-${app.slug}`);
  }

  private _getAppFrame = (app: App): HTMLElement | null => {
    return document.getElementById(`lt-app-frame-${app.slug}`);
  }

  private _getAppIframe = (app: App): HTMLElement | null => {
    return document.getElementById(`lt-app-iframe-${app.slug}`);
  }

  private _getAppStyles = (app: App): HTMLElement | null => {
    return document.getElementById(`lt-${app.slug}-styles`);
  }

  private _removeContainerForApp = (app: App) => {
    const appContainer = this._getAppContainer(app);
    const appStyles = this._getAppStyles(app);
    if (appContainer) {
      document.body.removeChild(appContainer);
    }
    if (appStyles) {
      document.body.removeChild(appStyles);
    }
  }

  private unMountApps = (apps: App[]): void => {
    apps.forEach((app) => {
      this.unMountApp(app.slug);
    });
  }

  private mountApps = (cell: GridCell, apps: App[]) => {
    apps.forEach((app) => {
      if (this._getAppMode(app) === APP_MODE_POPUP) {
        this._createPopupForApp(app);
      } else {
        this._createDivContainerForApp(app, cell);
        this._subscribeToDomEvents(app);
      }
    });
  }

  private updateState() {
    const state = this.store && this.store.getState() || initialState;
    this.state = state;
    debug('updateState this.state', this.state);
  }

  public initialize(store: Store<any>) {
    this.store = store;
    this.store.subscribe(this.updateState.bind(this));
  }

  public mountApp = (appName: string) => {
    debug('mountApp with (appName)', appName);
    // Set app initial data if any
    const app = this.getAppByName(appName);

    if (!app) return;

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
  };

  public unMountApp = (appName: string) => {
    debug('unMountApp(appName)', appName);
    const app = this.getAppByName(appName);
    if (app) {
      this._removeContainerForApp(app);
      this.gridManager.removeApp(appName);
      this._unSubscribeToDomEvents(appName);
    }
  };
  
  public getAppByName = (appName: string) => {
    const apps = this.getApps();
    const app = apps.find((app: App) => app.slug === appName);
    debug('getAppByName(appName), app', appName, app);
    return app;
  };

  public getApps = (): App[] => {
    return selectApps(this.state);
  }
  
  public getMountedApps = (): App[] => {
    return selectCurrentlyMountedApps(this.state);
  }

  public updateAllAppSettings = () => {
    debug('updateAppAppSettings');
    this.gridManager.refreshGridDimension();
    const apps: App[] = this.getApps();
    apps.forEach((app) => {
      this.updateAppSettings(app.slug, app.settings.inlineCss);
    });
  }

  public updateAppSettings = (appName: string, appInlineStyle: AppInlineStyle) => {
    debug('updateAppSettings appName, appInlineStyle', appName, appInlineStyle);
    const app = this.getAppByName(appName);
    const cell = this.gridManager.getAppCell(appName);
    
    if (app && cell) {
      const positionStrategy = makePostionStrategy(app.settings.position.type);
      const positionProps = positionStrategy.getPositionProps(app, cell);

      const appContainer = this._getAppFrame(app);

      Object.keys(appInlineStyle.default).forEach((key: string) => {
        appContainer && appContainer.style.setProperty(key, appInlineStyle.default[key]);
      });

      Object.keys(positionProps).forEach((key: string) => {
        appContainer && appContainer.style.setProperty(key, positionProps[key]);
      });
    }
  };

  public getAllAppsForNamespace = (appNamespace: string): App[] => {
    debug('getAllAppsForNamespace(appNamespace)', appNamespace);
    const matchRule = (str: string, rule: string): boolean => {
      return new RegExp("^" + rule.split(".").join("\\.").split("*").join(".*") + "$").test(str);
    }
    const matchedApps = this.getApps().filter((app) => {
      const positionName = this._getAppPositionName(app);
      
      return matchRule(positionName, appNamespace);
    });

    return matchedApps;
  }
}

