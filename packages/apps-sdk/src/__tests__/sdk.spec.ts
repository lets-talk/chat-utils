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
  });
  it('Should create a SDK instance without crashing', () => {
    const sdk = new SDK();
    
    expect(sdk).not.toBeFalsy();
  });

  it('openApp should call mockChannel.send with correct params', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appName: 'letstalk.banner-bci.top-left' };
    
    const result = sdk.openApp('letstalk.banner-bci.top-left');
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

  it('getAppSetttings should call mockChannel.send with correct params', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appName: 'my-mock-app' };

    const result = sdk.getAppSettings();
    expect(result).resolves.toBe('OK');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_GET_APP_SETTINGS, expectedSentPayload);
  });

  it('openApp method really resolves to a value', async () => {
    expect.assertions(1);

    const sdk = new SDK(() => mockChannel);
    const result = await sdk.openApp('letstalk.banner.top-left');
    
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
