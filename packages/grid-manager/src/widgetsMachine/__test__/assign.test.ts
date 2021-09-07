import assign from '../assign';

const consoleSpy: any = jest.spyOn(console, 'log');

describe('map assign module', () => {
  describe('setWidgetsRules state', () => {
    it('setWidgetsRulesIds', () => {
      const _ = () => {};
      const event = {
        data: { ids: [1, 2, 3] }
      };
      const result = assign.setWidgetsRulesIds(_, event);
      expect(result).toStrictEqual([1, 2, 3]);
    });
    it('setWidgetsRulesWidgets', () => {
      const _ = () => {};
      const event = {
        data: { widgets: { a: 1, b: 2 } }
      };
      const result = assign.setWidgetsRulesWidgets(_, event);
      expect(result).toStrictEqual({ a: 1, b: 2 });
    });

    it('setWidgetsRulesIdsToTrack', () => {
      const _ = () => {};
      const event = {
        data: { forRender: [1, 2, 3] }
      };
      const result = assign.setWidgetsRulesIdsToTrack(_, event);
      expect(result).toStrictEqual({
        forRender: [1, 2, 3],
        forUpdate: [],
        forRemove: []
      });
    });
  });

  describe('updateWidgetRules state', () => {
    it('updateWidgetRulesActions', () => {
      const context = {
        widgets: { 2: { a: 1 }, 3: { b: 2 } }
      } as any;
      const event = {
        data: { widget: { id: 1, otherKey: 2 } }
      };

      const result = assign.updateWidgetRulesActions(context, event);
      expect(result).toStrictEqual({
        1: { id: 1, otherKey: 2 },
        2: { a: 1 },
        3: { b: 2 }
      });
    });
    it('updateWidgetRulesRenderCycle should return empty array if model is the same', () => {
      const context = {
        renderCycle: { fromCtx: 1 }
      } as any;
      const event = {
        data: {
          requireRemove: false,
          requireUpdate: false
        }
      };

      const result = assign.updateWidgetRulesRenderCycle(context, event);
      expect(result).toStrictEqual({
        fromCtx: 1,
        updateCycle: {
          render: [],
          widgetAddons: [],
          remove: [],
          update: []
        }
      } as any);
    });

    it('updateWidgetRulesRenderCycle should return a new state if model change', () => {
      const context = {
        renderCycle: { fromaCtx: 1 }
      } as any;
      const event = {
        data: {
          requireRemove: true,
          requireUpdate: true,
          widgetUpdate: { id: 1 }
        }
      };

      const result = assign.updateWidgetRulesRenderCycle(context, event);
      expect(result).toStrictEqual({
        fromaCtx: 1,
        updateCycle: {
          render: [],
          widgetAddons: [],
          remove: [{ id: 1 }],
          update: [{ id: 1 }]
        }
      } as any);
    });
  });

  describe('removeWidgetInCtx state', () => {
    it('removeWidgetInCtxWidgets', () => {
      const _ = () => {};
      const event = {
        data: { widgets: { id: 1 } }
      };

      const result = assign.removeWidgetInCtxWidgets(_, event);
      expect(result).toStrictEqual({ id: 1 });
    });

    it('removeWidgetInCtxRenderCycle', () => {
      const context = {
        renderCycle: { fromaCtx: 1 }
      } as any;
      const event = {
        data: {
          remove: [{ id: 1 }]
        }
      };

      const result = assign.removeWidgetInCtxRenderCycle(context, event);
      expect(result).toStrictEqual({
        fromaCtx: 1,
        updateCycle: {
          render: [],
          widgetAddons: [],
          remove: [{ id: 1 }],
          update: []
        }
      } as any);
    });
  });

  describe('addAddonsToWidget state', () => {
    it('addAddonsToWidgetWidgets', () => {
      const context = {
        widgets: { 2: { id: 2, otherWidget: 3 } }
      } as any;
      const event = {
        data: {
          widget: { id: 1, otherKey: 2 }
        }
      };

      const result = assign.addAddonsToWidgetWidgets(context, event);
      expect(result).toStrictEqual({
        2: { id: 2, otherWidget: 3 },
        1: { id: 1, otherKey: 2 }
      });
    });

    it('addAddonsToWidgetRenderCycle', () => {
      const context = {
        renderCycle: { fromaCtx: 1 }
      } as any;
      const event = {
        data: {
          addons: { id: 1 }
        }
      };

      const result = assign.addAddonsToWidgetRenderCycle(context, event);
      expect(result).toStrictEqual({
        fromaCtx: 1,
        updateCycle: {
          render: [],
          widgetAddons: { id: 1 },
          remove: [],
          update: []
        }
      } as any);
    });
  });

  describe('calculateGridDimensions state', () => {
    it('calculateGridDimensionsViewport', () => {
      const _ = () => {};
      const event = { data: { viewport: { height: 100, width: 100 } } };
      const result = assign.calculateGridDimensionsViewport(_, event);
      expect(result).toStrictEqual({ height: 100, width: 100 });
    });
    it('calculateGridDimensionsActiveBreakpoint', () => {
      const _ = () => {};
      const event = { data: { label: 'web' } };
      const result = assign.calculateGridDimensionsActiveBreakpoint(_, event);
      expect(result).toBe('web');
    });
    it('calculateGridDimensionsRules', () => {
      const _ = () => {};
      const event = { data: { rules: { a: 1, b: 2 } } };
      const result = assign.calculateGridDimensionsRules(_, event);
      expect(result).toStrictEqual({ a: 1, b: 2 });
    });
    it('calculateGridDimensionsPositions', () => {
      const _ = () => {};
      const event = { data: { positions: ['top', 'bottom', 'middle'] } };
      const result = assign.calculateGridDimensionsPositions(_, event);
      expect(result).toStrictEqual(['top', 'bottom', 'middle']);
    });
    it('calculateGridDimensionsRequireGlobalUpdate', () => {
      const _ = () => {};
      const event = { data: { requiredUpdate: true } };
      const result = assign.calculateGridDimensionsRequireGlobalUpdate(
        _,
        event
      );
      expect(result).toBeTruthy();
    });
    it('calculateGridDimensionsRequireHeightUpdate', () => {
      const _ = () => {};
      const event = { data: { requireHeightUpdate: true } };
      const result = assign.calculateGridDimensionsRequireHeightUpdate(
        _,
        event
      );
      expect(result).toBeTruthy();
    });
  });

  describe('reconcileWidgets state', () => {
    it('reconcileWidgetsRenderCycle', () => {
      const context = {
        renderCycle: {
          fromCtx: 1,
          updateCycle: { remove: [], update: [] }
        }
      } as any;
      const event = {
        data: {
          slotsInUse: ['top'],
          widgetsToRender: [{ a: 1 }],
          addonsToRender: [{ b: 2 }]
        }
      };

      const result = assign.reconcileWidgetsRenderCycle(context, event);
      expect(result).toStrictEqual({
        fromCtx: 1,
        positionsInUse: ['top'],
        updateCycle: {
          render: [{ a: 1 }],
          widgetAddons: [{ b: 2 }],
          remove: [],
          update: []
        }
      } as any);
    });
  });

  describe('renderWidgetsInDom state', () => {
    it('renderWidgetsInDomWidgetsToTrack', () => {
      const result = assign.renderWidgetsInDomWidgetsToTrack();
      expect(result).toStrictEqual({
        forRender: [],
        forUpdate: [],
        forRemove: []
      });
    });

    it('renderWidgetsInDomRenderCycle', () => {
      const context = {
        renderCycle: {
          fromCtx: 1,
          positionsInUse: ['top']
        }
      } as any;
      const event = {
        data: {
          widgetsRef: { a: 1 }
        }
      };

      const result = assign.renderWidgetsInDomRenderCycle(context, event);
      expect(result).toStrictEqual({
        fromCtx: 1,
        widgetsInDom: { a: 1 },
        positionsInUse: ['top'],
        updateCycle: {
          render: [],
          update: [],
          remove: [],
          widgetAddons: []
        }
      });
    });
  });

  describe('errorAction', () => {
    it('should call the error log', () => {
      const _ = () => {};
      const event = {
        data: { msg: 'error' }
      };
      assign.errorAction(_, event);
      expect(consoleSpy).toBeCalledWith('error');
    });
  });
});
