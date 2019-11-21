import {
  pluginLTLinkTarget,
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

