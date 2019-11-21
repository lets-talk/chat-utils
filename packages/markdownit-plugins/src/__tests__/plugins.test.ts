import {
  pluginLTLinkTarget,
  pluginLTPublicMethod,
  pluginLTAppsSDKMethod,
  pluginLTAnalytics,
} from '../plugins';

describe('Plugins tests', () => {
  
  describe('pluginLTLinkTarget', () => {

    describe('When LT-link-target attribute is not present', () => {
      beforeEach(() => {
        mockAttrSet.mockClear();
        mockAttrPush.mockClear();
      });

      const mockHref = `http://something.com?a=1&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();
  
      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }

      it('should not set href attribute', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTLinkTarget(tokens, 1, '_parent');
    
        expect(mockAttrSet).not.toHaveBeenCalled();
      });
      
      it('should set default target', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTLinkTarget(tokens, 1, '_parent');
    
        expect(mockAttrPush).toHaveBeenCalledWith(['target', '_parent']);
      });
    });

    describe('When LT-link-target attribute is present', () => {
      describe('When processing a simple link', () => {
        const mockTarget = '_parent';
        const mockHref = `http://something.com?a=1&LT-link-target=${mockTarget}&b=2`;
        const mockAttrSet = jest.fn();
        const mockAttrPush = jest.fn();
    
        const mockToken = {
          attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
          attrSet: mockAttrSet,
          attrIndex: jest.fn((attr: string) => 1),
          attrPush: mockAttrPush,
        
          attrs: ['href', 'src'],
          content: 'Something',
          type: 'link',
        }
    
        it('should remove the LT-link-target parameter from final url', () => {
          const tokens: ObjectIndex<Token> = {
            1: mockToken
          };
      
          pluginLTLinkTarget(tokens, 1, '_default');
      
          expect(mockAttrSet).toHaveBeenCalledWith('href', 'http://something.com?a=1&b=2');
        });
    
        it('should add target attribute to the link with the correct value', () => {
          const tokens: ObjectIndex<Token> = {
            1: mockToken
          };
      
          pluginLTLinkTarget(tokens, 1, '_default');
      
          expect(mockAttrPush).toHaveBeenCalledWith(['target', mockTarget]);
        });
      });
  
      describe('When processing a linkify link', () => {
        const mockTarget = '_parent';
        const mockHref = `http://something.com?a=1&LT-link-target=${mockTarget}&b=2`;
        const mockAttrSet = jest.fn();
        const mockAttrPush = jest.fn();
    
        const mockToken = {
          attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
          attrSet: mockAttrSet,
          attrIndex: jest.fn((attr: string) => 1),
          attrPush: mockAttrPush,
        
          attrs: ['href', 'src'],
          content: 'Something',
          type: 'link',
        }
  
        const mockNextToken = {
          attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
          attrSet: mockAttrSet,
          attrIndex: jest.fn((attr: string) => 2),
          attrPush: mockAttrPush,
        
          attrs: ['content'],
          content: mockHref,
          type: 'text',
        }
        
      it('should remove the LT-link-target parameter from final text token', () => {
          const tokens: ObjectIndex<Token> = {
            1: mockToken,
            2: mockNextToken,
          };
      
          const newTokens = pluginLTLinkTarget(tokens, 1, '_default');
      
          expect(newTokens[2].content).toBe('http://something.com?a=1&b=2');
        });
      });
    });

  });

  describe('pluginLTPublicMethod', () => {
    describe('When LT-public-method attribute is not present', () => {
      beforeEach(() => {
        mockAttrSet.mockClear();
        mockAttrPush.mockClear();
      });

      const mockHref = `http://something.com?a=1&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();
  
      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }

      it('should do nothing', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTPublicMethod(tokens, 1);
    
        expect(mockAttrSet).not.toHaveBeenCalled();
        expect(mockAttrPush).not.toHaveBeenCalled();
      });
    });

    describe('When LT-public-method attribute is present', () => {
      beforeEach(() => {
        mockAttrSet.mockClear();
        mockAttrPush.mockClear();
      });
      
      const mockMethodCallAndArgsEncoded = 'eyJtZXRob2QiOiJzdGFydENvbnZlcnNhdGlvbiIsImFyZ3MiOlt7ImlucXVpcnlJZCI6MjM2OX1dfQ==';
      const mockHref = `http://something.com?a=1&LT-public-method=${mockMethodCallAndArgsEncoded}&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();
  
      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }
  
      it('should set the href attribute to #', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTPublicMethod(tokens, 1);
    
        expect(mockAttrSet).toHaveBeenNthCalledWith(1, 'href', '#');
      });
      
      it('should set the onclick attribute', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTPublicMethod(tokens, 1);
  
        const expectedOnclick = `javascript:window.$LTSDK.callPublicMethod64('${mockMethodCallAndArgsEncoded}');window.LTAnalytics.event('MessageInteraction', 'click', '${mockHref}')`;
    
        expect(mockAttrSet).toHaveBeenNthCalledWith(2, 'onclick', expectedOnclick);
      });
    });
  });

  describe('pluginLTAppsSDKMethod', () => {
    describe('When LT-apps-sdk-method is not present', () => {
      const mockHref = `http://something.com?a=1&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();
  
      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }

      it('should do nothing', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTAppsSDKMethod(tokens, 1);
    
        expect(mockAttrSet).not.toHaveBeenCalled();
        expect(mockAttrPush).not.toHaveBeenCalled();
      });
    });

    describe('When LT-apps-sdk-method is present', () => {
      beforeEach(() => {
        mockAttrSet.mockClear();
        mockAttrPush.mockClear();
      });
      
      const mockMethodCallAndArgsEncoded = 'eyJhcHBOYW1lIjoibHQud2VicnRjLXZpZGVvLWNvbmZlcmVuY2UuKiIsIm1ldGhvZCI6Im9wZW5BcHAiLCJhcmdzIjpbXX0=';
      const mockHref = `http://something.com?a=1&LT-apps-sdk-method=${mockMethodCallAndArgsEncoded}&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();
  
      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }
  
      it('should set the href attribute to #', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTAppsSDKMethod(tokens, 1);
    
        expect(mockAttrSet).toHaveBeenNthCalledWith(1, 'href', '#');
      });
      
      it('should set the onclick attribute', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTAppsSDKMethod(tokens, 1);
  
        const expectedOnclick = `javascript:window.$AppsSDK.executeSDKEvent64('${mockMethodCallAndArgsEncoded}');window.LTAnalytics.event('MessageInteraction', 'click', '${mockHref}')`;
    
        expect(mockAttrSet).toHaveBeenNthCalledWith(2, 'onclick', expectedOnclick);
      });
    });

  });

  describe('pluginLTAnalytics', () => {
    describe('When there is an LT-apps-skd-method attribute', () => {
      const mockMethodCallAndArgsEncoded = 'eyJhcHBOYW1lIjoibHQud2VicnRjLXZpZGVvLWNvbmZlcmVuY2UuKiIsIm1ldGhvZCI6Im9wZW5BcHAiLCJhcmdzIjpbXX0=';
      const mockHref = `http://something.com?a=1&LT-apps-sdk-method=${mockMethodCallAndArgsEncoded}&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();

      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }

      it('should do nothing', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTAnalytics(tokens, 1);
    
        expect(mockAttrPush).not.toHaveBeenCalled();
      });
    });

    describe('When there is an LT-public-method attribute', () => {
      const mockMethodCallAndArgsEncoded = 'eyJhcHBOYW1lIjoibHQud2VicnRjLXZpZGVvLWNvbmZlcmVuY2UuKiIsIm1ldGhvZCI6Im9wZW5BcHAiLCJhcmdzIjpbXX0=';
      const mockHref = `http://something.com?a=1&LT-public-method=${mockMethodCallAndArgsEncoded}&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();

      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }

      it('should do nothing', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTAnalytics(tokens, 1);
    
        expect(mockAttrPush).not.toHaveBeenCalled();
      });
    });
    
    describe('When there is a normal link', () => {
      const mockHref = `http://something.com?a=1&b=2`;
      const mockAttrSet = jest.fn();
      const mockAttrPush = jest.fn();

      const mockToken = {
        attrGet: jest.fn((attr: string) => attr === 'href' ? mockHref : ''),
        attrSet: mockAttrSet,
        attrIndex: jest.fn((attr: string) => 1),
        attrPush: mockAttrPush,
      
        attrs: ['href', 'src'],
        content: 'Something',
        type: 'link',
      }

      it('should add onclick event to track analytics', () => {
        const tokens: ObjectIndex<Token> = {
          1: mockToken
        };
    
        pluginLTAnalytics(tokens, 1);
        
        const expectedOnclick = `javascript:window.LTAnalytics.event('MessageInteraction', 'click', '${mockHref}')`;
  
        expect(mockAttrPush).toHaveBeenCalledWith(['onclick', expectedOnclick]);
      });
    });
  });
});
