import { SDK } from '../sdk';

describe('SDK', () => {
  it('Should create a SDK instance without crashing', () => {
    const sdk = new SDK();
    
    expect(sdk).not.toBeFalsy();
  });

  it('Should call the openApp method', () => {
    const sdk = new SDK();
    
    const result = sdk.openApp('letstalk.banner.top-left');
    expect(result).toBeInstanceOf(Promise);
  });
  
  it('Should call the closeApp method', () => {
    const sdk = new SDK();
    
    const result = sdk.closeApp('letstalk.banner.top-left');
    expect(result).toBeInstanceOf(Promise);
  });
  
  it('Should call the openApp method', () => {
    const sdk = new SDK();
    const params = [
      { vipUser: true },
      true,
    ]
    const result = sdk.executeAppMethod('letstalk.banner.top-left', 'addChatMetaData', params);
    expect(result).toBeInstanceOf(Promise);
  });
});
