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
    size: {} as any,
  },
  organization_id: 1,
  source: '',
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
    size: {} as any,
  },
  organization_id: 1,
  source: '',
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
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
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
          top: 0,
          right: 0,
          bottom: 0,
          left: 2 * (windowObject.innerWidth / 3),
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
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
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
          top: mobileHeight / 9,
          right: 0,
          bottom: 0,
          left: 0,
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
        left: windowObject.innerWidth / 3,
        right: 0,
        bottom: 0,
        top: windowObject.innerHeight / 3,
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
        top: 1 * (windowObject.innerHeight / 3),
        right: 0,
        bottom: 0,
        left: 1 * (windowObject.innerWidth / 3),
      },
      size: {
        width: windowObject.innerWidth / 3,
        height: windowObject.innerHeight / 3,
      }
    });
  });


});
