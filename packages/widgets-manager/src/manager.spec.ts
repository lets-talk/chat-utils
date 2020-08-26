/* tslint:disable */
import { AppManager } from './manager';
import { App, AppPosition, HTMLFloatType } from './types';
import { GridManager } from './grid';
import { ReplaceAppStrategy } from './strategies/mounting/replace';

jest.mock('./utils/firebase', () => {
  const realPackage = jest.requireActual('./utils/firebase')
  return ({
  ...realPackage,
  initializeFirebaseApp: jest.fn(() => Promise.resolve(1)),
  })
});

const mockSelectCurrentlyMountedApps = jest.fn();

jest.mock('./selectors/apps', () => {
  const realPackage = jest.requireActual('./utils/firebase')
   return ({
  ...realPackage,
  selectCurrentlyMountedApps: mockSelectCurrentlyMountedApps,
  })
});

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

const mockPositionRelativeToElement2: AppPosition = {
  type: 'relative-to-element',
  payload: {
    floatType: HTMLFloatType.fixed,
    relativeId: 'mockElement',
    offsetX: {
      relationType: 'RR',
      value: 0,
    },
    offsetY: {
      relationType: 'BT',
      value: 0,
    }
  }
};

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

const mockPositionRelativeToPosition2: AppPosition = {
  type: 'relative-to-position',
  payload: {
    positionId: 'bottom-left',
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

const mockApp1: App = {
  id: 1,
  name: 'HTML Notification',
  slug: 'App1',
  payload_type: 'html',
  payload: '{}',
  settings: {
    css: '',
    inlineCss: {
      default: {},
    },
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
  name: 'Markdown Bci',
  slug: 'App2',
  payload_type: 'markdown',
  payload: '{}',
  settings: {
    css: '',
    inlineCss: {
      default: {},
    },
    position: mockPositionRelativeToPosition,
    size: {} as any,
    queryParams: {} as any,
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
}

const mockApp3: App = {
  id: 3,
  name: 'Markdown BCI 2',
  slug: 'App3',
  payload_type: 'markdown',
  payload: '{}',
  settings: {
    css: '',
    inlineCss: {
      default: {},
    },
    position: mockPositionRelativeToPosition2,
    size: {} as any,
    queryParams: {} as any,
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
}

const mockPopupApp: App = {
  id: 4,
  name: 'Webrtc screenshare',
  slug: 'bci-screenshare',
  payload_type: 'lt-webrtc',
  payload: '{}',
  settings: {
    css: '',
    inlineCss: {
      default: {},
    },
    position: mockPositionRelativeToElement2,
    size: {
      width: '300px',
      height: '100px',
    },
    queryParams: {
      mode: 'popup'
    },
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
}

const mockApps = [mockApp1, mockApp2, mockApp3, mockPopupApp];
const mockMountedApps = [mockApp1, mockApp3];

jest.mock('./selectors/apps', () => {
  const realPackage = jest.requireActual('./selectors/apps')
  return ({
  ...realPackage,
  selectApps: jest.fn(() => mockApps),
  selectCurrentlyMountedApps: jest.fn(() => mockMountedApps),
  })
});

describe('AppManager', () => {
  let mockGridManager: GridManager;

  beforeEach(() => {
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
    mockGridManager = new GridManager(settings, window, replaceAppStrategy);
  });

  describe('I can create a Manager', () => {
    it('creates and configures a Manager', async () => {
      const manager = await new AppManager(mockGridManager);
      expect(manager).toBeDefined();
    });
  });

  describe('Mounting apps', () => {
    it('I can mount apps', async () => {
      const manager = await new AppManager(mockGridManager);

      expect(manager.getAppByName('App3')).toMatchObject(mockApp3);
    })

    it('I can mount app with initial data', () => {
      const manager = new AppManager(mockGridManager);
      manager.mountApp('App1');

      const mountedApp = manager.getAppByName('App1');
      expect(mountedApp).toBeDefined();

      expect(mountedApp).toMatchObject(mockApp1);
    });

    describe('When mounting apps with mode popup', () => {
      let manager: AppManager;
      const mockWindowOpen = jest.fn();
      beforeEach(() => {
        manager = new AppManager(mockGridManager);
        window.open = mockWindowOpen;
      });

      it('Mounts the app', () => {
        manager.mountApp('bci-screenshare');

        const mountedApp = manager.getAppByName(mockPopupApp.slug);
        expect(mountedApp).toBeDefined();
      });

      it('The app receives the initialData', () => {
        manager.mountApp('bci-screenshare');

        const mountedApp = manager.getAppByName('bci-screenshare');
        expect(mountedApp).toMatchObject(mockPopupApp);
      });

      it('The app calls window.open', () => {
        manager.mountApp('bci-screenshare');

        expect(mockWindowOpen).toBeCalled();
      });

      it('The app calls window.open with the correct params', () => {
        manager.mountApp('bci-screenshare');

        expect(mockWindowOpen).toBeCalledWith(
          '?appName=bci-screenshare&queryParams[mode]=popup',
          'bci-screenshare-popup',
          'width=300,height=100,scrollbars=no,resizable=no'
        );
      });
    });
  });

  describe('getAllAppsForNamespace', () => {
    it('Can get all apps for a namespace', () => {
      const manager = new AppManager(mockGridManager);
      manager.mountApp('App1');
      manager.mountApp('App2');
      manager.mountApp('App3');

      // Exact match -> We find one and just one app
      const selectedApp1 = manager.getAllAppsForNamespace('lt.App1.relative-mockElement-LL-BT');
      expect(selectedApp1.length).toBe(1);
      expect(selectedApp1).toContainEqual(mockApp1);

      // Fuzzy match -> We find one and just one app -> Same as previous test
      const selectedApp = manager.getAllAppsForNamespace('lt.App1.relative-mockElement-*');
      expect(selectedApp.length).toBe(1);
      expect(selectedApp).toContainEqual(mockApp1);

      // Find all html apps not matter position -> We find 1 app
      const allHtmlApps = manager.getAllAppsForNamespace('lt.App1.*');
      expect(allHtmlApps.length).toBe(1);
      expect(allHtmlApps).toContainEqual(mockApp1);

      // Find all markdown apps not matter position -> We find 3 apps
      const allMarkdownApps = manager.getAllAppsForNamespace('lt.App*.*');
      expect(allMarkdownApps.length).toBe(3);
      expect(allMarkdownApps).toContainEqual(mockApp1);
      expect(allMarkdownApps).toContainEqual(mockApp2);
      expect(allMarkdownApps).toContainEqual(mockApp3);

      // Find all apps in position -> We find 1 app -> The correct app
      const markdownAppOnMidCenter = manager.getAllAppsForNamespace('lt.*.absolute-mid-center');
      expect(markdownAppOnMidCenter.length).toBe(1);
      expect(markdownAppOnMidCenter).toContainEqual(mockApp2);

      // Find all apps in position -> We find 1 app -> The correct app
      const markdownAppOnBottomRight = manager.getAllAppsForNamespace('lt.*.absolute-bottom-left');
      expect(markdownAppOnBottomRight.length).toBe(1);
      expect(markdownAppOnBottomRight).toContainEqual(mockApp3);

      // Find all apps of letstalk -> We find 4 apps
      const allApps = manager.getAllAppsForNamespace('lt.*.*');
      expect(allApps.length).toBe(4);
      expect(allApps).toContainEqual(mockApp1);
      expect(allApps).toContainEqual(mockApp2);
      expect(allApps).toContainEqual(mockApp3);


      // We exepct no to find any app in these cases:
      const none = manager.getAllAppsForNamespace('lt.*.bottom-right');
      expect(none.length).toBe(0);

      const none2 = manager.getAllAppsForNamespace('lt.App1.bottom-right');
      expect(none2.length).toBe(0);

      const none3 = manager.getAllAppsForNamespace('lt.m.*');
      expect(none3.length).toBe(0);

      const none4 = manager.getAllAppsForNamespace('lt.*.absolute-WRONG-center');
      expect(none4.length).toBe(0);

      const none5 = manager.getAllAppsForNamespace('l.*.absolute-mid-center');
      expect(none5.length).toBe(0);
    });
  });

  describe('getMountedApps', () => {
    it('Correctly get the number of apps', () => {
      const manager = new AppManager(mockGridManager);

      const mountedApps = manager.getMountedApps();
      expect(mountedApps.length).toBe(2);
    });

    it('Correctly get all apps', () => {
      const manager = new AppManager(mockGridManager);

      const mountedApps = manager.getMountedApps();
      expect(mountedApps).toContainEqual(mockApp1);
      expect(mountedApps).not.toContainEqual(mockApp2);
      expect(mountedApps).toContainEqual(mockApp3);
      expect(mountedApps).not.toContainEqual(mockPopupApp);
    });
  });
});
