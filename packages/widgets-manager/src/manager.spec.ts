import { setupManager } from './manager';
import { App, AppPosition, HTMLFloatType } from './types';

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
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionRelativeToElement,
    size: {} as any,
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
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionRelativeToPosition,
    size: {} as any,
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
  payload: '',
  settings: {
    css: '',
    inlineCss: {},
    position: mockPositionRelativeToPosition2,
    size: {} as any,
  },
  organization_id: 1,
  source: '',
  initialData: {} as any,
}

describe('setupManager', () => {
  let mockFetchAppData: any;

  beforeEach(() => {
    mockFetchAppData = jest.fn((appId) => {
      return new Promise((resolve) => {
        switch (appId) {
          case 1:
            resolve(mockApp1);
            break;
          case 2:
            resolve(mockApp2);
            break;
          case 3:
            resolve(mockApp3);
            break;
        
          default:
            resolve(mockApp1);
            break;
        }
      });
    });
  });
  
  describe('I can create a Manager', () => {
    it('creates and configures a Manager', () => {
      const manager = setupManager([], mockFetchAppData);
      expect(manager).toBeDefined();
    });
  });

  describe('Mounting apps', () => {
    it('I can mount apps', async () => {
      const manager = setupManager([mockApp1, mockApp2, mockApp3], mockFetchAppData);

      expect(manager.getApp(3)).toMatchObject(mockApp3);
    })

    it('I can mount app with initial data', async () => {
      const manager = setupManager([mockApp1, mockApp2, mockApp3], mockFetchAppData);
      const mockInitialData = {
        conversationId: 22,
      };
      await manager.mountApp(1, mockInitialData);

      const mountedApp = manager.getAppByName(mockApp1.slug);
      expect(mountedApp).toBeDefined();

      expect(mountedApp!.initialData).toMatchObject(mockInitialData);
    })
  });

  describe('getAllAppsForNamespace', () => {
    it('Can get all apps for a namespace', async () => {
      const manager = setupManager([mockApp1, mockApp2, mockApp3], mockFetchAppData);
      await manager.mountApp(1, {});
      await manager.mountApp(2, {});
      await manager.mountApp(3, {});
      
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
