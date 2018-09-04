import { App, AppPosition } from './../types';
import { GridManager } from '../grid';
import { AppendAppStrategy } from '../strategies/mounting/append';
const windowObject: Window = window;

describe('GridManager tests', () => {
  const mockPosition: AppPosition = {
    type: 'relative-to-position',
    payload: {
      positionId: 'mid-center',
      offset: { x: 0, y: 0 },
    }
  }
  const mockApp: App = {
    id: 1,
    name: 'Test App',
    payload_type: 'html',
    payload: '',
    settings: {
      css: '',
      inlineCss: {},
      position: mockPosition,
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
      position: mockPosition,
    },
    organization_id: 1,
  }

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

  it('I see GridManager correctly created and configured', () => {
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

  it('GridManager _setGridDimensions works on different scenarios', () => {
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

  it('Can get the cell. getGridCell', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp);
    const cell = gm.getGridCell('center-center')
    
    expect(cell).toMatchObject({
      id: 'center-center',
      apps: [mockApp],
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

  it('Can get all apps in a cell. getAppsInCell', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp);
    gm.addAppToCell('center-center', mockApp2);
    const apps = gm.getAppsInCell('center-center');
    
    expect(apps.length).toBe(2);
    expect(apps).toContainEqual(mockApp);
    expect(apps).toContainEqual(mockApp2);
  });

  it('Can get an app. getApp', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp);
    const app = gm.getApp(1);
    
    expect(app).toMatchObject(mockApp);
  });

  it('Can remove an app. removeApp', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm.addAppToCell('center-center', mockApp);
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
