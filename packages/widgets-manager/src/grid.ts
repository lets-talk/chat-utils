import { makePostionStrategy } from './strategies/position/creator';
import { App, Grid, GridCell, GridSettings, AddAppsStrategy, PositionStrategy } from "./types";

export class GridManager {
  grid: Grid;
  addAppsStrategy: AddAppsStrategy;

  constructor(settings: GridSettings, window: Window, addAppsStrategy: AddAppsStrategy) {
    this.grid = {
      settings,
      cells: [],
    };
    this.grid.settings = settings;
    this.addAppsStrategy = addAppsStrategy;
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
        position: { x: 0, y: 0 },
        size: { width: 0, height: 0 },
      })
    }
    this._setGridDimensions(numberOfCols, maxWidth, maxHeight);
  }

  _setGridDimensions(numberOfCols: number, width: number, height: number): void {
    const numberOfRows = this.grid.settings.positions.length / numberOfCols;
    this.grid.cells.map((cell, i) => {
      const row: number = Math.trunc(i / numberOfCols);
      const column:number = (i % numberOfCols);
      
      cell.id = this.grid.settings.positions[(row * numberOfCols) + column],
      
      cell.size.width = width / numberOfCols;
      cell.size.height = height / numberOfRows;
      
      cell.position.x = column * cell.size.width;
      cell.position.y = row * cell.size.height;
    });
  }

  _getAppCell(appId: number): GridCell | undefined {
    const cell = this.grid.cells.find((cell) => !!cell.apps.find((app) => app.id === appId));
    return cell;
  }

  _createNewCell(id: string, app: App): GridCell {
    return {
      id,
      apps: this.addAppsStrategy.add(app, []),
      position: {
        x: app.settings.position.payload.offset.x,
        y: app.settings.position.payload.offset.y,
      },
      size: { width: 0, height: 0 },
    }
  }

  addAppToCell(id: string, app: App) {
    const existingCell = this._findCell(id);
    if (existingCell) {
      this._addToExistingCell(app, existingCell);
    } else {
      this._addToNewCell(app, id, makePostionStrategy(app.settings.position.type));
    }
  }

  _findCell(id: string): GridCell | undefined {
    const foundIndex = this.grid.cells.findIndex((cell) => cell.id === id);
    if (foundIndex === -1) return undefined;

    return this.grid.cells[foundIndex];
  }

  _addToExistingCell(app: App, cell: GridCell) {
    cell.apps = this.addAppsStrategy.add(app, cell.apps);
  }

  _addToNewCell(app: App, id: string, positionStrategy: PositionStrategy) {
    if (positionStrategy.shouldAddNewPosition()) {
      this.grid.cells.push(this._createNewCell(id, app));
    }
  }

  removeApp(appId: number) {
    const cell = this._getAppCell(appId);
    if (cell) {
      this.removeAppFromCell(cell.id, appId);
    }
  }

  getApp(appId: number): App | undefined {
    const cell = this._getAppCell(appId);
    if (!cell) return;

    const app = cell.apps.find((app) => app.id === appId);
    return app;
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
}
