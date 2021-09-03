import * as helpers from '../helpers';
import { getWidgetsShapeToUpdate } from '../helpers';
import { WidgetReference } from '../../types';

const generateSortedListOfWidgetsSpy: any = jest.spyOn(
  helpers,
  'generateSortedListOfWidgets'
);
const isValidatePositionReferenceSpy: any = jest.spyOn(
  helpers,
  'isValidatePositionReference'
);
const validateIframeWidgetWithPropsSpy: any = jest.spyOn(
  helpers,
  'validateIframeWidgetWithProps'
);
const mapWidgetToRenderPropsSpy: any = jest.spyOn(
  helpers,
  'mapWidgetToRenderProps'
);

const validateIframeWidgetMock = jest.fn((...args) => ({
  blank: [],
  addons: [],
  list: [...args[0], { ...args[2] }],
  position: args[2].position,
  requireFullSize: args[2].dimensions.fullSize,
  isPristine: false
}));

describe('actions/helpers module', () => {
  beforeEach(() => {
    mapWidgetToRenderPropsSpy.mockClear();
    validateIframeWidgetWithPropsSpy.mockClear();
    generateSortedListOfWidgetsSpy.mockClear();
    isValidatePositionReferenceSpy.mockClear();
  });
  describe('generateSortedListOfWidgets fn', () => {
    it('should be called with the correct arguments', () => {
      const widgets = [
        {
          kind: 'div'
        }
      ];
      const rules = {
        label: 'web',
        columns: 3,
        rows: 3,
        positions: []
      };
      const breakpoint = 'web';

      generateSortedListOfWidgetsSpy(widgets, rules, breakpoint);
      expect(helpers.generateSortedListOfWidgets).toBeCalledWith(
        widgets,
        rules,
        breakpoint
      );
    });

    it('should return an acc where widgets length is equal to the acc sum', () => {
      const widgets = [
        {
          kind: 'blank',
          dimensions: { web: true }
        }
      ];
      const rules = {
        label: 'web',
        columns: 3,
        rows: 3,
        positions: []
      };
      const breakpoint = 'web';

      mapWidgetToRenderPropsSpy.mockImplementationOnce((...args) => args[0]);

      const result = generateSortedListOfWidgetsSpy(widgets, rules, breakpoint);
      expect(result.blank.length + result.iframe.length).toBe(1);
      expect(result).toStrictEqual({
        blank: [
          {
            kind: 'blank',
            dimensions: { web: true }
          }
        ],
        iframe: [],
        addons: [],
        usedPositions: [],
        requireFullSize: false,
        isPristine: false
      });
    });

    it('should handle a case of kind blank and maintain the global acc', () => {
      const widgets = [
        {
          id: 1,
          kind: 'blank',
          dimensions: { web: true }
        },
        {
          id: 2,
          kind: 'blank',
          dimensions: { web: true }
        }
      ];
      const rules = {
        label: 'web',
        columns: 3,
        rows: 3,
        positions: []
      };
      const breakpoint = 'web';

      mapWidgetToRenderPropsSpy.mockImplementation((...args) => args[0]);

      const result = generateSortedListOfWidgetsSpy(widgets, rules, breakpoint);
      expect(result).toStrictEqual({
        blank: [
          {
            id: 1,
            kind: 'blank',
            dimensions: { web: true }
          },
          {
            id: 2,
            kind: 'blank',
            dimensions: { web: true }
          }
        ],
        iframe: [],
        addons: [],
        usedPositions: [],
        requireFullSize: false,
        isPristine: false
      });
    });

    it('should only handle a blank kind if it had a web breakpoint', () => {
      const widgets = [
        {
          id: 1,
          kind: 'blank',
          dimensions: { web: false }
        },
        {
          id: 2,
          kind: 'blank',
          dimensions: { web: true }
        }
      ];
      const rules = {
        label: 'web',
        columns: 3,
        rows: 3,
        positions: []
      };
      const breakpoint = 'web';

      mapWidgetToRenderPropsSpy.mockImplementation((...args) => args[0]);

      const result = generateSortedListOfWidgetsSpy(widgets, rules, breakpoint);
      expect(result.blank).toStrictEqual([
        {
          id: 2,
          kind: 'blank',
          dimensions: { web: true }
        }
      ]);
    });

    it('should handle a case of kind iframe and maintain the global acc', () => {
      const widgets = [
        {
          id: 1,
          kind: 'iframe',
          dimensions: { web: true }
        },
        {
          id: 2,
          kind: 'iframe',
          dimensions: { web: true }
        }
      ];
      const rules = {
        label: 'web',
        columns: 3,
        rows: 3,
        positions: []
      };
      const breakpoint = 'web';

      validateIframeWidgetWithPropsSpy
        .mockImplementationOnce(validateIframeWidgetMock)
        .mockImplementationOnce(validateIframeWidgetMock);

      const result = generateSortedListOfWidgetsSpy(widgets, rules, breakpoint);
      expect(result).toStrictEqual({
        blank: [],
        iframe: [
          { id: 1, kind: 'iframe', dimensions: { web: true } },
          { id: 2, kind: 'iframe', dimensions: { web: true } }
        ],
        addons: [],
        usedPositions: [],
        requireFullSize: false,
        isPristine: false
      });
    });

    it('should handle requireFullSize and merge the used positions', () => {
      const widgets = [
        {
          id: 1,
          kind: 'iframe',
          dimensions: { web: true, fullSize: true },
          position: 'middle'
        },
        {
          id: 2,
          kind: 'iframe',
          dimensions: { web: true, fullSize: false },
          position: 'top'
        }
      ];
      const rules = {
        label: 'web',
        columns: 3,
        rows: 3,
        positions: []
      };
      const breakpoint = 'web';

      validateIframeWidgetWithPropsSpy
        .mockImplementationOnce(validateIframeWidgetMock)
        .mockImplementationOnce(validateIframeWidgetMock);

      const result = generateSortedListOfWidgetsSpy(widgets, rules, breakpoint);
      expect(result.requireFullSize).toBeTruthy();
      expect(result.usedPositions).toStrictEqual(['middle', 'top']);
    });
    it.skip('should handle a case of kind div', () => {});
  });

  describe('isValidatePositionReference fn', () => {
    it('should be called with the correct arguments', () => {
      const relation = 'relative-to-center';
      const validPositions = [];
      const positionsInUse = [];
      const widgetReference = '';

      isValidatePositionReferenceSpy(
        relation,
        validPositions,
        positionsInUse,
        widgetReference
      );
      expect(helpers.isValidatePositionReference).toBeCalledWith(
        relation,
        validPositions,
        positionsInUse,
        widgetReference
      );
    });

    it('should throw and error if relation is not valid', () => {
      const relation = undefined;
      const validPositions = [];
      const positionsInUse = [];
      const widgetReference = '';

      try {
        isValidatePositionReferenceSpy(
          relation,
          validPositions,
          positionsInUse,
          widgetReference
        );
      } catch (e) {
        expect(e.message).toBe(
          'Invalid position type configuration review app settings'
        );
        expect(isValidatePositionReferenceSpy).toThrowError();
      }
    });

    it('should return false if case is not handle yet', () => {
      const relation = ['relative-to-dom-element', 'relative-to-center'];
      const validPositions = [];
      const positionsInUse = [];
      const widgetReference = '';

      const result = relation.map((v) =>
        isValidatePositionReferenceSpy(
          v,
          validPositions,
          positionsInUse,
          widgetReference
        )
      );

      expect(result[0]).toBeFalsy();
      expect(result.length).toBe(2);
    });

    it('should handle relative-to-viewport as true if position is available', () => {
      const relation = 'relative-to-viewport';
      const validPositions = ['top', 'middle', 'bottom'];
      const positionsInUse = [];
      const widgetReference = 'top';

      const result = isValidatePositionReferenceSpy(
        relation,
        validPositions,
        positionsInUse,
        widgetReference
      );

      expect(result).toBeTruthy();
    });

    it('should handle relative-to-viewport as false if position is unavailable', () => {
      const relation = 'relative-to-viewport';
      const validPositions = ['top', 'middle', 'bottom'];
      const positionsInUse = ['top'];
      const widgetReference = 'top';

      const result = isValidatePositionReferenceSpy(
        relation,
        validPositions,
        positionsInUse,
        widgetReference
      );

      expect(result).toBeFalsy();
    });
  });

  describe('validateIframeWidgetWithProps fn', () => {
    beforeAll(() => {
      mapWidgetToRenderPropsSpy.mockClear();
      validateIframeWidgetWithPropsSpy.mockClear();
    });
    it('should be called with the correct arguments', () => {
      const widgetList = [];
      const addonsList = [];
      const widget = {
        dimensions: { web: null },
        position: { reference: { web: null } }
      };
      const positions = ['top'];
      const breakpoint = 'web';
      const usedPositions = [];

      validateIframeWidgetWithPropsSpy(
        widgetList,
        addonsList,
        widget,
        positions,
        breakpoint,
        usedPositions
      );

      expect(helpers.validateIframeWidgetWithProps).toBeCalledWith(
        widgetList,
        addonsList,
        widget,
        positions,
        breakpoint,
        usedPositions
      );
    });

    it('should return the prev state if dimensions are not valid', () => {
      const widgetList = [];
      const addonsList = [];
      const widget = {
        dimensions: { web: null },
        position: { reference: { web: null } }
      };
      const positions = ['top'];
      const breakpoint = 'web';
      const usedPositions = [];

      const result = validateIframeWidgetWithPropsSpy(
        widgetList,
        addonsList,
        widget,
        positions,
        breakpoint,
        usedPositions
      );

      expect(result).toStrictEqual({
        list: [],
        addons: [],
        position: null,
        requireFullSize: false
      });
    });

    it('should return the prev state if ref position is invalid', () => {
      const widgetList = [];
      const addonsList = [];
      const widget = {
        dimensions: { web: true },
        position: { reference: { web: null } }
      };
      const positions = ['top'];
      const breakpoint = 'web';
      const usedPositions = [];

      isValidatePositionReferenceSpy.mockImplementationOnce(() => false);

      const result = validateIframeWidgetWithPropsSpy(
        widgetList,
        addonsList,
        widget,
        positions,
        breakpoint,
        usedPositions
      );

      // todo: check difference between requireFullSize and fullSize
      expect(result).toStrictEqual({
        list: [],
        addons: [],
        position: null,
        requireFullSize: false
      });
    });

    it('should return a parsed widget if the validations are passed', () => {
      const widgetList = [];
      const addonsList = [];
      const widget = {
        id: 1,
        kind: 'iframe',
        url: null,
        iframeType: null,
        dimensions: {
          web: true,
          fullSize: false
        },
        position: { reference: { web: null } }
      };
      const positions = ['top'];
      const breakpoint = 'web';
      const usedPositions = [];

      isValidatePositionReferenceSpy.mockImplementationOnce(() => true);
      mapWidgetToRenderPropsSpy.mockImplementationOnce((...args) => args[0]);

      const result = validateIframeWidgetWithPropsSpy(
        widgetList,
        addonsList,
        widget,
        positions,
        breakpoint,
        usedPositions
      );

      expect(result).toStrictEqual({
        list: [
          {
            id: 1,
            kind: 'iframe',
            url: null,
            iframeType: null,
            dimensions: {
              web: true,
              fullSize: false
            },
            position: { reference: null }
          }
        ],
        addons: [],
        position: null,
        fullSize: false
      });
    });

    it('should handle a widget who has addons appended', () => {
      const widgetList = [];
      const addonsList = [];
      const addons = [
        {
          // valid case cuz breakpoint and relation are valid
          id: 1,
          dimensions: { web: true },
          position: { relation: 'relative-to-app' }
        },
        {
          // invalid because breakpoint doesnt exit
          id: 2,
          dimensions: { web: false },
          position: { relation: 'relative-to-app' }
        },
        {
          // invalid because relation should only be to app
          id: 3,
          dimensions: { web: true },
          position: { relation: 'relative-to-viewport' }
        }
      ];

      const widget = {
        id: 1,
        kind: 'iframe',
        url: null,
        iframeType: null,
        dimensions: {
          web: true,
          fullSize: false
        },
        position: { reference: { web: null } },
        addons
      };
      const positions = ['top'];
      const breakpoint = 'web';
      const usedPositions = [];

      isValidatePositionReferenceSpy.mockImplementationOnce(() => true);
      mapWidgetToRenderPropsSpy.mockImplementation((...args) => args[0]);

      const result = validateIframeWidgetWithPropsSpy(
        widgetList,
        addonsList,
        widget,
        positions,
        breakpoint,
        usedPositions
      );

      expect(result).toStrictEqual({
        list: [
          {
            id: 1,
            kind: 'iframe',
            url: null,
            iframeType: null,
            dimensions: {
              web: true,
              fullSize: false
            },
            position: { reference: null },
            addons
          }
        ],
        addons: [
          {
            id: 1,
            dimensions: { web: true },
            position: { relation: 'relative-to-app' }
          }
        ],
        position: null,
        fullSize: false
      });
    });
  });

  describe('getWidgetsShapeToUpdate fn', () => {
    it('should return a correct widget to update', () => {
      const breakpoint = 'mobile';
      const widgetRef = [{ id: 'my-chat' }];
      const widgets = {
        'my-chat': {
          id: 'my-chat',
          dimensions: { mobile: { fullSize: true } },
          position: { reference: { mobile: 'bottom' } }
        }
      };
      // @ts-ignore
      expect(
        getWidgetsShapeToUpdate(
          widgetRef as WidgetReference[],
          widgets,
          breakpoint
        )
      ).toStrictEqual([
        {
          dimension: { fullSize: true },
          id: 'my-chat',
          isFullSize: true,
          position: { reference: 'bottom' },
          ref: { id: 'my-chat' }
        }
      ]);
    });
  });

  describe('mapWidgetToRenderProps fn', () => {
    it.skip('should return the correct obj', () => {});
  });

  describe('mapWidgetToRenderProps fn', () => {
    it.skip('should return the correct obj', () => {});
  });
});
