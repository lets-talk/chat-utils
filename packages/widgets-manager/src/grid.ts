import { makePostionStrategy } from './strategies/position/creator';
import { App, Grid, GridCell, GridSettings, AddAppsStrategy, PositionStrategy } from "./types";

export class GridManager {
  grid: Grid<GridCell>;
  addAppsStrategy: AddAppsStrategy;

  constructor(settings: GridSettings, window: Window, defaultAddAppsStrategy: AddAppsStrategy) {
    this.grid = {
      settings,
      cells: [],
    };
    this.grid.settings = settings;
    this.addAppsStrategy = defaultAddAppsStrategy;
    this._configureGrid(window.innerWidth, window.innerHeight);
  }

  // TODO: Refactor this to use real media query break point values
  /* istanbul ignore next */
  _getNumberOfColsForWidth(width: number): number {
    if (width <= 320) {
      return 1;
    } else if (width > 320 && width <= 768) {
      return 2;
    }
    return this.grid.settings.columns;
  }

  _configureGrid(maxWidth: number, maxHeight: number) {
    let numberOfCols = this._getNumberOfColsForWidth(maxWidth);
    const numberOfPositions = this.grid.settings.positions.length;
    for (let i = 0; i < numberOfPositions; i++) {
      this.grid.cells.push({
        id: this.grid.settings.positions[i],
        apps: [],
        position: { top: 0, right: 0, bottom: 0, left: 0 },
        size: { width: 0, height: 0 },
      });
    }
    this._setGridDimensions(numberOfCols, maxWidth, maxHeight);
  }

  _setGridDimensions(numberOfCols: number, width: number, height: number): void {
    const numberOfRows = this.grid.settings.positions.length / numberOfCols;
    this.grid.cells.map((cell: GridCell, i: number) => {
      const row: number = Math.trunc(i / numberOfCols);
      const column:number = (i % numberOfCols);
      
      cell.size.width = width / numberOfCols;
      cell.size.height = height / numberOfRows;
      
      cell.position.left = column * cell.size.width;
      cell.position.top = row * cell.size.height;
    });
  }

  _createNewCell(id: string, app: App, addStrategy: AddAppsStrategy): GridCell {
    return {
      id,
      apps: addStrategy.add(app, []),
      position: { top: 0, right: 0, bottom: 0, left: 0 },
      size: { width: 0, height: 0 },
    };
  }

  addAppToCell(id: string, app: App) {
    const existingCell = this._findCell(id);
    if (existingCell) {
      this._addToExistingCell(app, existingCell, makePostionStrategy(app.settings.position.type));
    } else {
      this._addToNewCell(app, id, makePostionStrategy(app.settings.position.type));
    }
  }

  _findCell(id: string): GridCell | undefined {
    const foundIndex = this.grid.cells.findIndex((cell) => cell.id === id);
    if (foundIndex === -1) return undefined;

    return this.grid.cells[foundIndex];
  }

  _addToExistingCell(app: App, cell: GridCell, positionStrategy: PositionStrategy) {
    cell.apps = positionStrategy.mountStrategy().add(app, cell.apps);
  }

  _addToNewCell(app: App, id: string, positionStrategy: PositionStrategy) {
    if (positionStrategy.shouldAddNewPosition()) {
      this.grid.cells.push(this._createNewCell(id, app, positionStrategy.mountStrategy()));
    }
  }

  removeApp(appId: number) {
    const cell = this.getAppCell(appId);
    if (cell) {
      this.removeAppFromCell(cell.id, appId);
    }
  }

  getApp(appId: number): App | undefined {
    const cell = this.getAppCell(appId);
    if (!cell) return;

    const app = cell.apps.find((app) => app.id === appId);
    return app;
  }

  getAppCell(appId: number): GridCell | undefined {
    const cell = this.grid.cells.find((cell) => !!cell.apps.find((app) => app.id === appId));
    return cell;
  }

  removeAppFromCell(id: string, appId: number) {
    const foundIndex = this.grid.cells.findIndex((cell) => cell.id === id);
    if (foundIndex !== -1) {
      this.grid.cells[foundIndex].apps = this.grid.cells[foundIndex].apps.filter((currentApp) => currentApp.id !== appId);
    }
  }

  getGridCell(id: string): GridCell | undefined {
    const cell = this.grid.cells.find((cell) => cell.id === id);
    return cell;
  }

  getAppsInCell(id: string): App[] {
    const cell = this.getGridCell(id);
    if (!cell) return [];
    return cell.apps;
  }

  getApps(): App[] {
    let apps: App[] = [];
    this.grid.cells.forEach(cell => {
      apps = apps.concat(cell.apps)
    });
    return apps;
  }

  refreshGridDimension() {
    let numberOfCols = this._getNumberOfColsForWidth(window.innerWidth);
    this._setGridDimensions(numberOfCols, window.innerWidth, window.innerHeight);
  }
}
