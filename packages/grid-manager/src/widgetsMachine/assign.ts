import { WidgetsMachineCtx } from './machine';

// error state
const errorAction = (_, event) => console.log(event.data.msg);

// setWidgetsRules state
const setWidgetsRulesIds = (_, event) => [...event.data.ids];
const setWidgetsRulesWidgets = (_, event) => ({ ...event.data.widgets });
const setWidgetsRulesIdsToTrack = (_, event) => ({
  forRender: event.data.forRender,
  forUpdate: [],
  forRemove: []
});

// updateWidgetRules state
const updateWidgetRulesActions = (ctx: WidgetsMachineCtx, event) => ({
  ...ctx.widgets,
  [event.data.widget.id]: event.data.widget
});
const updateWidgetRulesRenderCycle = (ctx: WidgetsMachineCtx, event) => ({
  ...ctx.renderCycle,
  updateCycle: {
    render: [],
    widgetAddons: [],
    remove: event.data.requireRemove ? [event.data.widgetUpdate] : [],
    update: event.data.requireUpdate ? [event.data.widgetUpdate] : []
  }
});

// removeWidgetInCtx state
const removeWidgetInCtxWidgets = (_, event) => ({ ...event.data.widgets });
const removeWidgetInCtxRenderCycle = (ctx: WidgetsMachineCtx, event) => ({
  ...ctx.renderCycle,
  updateCycle: {
    render: [],
    widgetAddons: [],
    remove: event.data.remove,
    update: []
  }
});

// addAddonsToWidget state
const addAddonsToWidgetWidgets = (ctx: WidgetsMachineCtx, event) => ({
  ...ctx.widgets,
  [event.data.widget.id]: event.data.widget
});
const addAddonsToWidgetRenderCycle = (ctx: WidgetsMachineCtx, event) => ({
  ...ctx.renderCycle,
  updateCycle: {
    render: [],
    widgetAddons: event.data.addons,
    remove: [],
    update: []
  }
});

// calculateGridDimensions state
const calculateGridDimensionsViewport = (_, event) => event.data.viewport;
const calculateGridDimensionsActiveBreakpoint = (_, event) => event.data.label;
const calculateGridDimensionsRules = (_, event) => event.data.rules;
const calculateGridDimensionsPositions = (_, event) => event.data.positions;
const calculateGridDimensionsRequireGlobalUpdate = (_, event) =>
  event.data.requiredUpdate;
const calculateGridDimensionsRequireHeightUpdate = (_, event) =>
  event.data.requireHeightUpdate;

// reconcileWidgets state
const reconcileWidgetsRenderCycle = (context: WidgetsMachineCtx, event) => {
  return {
    ...context.renderCycle,
    positionsInUse: event.data.slotsInUse,
    updateCycle: {
      ...context.renderCycle.updateCycle,
      update:
        event.data.heightUpdateCycle || context.renderCycle.updateCycle.update,
      render: event.data.widgetsToRender,
      widgetAddons: event.data.addonsToRender
    }
  };
};

// renderWidgetsInDom state
const renderWidgetsInDomWidgetsToTrack = () => ({
  forRender: [],
  forUpdate: [],
  forRemove: []
});
const renderWidgetsInDomRenderCycle = (context: WidgetsMachineCtx, event) => ({
  ...context.renderCycle,
  widgetsInDom: event.data.widgetsRef,
  positionsInUse: context.renderCycle.positionsInUse,
  updateCycle: {
    render: [],
    update: [],
    remove: [],
    widgetAddons: []
  }
});

export default {
  errorAction,
  setWidgetsRulesIds,
  setWidgetsRulesIdsToTrack,
  setWidgetsRulesWidgets,
  updateWidgetRulesActions,
  updateWidgetRulesRenderCycle,
  removeWidgetInCtxRenderCycle,
  removeWidgetInCtxWidgets,
  addAddonsToWidgetRenderCycle,
  addAddonsToWidgetWidgets,
  calculateGridDimensionsViewport,
  calculateGridDimensionsActiveBreakpoint,
  calculateGridDimensionsRules,
  calculateGridDimensionsPositions,
  calculateGridDimensionsRequireGlobalUpdate,
  reconcileWidgetsRenderCycle,
  renderWidgetsInDomWidgetsToTrack,
  renderWidgetsInDomRenderCycle,
  calculateGridDimensionsRequireHeightUpdate
};
