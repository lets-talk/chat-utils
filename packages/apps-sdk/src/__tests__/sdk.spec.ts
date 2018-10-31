import { SDK } from '../sdk';

import {
  EVENT_TYPE_EXECUTE_APP_METHOD,
  EVENT_TYPE_GET_APP_SETTINGS,
  EVENT_TYPE_LOAD_APP,
  EVENT_TYPE_REMOVE_APP,
} from '../constants';

const mockedSend = jest.fn(() => new Promise((resolve) => resolve('OK')));
const mockChannel = {
  client: jest.fn(() => ({
    send: mockedSend,
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

  it('Should call the openApp method', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appNamespace: 'letstalk.banner.top-left' };
    
    const result = sdk.openApp('letstalk.banner.top-left');
    expect(result).resolves.toBe('lemon');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_LOAD_APP, expectedSentPayload);
  });
  
  it('Should call the closeApp method', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appNamespace: 'letstalk.banner.top-left' };

    const result = sdk.closeApp('letstalk.banner.top-left');
    expect(result).resolves.toBe('lemon');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_REMOVE_APP, expectedSentPayload);
  });

  it('Should call the getAppSetttings method', () => {
    const sdk = new SDK(() => mockChannel);
    const expectedSentPayload = { appNamespace: 'letstalk.banner.top-left' };

    const result = sdk.getAppSettings('letstalk.banner.top-left');
    expect(result).resolves.toBe('lemon');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_GET_APP_SETTINGS, expectedSentPayload);
  });
  
  it('Should call the openApp method', () => {
    const sdk = new SDK(() => mockChannel);
    const params = [
      { vipUser: true },
      true,
    ];

    const expectedSentPayload = {
      appNamespace: 'letstalk.banner.top-left',
      payload: {
        method: 'addChatMetaData',
        args: params,
      }
    }

    const result = sdk.executeAppMethod('letstalk.banner.top-left', 'addChatMetaData', params);
    expect(result).resolves.toBe('lemon');
    expect(mockedSend).toHaveBeenCalledWith(EVENT_TYPE_EXECUTE_APP_METHOD, expectedSentPayload);
  });
  it('openApp method really resolves to a value', async () => {
    expect.assertions(1);

    const sdk = new SDK(() => mockChannel);
    const result = await sdk.openApp('letstalk.banner.top-left');
    
    expect(result).toBe('OK');
  });
});
