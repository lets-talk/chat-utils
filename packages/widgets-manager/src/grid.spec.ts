import { GridManager } from './grid';
import { AppendAppStrategy } from './strategies/mounting/append';
import { App, AppPosition, HTMLFloatType } from './types';
const windowObject: Window = window;

const mockPositionRelativeToPosition: AppPosition = {
  type: 'relative-to-position',
  payload: {
    positionId: 'mid-center',
    offset: { top: 0, right: 0, bottom: 0, left: 0 },
  }
};

const mockPositionRelativeToElement: AppPosition = {
  type: 'relative-to-element',
  payload: {
    floatType: HTMLFloatType.fixed,
    relativeId: 'mockElement',
    offsetX: {
      relationType: 'LL',
      value: 0,
    },
    offsetY: {
      relationType: 'BT',
      value: 0,
    }
  }
};

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

  it('getAppsInCell. I can get the app relative to a position', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    const mockApp1: App = {
      id: 1,
      name: 'App1 Relative To Position mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
      },
      organization_id: 1,
      source: '',
    }
    
    const mockApp2: App = {
      id: 2,
      name: 'App2 Relative To Position mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
      },
      organization_id: 1,
      source: '',
    }

    gm.addAppToCell('center-center', mockApp1);
    gm.addAppToCell('center-center', mockApp2);
    const apps = gm.getAppsInCell('center-center');
    
    // Putting 2 apps with position relative to same POSITION
    // Should use replace stratey. So we expect 1 app only
    expect(apps.length).toBe(1);
    expect(apps).toContainEqual(mockApp2);
  });

  it('getAppsInCell. I can obtain the 2 apps relative to and element', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);

    const mockApp1: App = {
      id: 1,
      name: 'Relative To Element',
      payload_type: 'markdown',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToElement,
        size: {} as any,
      },
      organization_id: 1,
      source: '',
    }
    
    const mockApp2: App = {
      id: 2,
      name: 'Relative to the same element different offsetX',
      payload_type: 'markdown',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: { 
          ...mockPositionRelativeToElement,
          payload: {
            ...mockPositionRelativeToElement.payload,
            offsetX: {
              relationType: 'LR',
              value: 0,
            }
          }
        },
        size: {} as any,
      },
      organization_id: 1,
      source: '',
    }

    gm.addAppToCell('mockElement', mockApp1);
    gm.addAppToCell('mockElement', mockApp2);
    const apps = gm.getAppsInCell('mockElement');
    
    // Putting 2 apps with position relative to same ELEMENT
    // Should use add stratey. So we expect 2 apps
    expect(apps.length).toBe(2);
    expect(apps).toContainEqual(mockApp1);
    expect(apps).toContainEqual(mockApp2);
  });

  it('getApp. Gets an app by id', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    const mockApp1: App = {
      id: 1,
      name: 'App1 Relative To Position mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
      },
      organization_id: 1,
      source: '',
    }

    gm.addAppToCell('mid-center', mockApp1);
    const app = gm.getApp(1);
    
    expect(app).toMatchObject(mockApp1);
  });

  it('removeApp. Remove an app by id', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);

    const mockApp1: App = {
      id: 1,
      name: 'App1 Relative To Position mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
      },
      organization_id: 1,
      source: '',
    }

    gm.addAppToCell('mid-center', mockApp1);
    gm.removeApp(1);
    const cell = gm.getGridCell('mid-center');
    
    expect(cell).toMatchObject({
      id: 'mid-center',
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

  it('refreshGridDimension. Refresh Grid dimension when in mobile. 1 column case', () => {
    // Set small window to emulate mobile
    Object.defineProperty(windowObject, "innerWidth", {
      value: 319,
      writable: true
    });
    Object.defineProperty(windowObject, "innerHeight", {
      value: 400,
      writable: true
    });
    
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm._setGridDimensions = jest.fn();
    
    // This will refresh the grid dimensions with 1 column only 
    gm.refreshGridDimension();
    
    expect(gm._setGridDimensions).toBeCalledWith(1, 319, 400);
  });
  
  it('refreshGridDimension. Refresh Grid dimension when in mobile. 2 columns case', () => {
    // Set small window to emulate mobile
    Object.defineProperty(windowObject, "innerWidth", {
      value: 321,
      writable: true
    });
    Object.defineProperty(windowObject, "innerHeight", {
      value: 400,
      writable: true
    });
    
    const gm = new GridManager(settings, windowObject, addStrategy);
    gm._setGridDimensions = jest.fn();
    
    // This will refresh the grid dimensions with 1 column only 
    gm.refreshGridDimension();
    
    expect(gm._setGridDimensions).toBeCalledWith(2, 321, 400);
  });

});
