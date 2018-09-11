import { GridManager } from './grid';
import { AppendAppStrategy } from './strategies/mounting/append';
import { App } from './types';
const windowObject: Window = window;

const mockApp1: App = {
  id: 1,
  name: 'Test App',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: {} as any,
  },
  organization_id: 1,
}

const mockApp2: App = {
  id: 2,
  name: 'Test App2',
  payload_type: 'html',
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: {} as any,
  },
  organization_id: 1,
}

describe('GridManager', () => {
  const settings = {
    columns: 3,
    gutter: 10,
    padding: 10,
    positions: [
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]
  };
  const addStrategy = new AppendAppStrategy();

  it('creates and configures a GridManager', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    expect(gm.grid.cells.length).toBe(9);
    expect(gm.grid.cells).toContainEqual(
      {
        id: 'top-left',
        apps: [],
        position: {
          x: 0,
          y: 0,
        },
        size: {
          width: windowObject.innerWidth / 3,
          height: windowObject.innerHeight / 3,
        }
      }
    );

    expect(gm.grid.cells).toContainEqual(
      {
        id: 'top-right',
        apps: [],
        position: {
          x: 2 * (windowObject.innerWidth / 3),
          y: 0,
        },
        size: {
          width: windowObject.innerWidth / 3,
          height: windowObject.innerHeight / 3,
        }
      }
    );

  });

  it('_setGridDimensions. It sets correct cell sizes', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    const mobileWidth = 300;
    const mobileHeight = 600;

    gm._setGridDimensions(1, mobileWidth, mobileHeight);

    expect(gm.grid.cells.length).toBe(9);
    expect(gm.grid.cells).toContainEqual(
      {
        id: 'top-left',
        apps: [],
        position: {
          x: 0,
          y: 0,
        },
        size: {
          width: mobileWidth,
          height: mobileHeight / 9,
        }
      }
    );

    expect(gm.grid.cells).toContainEqual(
      {
        id: 'top-center',
        apps: [],
        position: {
          x: 0,
          y: mobileHeight / 9,
        },
        size: {
          width: mobileWidth,
          height: mobileHeight / 9,
        }
      }
    );
  });

  it('getGridCell. Gets a cell by id', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp1);
    const cell = gm.getGridCell('center-center')
    
    expect(cell).toMatchObject({
      id: 'center-center',
      apps: [mockApp1],
      position: {
        x: windowObject.innerWidth / 3,
        y: windowObject.innerHeight / 3,
      },
      size: {
        width: windowObject.innerWidth / 3,
        height: windowObject.innerHeight / 3,
      }
    });
  });

  it('getAppsInCell. Gets all apps in a cell', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp1);
    gm.addAppToCell('center-center', mockApp2);
    const apps = gm.getAppsInCell('center-center');
    
    expect(apps.length).toBe(2);
    expect(apps).toContainEqual(mockApp1);
    expect(apps).toContainEqual(mockApp2);
  });

  it('getApp. Gets an app by id', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp1);
    const app = gm.getApp(1);
    
    expect(app).toMatchObject(mockApp1);
  });

  it('removeApp. Remove an app by id', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp1);
    gm.removeApp(1);
    const cell = gm.getGridCell('center-center');
    
    expect(cell).toMatchObject({
      id: 'center-center',
      apps: [],
      position: {
        x: 1 * (windowObject.innerWidth / 3),
        y: 1 * (windowObject.innerHeight / 3),
      },
      size: {
        width: windowObject.innerWidth / 3,
        height: windowObject.innerHeight / 3,
      }
    });
  });


});
