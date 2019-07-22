declare var global: any;

import { SDK } from '../sdk';

import {
  EVENT_TYPE_GET_APP_SETTINGS,
  EVENT_TYPE_LOAD_APP,
  EVENT_TYPE_REMOVE_APP,
  EVENT_TYPE_NOTIFY_APP_EVENT,
} from '../constants';

const mockedSend = jest.fn(() => new Promise((resolve) => resolve('OK')));
const mockedOn = jest.fn();

const mockChannel = {
  client: jest.fn(() => ({
    send: mockedSend,
  })),
  listener: jest.fn(() => ({
    on: mockedOn,
  })),
};

describe('SDK', () => {
  beforeEach(() => {
    mockedSend.mockClear();

    global.jsdom.reconfigure({
      url: "http://localhost/someapphosted?appName=my-mock-app"
    });
  });

  it('Should create an SDK instance without crashing', () => {
    const sdk = new SDK();
    
    expect(sdk).not.toBeFalsy();
  });

  describe('When there are url params', () => {
    let mockCommunicationChannel: any;
    const mockSettingsData = {
      data: {
        initialData: {
          payload: {
            roomId: 'ABC-123'
          }
        }
      }
    };

    describe('When mode is popup', () => {
      const mockWindowOpener = jest.fn();
      beforeEach(() => {
        const url = "https://www.example.com?appName=myApp&queryParams[mode]=popup&initialData[controls][close]=true";

        // Mock window.opener
        Object.defineProperty(window, "opener", {
          value: mockWindowOpener,
          writable: true
        });
        // Mock url
        global.jsdom.reconfigure({
          url,
        });

        mockCommunicationChannel = {
          client: jest.fn(() => ({
            send: jest.fn(() => new Promise((resolve) => resolve(mockSettingsData))),
          })),
          listener: jest.fn(() => ({
            on: mockedOn,
          })),
        };
      });

      it('Should grab the params and setup window using window.opener', () => {
        new SDK(() => mockCommunicationChannel);
        expect(mockCommunicationChannel.client).toBeCalledWith({ window: mockWindowOpener, domain: '*' });
      });

      it('getAppSettings should return the result plus url params', async () => {
        const sdk = new SDK(() => mockCommunicationChannel);
    
        const result = await sdk.getAppSettings();
        expect(result).toEqual({
          data: {
            initialData: {
              payload: {
                controls: { close: true }, 
                roomId: "ABC-123"
              }
            }
          }
        });
      });
    });
   
    describe('When mode is not present', () => {
      const mockWindowParent = jest.fn();
      beforeEach(() => {
        const url = "http://myappurl.com?appName=myApp&initialData[controls][close]=true";

        // Mock window.parent
        Object.defineProperty(window, "parent", {
          value: mockWindowParent,
          writable: true
        });
        // Mock url
        global.jsdom.reconfigure({
          url,
        });
        
        it('Should grab the params and setup window using window.parent', () => {
          new SDK(() => mockCommunicationChannel);
          expect(mockCommunicationChannel.client).toBeCalledWith({ window: mockWindowParent, domain: '*' });
        });
      });
    });
  });

  it('openApp should call mockChannel.send with correct params', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appName: 'letstalk.banner-bci.top-left', initialData: {} };
    
    const result = sdk.openApp('letstalk.banner-bci.top-left', {});
    expect(result).resolves.toBe('OK');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_LOAD_APP, expectedSentPayload);
  });
  
  it('closeApp should call mockChannel.send with correct params', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appName: 'lt.my-mock-app.*' };

    const result = sdk.closeApp();
    expect(result).resolves.toBe('OK');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_REMOVE_APP, expectedSentPayload);
  });

  it('getAppSettings should call mockChannel.send with correct params', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appName: 'my-mock-app' };

    const result = sdk.getAppSettings();
    expect(result).resolves.toBe('OK');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_GET_APP_SETTINGS, expectedSentPayload);
  });

  it('openApp method really resolves to a value', async () => {
    expect.assertions(1);

    const sdk = new SDK(() => mockChannel);
    const result = await sdk.openApp('letstalk.banner.top-left', {});
    
    expect(result).toBe('OK');
  });
  
  it('notify method send the correct message', () => {
    const sdk = new SDK(() => mockChannel);
    const mockData = [ {key: 'key1', value: 'value1'} ];

    sdk.notify('myCustomEvent', mockData);
    
    const expectedSentPayload = {
      appName: "my-mock-app",
      payload: {
        data: [{ key: "key1", "value": "value1"}], 
        eventName: "myCustomEvent"
      }
    };

    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_NOTIFY_APP_EVENT, expectedSentPayload);
  });
});
