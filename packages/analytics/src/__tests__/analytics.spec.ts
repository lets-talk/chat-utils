import { LTAnalytics } from '../analytics';
import { ILTAnalyticsOptions } from 'lt-analytics';

// Mock our dependency
const mockEventFn = jest.fn();
const mockScreenViewFn = jest.fn();
const mockSetFn = jest.fn();
const mockNameFn = jest.fn((_trackerName: string) => ({
  set: mockSetFn,
  event: mockEventFn,
  screenview: mockScreenViewFn
}));

jest.mock('universal-ga', () => ({
  create: jest.fn(),
  event: jest.fn(() => mockEventFn),
  initialize: jest.fn(),
  name: jest.fn((arg) => mockNameFn(arg)),
}));
import * as analytics from 'universal-ga';
// Mock our dependency

// Mock our configuration data
const mockConfiguration: ILTAnalyticsOptions = {
  provider: 'Google',
  trackers: ['UA-2345678-1', 'UA-2345678-2'],
  events: {
    'UA-2345678-1': {
      Inquiry: {
        enabled: true,
      },
      Session: {
        enabled: false,
      },
      Attachment: {
        enabled: false,
      },
      ChatLink: {
        enabled: true,
      },
    },
    'UA-2345678-2': {
      Inquiry: {
        enabled: false,
      },
      Session: {
        enabled: true,
      },
      Attachment: {
        enabled: false,
      },
      ChatLink: {
        enabled: true,
      },
    }
  },
  screenViews: {
    'UA-2345678-1': {
      Login: {
        enabled: true,
      },
      Inquiry: {
        enabled: false,
      },
      Conversation: {
        enabled: true,
      },
    },
    'UA-2345678-2': {
      Login: {
        enabled: false,
      },
      Inquiry: {
        enabled: false,
      },
      Conversation: {
        enabled: true,
      },
    },
  },
}

describe('LT Analytics Module', () => {
	let mockAppName = 'myMockApp';
  beforeEach(() => {
    mockEventFn.mockClear();
    mockNameFn.mockClear();
    mockScreenViewFn.mockClear();
    mockSetFn.mockClear();
  });

  describe('Constructor()', () => {

    describe('When proper configuration is provided', () => {
      it('Creates Analytics instance without crashing', () => {
        const instance = new LTAnalytics(mockAppName, mockConfiguration);

				expect(instance).not.toBeFalsy();
				expect(mockSetFn).toBeCalledWith('appName', mockAppName);
      });

      it('It creates a tracker for all defined tracking IDs', () => {
        const instance = new LTAnalytics(mockAppName, mockConfiguration);

        expect(instance).not.toBeFalsy();

        // expect(analytics.initialize).toBeCalledWith(mockConfiguration.systemTrackingID, expect.any(Object));
        // Expect to create all trackers
        expect(analytics.create).toBeCalledWith('UA-2345678-1', 'GoogleUA23456781');
        expect(analytics.create).toBeCalledWith('UA-2345678-2', 'GoogleUA23456782');
      });
    });

    describe('When invalid configuration is provided', () => {
      it('It throws an error about miss configuration', () => {
        let instance;
        expect(() => {
          instance = new LTAnalytics(mockAppName, { ...mockConfiguration, trackers: [] });
        }).toThrow();

        expect(instance).toBeFalsy();
      });
    });
  });

  describe('event()', () => {
    const instance = new LTAnalytics(mockAppName, mockConfiguration);
    describe('When the event Category is enabled for some trackers', () => {
      it('Should track the event in the corresponding tracker', () => {
        instance.event('Inquiry', 'BROWSE', 'My Inquiry', 1);
        // Only one tracker has 'Inquiry' events enabled
        expect(mockNameFn).toBeCalledTimes(1);
        expect(mockNameFn).toBeCalledWith('GoogleUA23456781');
        expect(mockEventFn).toBeCalledWith('Inquiry', 'BROWSE', { eventLabel: 'My Inquiry', eventValue: 1 });
      });
    });

    describe('When the event Category is enabled for all trackers', () => {
      it('Should track the event for all trackers', () => {
        instance.event('ChatLink', 'Link Name', 'www.google.com');
        // All trackers has 'ChatLink' events enabled
        expect(mockNameFn).toBeCalledTimes(2);
        expect(mockNameFn).toBeCalledWith('GoogleUA23456781');
        expect(mockNameFn).toBeCalledWith('GoogleUA23456782');
        expect(mockEventFn).toBeCalledWith('ChatLink', 'Link Name', { eventLabel: 'www.google.com', eventValue: undefined });
      });
    });

    describe('When the event Category is disabled for tracking', () => {
      it('Should NOT track the event', () => {
        instance.event('Attachment', 'Added', 'MyFile');
        // No tracker has 'Attachment' events enabled
        expect(mockNameFn).not.toHaveBeenCalled();
        expect(mockEventFn).not.toHaveBeenCalled();
      });
    });

    describe('When the event Category is not configured', () => {
      it('Should NOT track the event', () => {
        instance.event('Screenshot', 'Added', 'MyFile');
        // No tracker has 'Screenshot' events enabled
        expect(mockNameFn).not.toHaveBeenCalled();
        expect(mockEventFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('screenview()', () => {
    const instance = new LTAnalytics(mockAppName, mockConfiguration);
    describe('When the screenView name is enabled for some trackers', () => {
      it('Should track the event in the corresponding tracker', () => {
        instance.screenview('Login', {});
        // Only one tracker has 'Inquiry' events enabled
        expect(mockScreenViewFn).toBeCalledTimes(1);
        expect(mockNameFn).toBeCalledWith('GoogleUA23456781');
        expect(mockScreenViewFn).toBeCalledWith('Login', {});
      });
    });

    describe('When the screenView name is enabled for all trackers', () => {
      it('Should track the screenView for all trackers', () => {
        instance.screenview('Conversation', {});
        // Only one tracker has 'Inquiry' events enabled
        expect(mockScreenViewFn).toBeCalledTimes(2);
        expect(mockNameFn).toBeCalledWith('GoogleUA23456781');
        expect(mockNameFn).toBeCalledWith('GoogleUA23456782');
        expect(mockScreenViewFn).toBeCalledWith('Conversation', {});
      });
    });

    describe('When the screenView name is disabled for tracking', () => {
      it('Should NOT track the screenview', () => {
        instance.screenview('Inquiry', {});
        // No tracker has 'Attachment' events enabled
        expect(mockNameFn).not.toHaveBeenCalled();
        expect(mockEventFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('set()', () => {
    const instance = new LTAnalytics(mockAppName, mockConfiguration);

    describe('When correctlty called', () => {
      it('Should set property we pass to it', () => {
        instance.set('UserId', 'Client-123');
        // Only one tracker has 'Inquiry' events enabled
        expect(mockNameFn).toBeCalledTimes(2);
        expect(mockNameFn).toBeCalledWith('GoogleUA23456781');
        expect(mockNameFn).toBeCalledWith('GoogleUA23456782');
        expect(mockSetFn).toBeCalledWith('UserId', 'Client-123');
      });
    });
  });
});
