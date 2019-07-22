import { GridManager } from './grid';
import { AppendAppStrategy } from './strategies/mounting/append';
import { App, AppPosition, HTMLFloatType } from './types';
const windowObject: Window = window;

const mockPositionRelativeToPosition: AppPosition = {
  type: 'relative-to-position',
  payload: {
    positionId: 'mid-center',
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
      'mid-left',
      'mid-center',
      'mid-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]
  };
  const addStrategy = new AppendAppStrategy();

  it('creates and configures a GridManager', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);

    const cellHeight = windowObject.innerHeight / 3;
    const cellWidth = windowObject.innerWidth / 3;

    expect(gm.grid.cells.length).toBe(9);
    expect(gm.grid.cells).toContainEqual(
      {
        id: 'top-left',
        apps: [],
        position: {
          top: 0,
          right: cellWidth,
          bottom: cellHeight,
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
          right: 3 * cellWidth,
          bottom: cellHeight,
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

    const cellHeight = mobileHeight / 9;
    const cellWidth = mobileWidth;

    expect(gm.grid.cells.length).toBe(9);
    expect(gm.grid.cells).toContainEqual(
      {
        id: 'top-left',
        apps: [],
        position: {
          top: 0,
          right: cellWidth,
          bottom: cellHeight,
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
          top: cellHeight,
          right: cellWidth,
          bottom: 2 * cellHeight,
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
    const mockApp1: App = {
      id: 1,
      name: 'App1 Relative To Position mid-center',
      slug: 'app1-relative-to-position-mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
        queryParams: {} as any,
      },
      organization_id: 1,
      source: '',
      initialData: {} as any,
    }

    gm.addAppToCell('mid-center', mockApp1);
    const cell = gm.getGridCell('mid-center');

    const cellHeight = windowObject.innerHeight / 3;
    const cellWidth = windowObject.innerWidth / 3;
    
    expect(cell).toMatchObject({
      id: 'mid-center',
      apps: [mockApp1],
      position: {
        left: cellWidth,
        right: 2 * cellWidth,
        bottom: 2 * cellHeight,
        top: cellHeight,
      },
      size: {
        width: cellWidth,
        height: cellHeight,
      }
    });
  });

  it('getAppsInCell. I can get the app relative to a position', () => {
    const gm = new GridManager(settings, windowObject, addStrategy);
    const mockApp1: App = {
      id: 1,
      name: 'App1 Relative To Position mid-center',
      slug: 'app1-relative-to-position-mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
        queryParams: {} as any,
      },
      organization_id: 1,
      source: '',
      initialData: {} as any,
    }
    
    const mockApp2: App = {
      id: 2,
      name: 'App2 Relative To Position mid-center',
      slug: 'app2-relative-to-position-mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
        queryParams: {} as any,
      },
      organization_id: 1,
      source: '',
      initialData: {} as any,
    }

    gm.addAppToCell('mid-center', mockApp1);
    gm.addAppToCell('mid-center', mockApp2);
    const apps = gm.getAppsInCell('mid-center');
    
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
      slug: 'relative-to-element',
      payload_type: 'markdown',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToElement,
        size: {} as any,
        queryParams: {} as any,
      },
      organization_id: 1,
      source: '',
      initialData: {} as any,
    }
    
    const mockApp2: App = {
      id: 2,
      name: 'Relative to the same element different offsetX',
      slug: 'relative-to-the-same-element-different-offsetX',
      payload_type: 'markdown',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        queryParams: {} as any,
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
      initialData: {} as any,
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
      slug: 'app1-relative-to-position-mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
        queryParams: {} as any,
      },
      organization_id: 1,
      source: '',
      initialData: {} as any,
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
      slug: 'app1-relative-to-position-mid-center',
      payload_type: 'html',
      payload: '',
      settings: {
        css: '',
        inlineCss: {},
        position: mockPositionRelativeToPosition,
        size: {} as any,
        queryParams: {} as any,
      },
      organization_id: 1,
      source: '',
      initialData: {} as any,
    }

    gm.addAppToCell('mid-center', mockApp1);
    gm.removeApp(1);
    const cell = gm.getGridCell('mid-center');

    const cellHeight = windowObject.innerHeight / 3;
    const cellWidth = windowObject.innerWidth / 3;
    
    expect(cell).toMatchObject({
      id: 'mid-center',
      apps: [],
      position: {
        top: 1 * (cellHeight),
        right: 2 * cellWidth,
        bottom: 2 * cellHeight,
        left: 1 * cellWidth,
      },
      size: {
        width: cellWidth,
        height: cellHeight,
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
