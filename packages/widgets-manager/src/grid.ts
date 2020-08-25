import { makePostionStrategy } from './strategies/position/creator';
import { App, Grid, GridCell, GridSettings, AddAppsStrategy, PositionStrategy } from "./types";

export const gridRules = {
  small: {
    columns: 1,
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
  },
  medium: {
    columns: 2,
    gutter: 10,
    padding: 10,
    positions: [
      'top-left',
      'top-right',
      'mid-left',
      'mid-right',
      'bottom-left',
      'bottom-right',
    ]
  },
  large: {
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
  }
}

export const getGridSettings = (
  rules: {[key in 'small' | 'medium'| 'large']: GridSettings},
  viewportWidth: number
): GridSettings => {
  // I change the breakpoint to most modern canonical values
  if (viewportWidth <= 480) {
    return rules.small
  } else if (viewportWidth > 481 && viewportWidth <= 1024) {
    return rules.medium
  } else {
    return rules.large
  }
}

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

  _configureGrid(maxWidth: number, maxHeight: number) {
    let numberOfCols = this.grid.settings.columns;
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
      cell.position.right = (column * cell.size.width) + cell.size.width;
      cell.position.top = row * cell.size.height;
      cell.position.bottom = (row * cell.size.height) + cell.size.height;
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

    // if cell map to a 3x3 grid push to the cell
    if (existingCell) {
      this._addToExistingCell(
        app,
        existingCell,
        makePostionStrategy(app.settings.position.type)
      );
    // if not map to the closet cell
    } else if(id.split('-')[1] === 'center') {
      this._addToClosetCell(
        app,
        id,
      );
    }
    // worst case scenario we push a new cell to the grid
    // this could **break the interface**
    else {
      this._addToNewCell(
        app,
        id,
        makePostionStrategy(app.settings.position.type)
      );
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

  // instead of create a new cell with need to map the closet cell that match on at least one axis x or y
  // the complete refactor it's going to be added in the next widget manager release
  _addToNewCell(app: App, id: string, positionStrategy: PositionStrategy) {
    if (positionStrategy.shouldAddNewPosition()) {
      this.grid.cells.push(this._createNewCell(id, app, positionStrategy.mountStrategy()));
    }
  }

  _addToClosetCell(app: App, id: string) {
    const splitPosition = id.split('-')
    // if cell is for kind center and layout is medium we push
    // to most closest left cell or if of unknown we fallback to top-left
    const cell = splitPosition[1] === 'center' ?
      this._findCell(`${splitPosition[0]}-left`) : this.grid.cells[0] ;
    // we know cell always exit but type say that could be undefined
    if(cell) {
      this._addToExistingCell(
        app,
        cell,
        makePostionStrategy(app.settings.position.type)
      );
    }
  }

  removeApp(appName: string) {
    const cell = this.getAppCell(appName);
    if (cell) {
      this.removeAppFromCell(cell.id, appName);
    }
  }

  getApp(appName: string): App | undefined {
    const cell = this.getAppCell(appName);
    if (!cell) return;

    const app = cell.apps.find((app) => app.slug === appName);
    return app;
  }

  getAppCell(appName: string): GridCell | undefined {
    const cell = this.grid.cells.find((cell) => !!cell.apps.find((app) => app.slug === appName));
    return cell;
  }

  removeAppFromCell(id: string, appName: string) {
    const foundIndex = this.grid.cells.findIndex((cell) => cell.id === id);
    if (foundIndex !== -1) {
      this.grid.cells[foundIndex].apps = this.grid.cells[foundIndex].apps.filter((currentApp) => currentApp.slug !== appName);
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
    let settings = getGridSettings(gridRules, window.innerWidth,);
    this._setGridDimensions(settings.columns, window.innerWidth, window.innerHeight);
  }
}
