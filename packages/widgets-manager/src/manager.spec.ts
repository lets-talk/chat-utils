import { AppManager } from './manager';
import { App, AppPosition, HTMLFloatType } from './types';
import { GridManager } from './grid';
import { ReplaceAppStrategy } from './strategies/mounting/replace';

jest.mock('./utils/firebase', () => ({
  ...jest.requireActual('./utils/firebase'),
  initializeFirebaseApp: jest.fn(() => Promise.resolve(1)),
}));

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
  slug: 'html-notification',
  payload_type: 'html',
  payload: '{}',
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
  name: 'Markdown Bci',
  slug: 'markdown-bci',
  payload_type: 'markdown',
  payload: '{}',
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

const mockApp3: App = {
  id: 3,
  name: 'Markdown BCI 2',
  slug: 'markdown-bci-2',
  payload_type: 'markdown',
  payload: '{}',
  settings: {
    css: '',
    inlineCss: {},
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
    inlineCss: {},
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
      const manager = await new AppManager([mockApp1, mockApp2, mockApp3, mockPopupApp], mockGridManager);
      expect(manager).toBeDefined();
    });
  });

  describe('Mounting apps', () => {
    it('I can mount apps', async () => {
      const manager = await new AppManager([mockApp1, mockApp2, mockApp3], mockGridManager);
      
      expect(manager.getApp(3)).toMatchObject(mockApp3);
    })

    it('I can mount app with initial data', () => {
      const manager = new AppManager([mockApp1, mockApp2, mockApp3], mockGridManager);
      const mockInitialData = {
        conversationId: 22,
      };
      manager.mountApp(1, mockInitialData);

      const mountedApp = manager.getAppByName(mockApp1.slug);
      expect(mountedApp).toBeDefined();

      expect(mountedApp!.initialData).toMatchObject(mockInitialData);
    });

    describe('When mounting apps with mode popup', () => {
      let manager: AppManager;
      const mockWindowOpen = jest.fn();
      const mockInitialData = {
        roomId: 'ABC-123',
      };
      beforeEach(() => {
        manager = new AppManager([mockPopupApp], mockGridManager);
        window.open = mockWindowOpen;
      });

      it('Mounts the app', () => {
        manager.mountApp(4, mockInitialData);

        const mountedApp = manager.getAppByName(mockPopupApp.slug);
        expect(mountedApp).toBeDefined();
      });

      it('The app receives the initialData', () => {
        manager.mountApp(4, mockInitialData);

        const mountedApp = manager.getAppByName(mockPopupApp.slug);
        expect(mountedApp!.initialData).toMatchObject(mockInitialData);
      });

      it('The app calls window.open', () => {
        manager.mountApp(4, mockInitialData);

        expect(mockWindowOpen).toBeCalled();
      });

      it('The app calls window.open with the correct params', () => {
        manager.mountApp(4, mockInitialData);

        expect(mockWindowOpen).toBeCalledWith(
          '?appName=bci-screenshare&queryParams[mode]=popup&',
          'bci-screenshare-popup',
          'width=300,height=100,scrollbars=no,resizable=no'
        );
      });
    });
  });

  describe('getAllAppsForNamespace', () => {
    it('Can get all apps for a namespace', () => {
      const manager = new AppManager([mockApp1, mockApp2, mockApp3], mockGridManager);
      manager.mountApp(1, {});
      manager.mountApp(2, {});
      manager.mountApp(3, {});
      
      // Exact match -> We find one and just one app
      const selectedApp1 = manager.getAllAppsForNamespace('lt.html-notification.relative-mockElement-LL-BT');
      expect(selectedApp1.length).toBe(1);
      expect(selectedApp1).toContainEqual(mockApp1);
  
      // Fuzzy match -> We find one and just one app -> Same as previous test
      const selectedApp = manager.getAllAppsForNamespace('lt.html-notification.relative-mockElement-*');
      expect(selectedApp.length).toBe(1);
      expect(selectedApp).toContainEqual(mockApp1);
  
      // Find all html apps not matter position -> We find 1 app
      const allHtmlApps = manager.getAllAppsForNamespace('lt.html-notification.*');
      expect(allHtmlApps.length).toBe(1);
      expect(allHtmlApps).toContainEqual(mockApp1);
      
      // Find all markdown apps not matter position -> We find 2 apps
      const allMarkdownApps = manager.getAllAppsForNamespace('lt.markdown-bci*.*');
      expect(allMarkdownApps.length).toBe(2);
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
  
      // Find all apps of letstalk -> We find 3 apps
      const allApps = manager.getAllAppsForNamespace('lt.*.*');
      expect(allApps.length).toBe(3);
      expect(allApps).toContainEqual(mockApp1);
      expect(allApps).toContainEqual(mockApp2);
      expect(allApps).toContainEqual(mockApp3);
      
  
      // We exepct no to find any app in these cases:
      const none = manager.getAllAppsForNamespace('lt.*.bottom-right');
      expect(none.length).toBe(0);
  
      const none2 = manager.getAllAppsForNamespace('lt.html-notification.bottom-right');
      expect(none2.length).toBe(0);
  
      const none3 = manager.getAllAppsForNamespace('lt.m.*');
      expect(none3.length).toBe(0);
  
      const none4 = manager.getAllAppsForNamespace('lt.*.absolute-WRONG-center');
      expect(none4.length).toBe(0);
  
      const none5 = manager.getAllAppsForNamespace('l.*.absolute-mid-center');
      expect(none5.length).toBe(0);
    });
  });

});
