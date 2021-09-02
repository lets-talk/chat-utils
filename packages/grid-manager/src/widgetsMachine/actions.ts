import uniq from 'lodash/uniq';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import {
  breakpoints,
  getGridPositions,
  getHeightRulesFromViewport,
  getRulesFromViewport,
  gridRules
} from '../grid/utils';
import {
  AddonRules,
  GridPositionsInViewport,
  GridSettings,
  ReferenceToGridPosition,
  UpdateWidgetRules,
  WidgetReference,
  WidgetRules,
  WidgetToRender,
  WidgetToUpdate
} from '../types';
import { WidgetsMachineCtx } from './machine';
import {
  appendWidgetAddonToRef,
  renderWidgetElement,
  updateWidgetElement
} from '../dom/render';
import {
  generateSortedListOfWidgets,
  getWidgetMapProps,
  mapWidgetToRenderProps
} from './helpers';
import { removeNodeRef } from '../dom/utils';

// Actions names
export const SET_VIEWPORT_SIZE = 'SET_VIEWPORT_SIZE';
export const SET_WIDGETS_IN_STATE = 'SET_WIDGETS_IN_STATE';
export const UPDATE_WIDGET_IN_STATE = 'UPDATE_WIDGET_IN_STATE';
export const REMOVE_WIDGET_IN_STATE = 'REMOVE_WIDGET_IN_STATE';
export const ADD_WIDGET_ADDON_IN_STATE = 'ADD_WIDGET_ADDON_IN_STATE';

// Actions fns
type SetViewportAction = {
  type: string;
  width: number;
  height: number;
};

export const sendViewportDimensions = (width: number, height: number) => ({
  type: SET_VIEWPORT_SIZE,
  width,
  height
});

export const sendWidgetsIntoMachine = (widgets: WidgetRules[]) => ({
  type: SET_WIDGETS_IN_STATE,
  widgets
});

export const sendUpdateToWidget = (widget: UpdateWidgetRules) => ({
  type: UPDATE_WIDGET_IN_STATE,
  widget
});

export const removeWidget = (widgetId: string) => ({
  type: REMOVE_WIDGET_IN_STATE,
  widgetId
});

export const extendParentWidgetWithAddons = (
  widgetId: string,
  widgetAddons: AddonRules[]
) => ({
  type: ADD_WIDGET_ADDON_IN_STATE,
  widgetId,
  widgetAddons
});

// calculateGridDimensions state invoker
export const calculateGridDimensions = (
  context: WidgetsMachineCtx,
  event: SetViewportAction
) => {
  // if the event is was not triggered by a window resize
  // we use the last valid viewport value
  const isFromResize = event.type === SET_VIEWPORT_SIZE;
  const width = isFromResize ? event.width : context.viewport.width;
  const height = isFromResize ? event.height : context.viewport.height;
  const rules: GridSettings = getRulesFromViewport(
    gridRules,
    width,
    breakpoints
  );

  const isHeightChanged = getHeightRulesFromViewport(height, context);

  console.log('width', width);
  console.log('height', height);
  console.log('calculateGridDimensions rules', rules);
  const positions: GridPositionsInViewport = getGridPositions(
    {
      width,
      height
    },
    {
      cols: rules.columns,
      rows: rules.rows
    },
    rules.positions
  );

  console.log('calculateGridDimensions positions', positions);

  if (!rules && !positions) {
    throw new Error('invalid grid rules');
  }

  return Promise.resolve({
    viewport: {
      width,
      height
    },
    label: rules.label,
    rules,
    positions,
    requiredUpdate: rules.label !== context.rules.label || isHeightChanged
  });
};

// setWidgetRules state invoker
export const setWidgetsRules = (
  context: WidgetsMachineCtx,
  event: {
    type: string;
    widgets: WidgetRules[];
  }
) => {
  if (!event.widgets.length) {
    throw new Error('widgets value can`t be empty');
  }

  const {
    widgetsIds,
    renderCycle: { widgetsInDom }
  } = context;

  const widgetsParsed = event.widgets.reduce(
    (acc, widget: WidgetRules) => ({
      ids: [...acc.ids, widget.id],
      widgets: {
        ...acc.widgets,
        [widget.id]: widget
      }
    }),
    {
      ids: [],
      widgets: {}
    }
  );

  const ids = [...widgetsIds, ...widgetsParsed.ids];
  const mergeIds = uniq(ids);
  // if the length differ we try to write the same widget to time
  // By design I don't want to trow an error and only log (always last set wins)
  if (mergeIds.length !== ids.length) {
    console.log(`Trying to duplicate widget in model ids: ${[...ids]}`);
    // if the widget is rendered I remove the node and make the
    // reconciliation flow continue as always
    widgetsInDom.forEach((widget) => {
      if (widget.id in widgetsParsed.widgets) {
        removeNodeRef(widget.ref);
      }
    });
  }

  return Promise.resolve({
    ids: mergeIds,
    widgets: {
      ...widgetsParsed.widgets,
      ...context.widgets
    },
    forRender: widgetsParsed.ids
  });
};

// setWidgetRules state invoker
export const updateWidgetRules = (
  context: WidgetsMachineCtx,
  event: {
    type: string;
    widget: UpdateWidgetRules;
  }
) => {
  const {
    activeBreakpoint,
    renderCycle: { widgetsInDom },
    widgets
  } = context;
  const { id, dimensions, position, kind } = event.widget;

  const activeWidget = widgets[id];
  const isPositionValid = !!dimensions[activeBreakpoint];
  const getReference = find(widgetsInDom, (ref) => ref.id === id);

  if (!activeWidget || !getReference) {
    throw new Error('invalid widget id to update');
  }

  const updateWidget = {
    widget: {
      ...activeWidget,
      dimensions,
      position
    },
    widgetUpdate: getWidgetMapProps(
      isPositionValid,
      activeWidget,
      getReference,
      {
        dimension: dimensions[activeBreakpoint],
        position: {
          ...position,
          reference: position.reference[activeBreakpoint]
        },
        kind
      }
    ),
    // if position is null => false, is update obj has the breakpoint => true
    requireUpdate: isPositionValid,
    requireRemove: !isPositionValid
  };

  return Promise.resolve(updateWidget);
};

// ReconcileWidgets state invoker
export const reconcileWidgets = (context: WidgetsMachineCtx) => {
  const {
    widgets,
    rules,
    activeBreakpoint,
    requireGlobalUpdate,
    widgetsIdsToTrack: { forRender }
  } = context;

  let widgetsListByType = {
    blank: [],
    iframe: [],
    usedPositions: [],
    requireFullSize: false,
    isPristine: true,
    addons: []
  };

  // consolidation flow =>
  // Take all the widgets that request to be rendered or re calculated and consolidate in a single source of thrusts

  // if the viewport breakpoint change the entire model required to be recalculated
  if (requireGlobalUpdate) {
    widgetsListByType = generateSortedListOfWidgets(
      Object.keys(widgets).map((key) => widgets[key]),
      rules,
      activeBreakpoint
    );
  }

  // if we only need to append or update a new widget to the model we consolidate the new widget from forRender case
  if (!!forRender.length) {
    widgetsListByType = generateSortedListOfWidgets(
      forRender.map((key) => widgets[key]),
      rules,
      activeBreakpoint
    );
  }

  // if the result of consolidate is a pristine model we return a empty list
  if (widgetsListByType.isPristine) {
    return Promise.resolve({
      slotsInUse: [],
      widgetsToRender: []
    });
  }

  // if any of the iframe widgets require to be rendered at full size take the first that match the criteria and remove the rest from the iframe queue
  // improvement: add to the widgets model a priority value in the case of two or more widget want to be rendered at full size
  if (widgetsListByType.requireFullSize) {
    const firstFullSizeWidget = find(
      widgetsListByType.iframe,
      (widget) => widget.dimensions.fullSize
    );
    return Promise.resolve({
      slotsInUse: widgetsListByType.usedPositions,
      widgetsToRender: [...widgetsListByType.blank, firstFullSizeWidget],
      addonsToRender: []
    });
  }

  // else we merge the two list of the render on iframe or window open blank
  const toRenderList = [
    ...widgetsListByType.blank,
    ...widgetsListByType.iframe
  ];

  // return the consolidate list of  widget to be rendered
  return Promise.resolve({
    widgetsToRender: toRenderList,
    slotsInUse: widgetsListByType.usedPositions,
    addonsToRender: widgetsListByType.addons
  });
};

// Get a list of widgets to render or update and call renderWidgetElement
export const renderWidgetsInDom = (context: WidgetsMachineCtx) => {
  console.log('renderWidgetsInDom!!!');
  const { requireGlobalUpdate, renderCycle, widgetsIds, widgets } = context;
  const { widgetsInDom, updateCycle, positionsInUse } = renderCycle;
  console.log('updateCycle', updateCycle);
  let prevWidgetsRefs = widgetsInDom ? widgetsInDom : [];

  if (requireGlobalUpdate) {
    prevWidgetsRefs = [];
    widgetsInDom.forEach((widget: WidgetReference) =>
      removeNodeRef(widget.ref)
    );
  }

  updateCycle.remove.forEach((widget: WidgetReference) => {
    prevWidgetsRefs = prevWidgetsRefs.filter((ref) => ref.id !== widget.id);
    removeNodeRef(widget.ref);
  });

  updateCycle.update.forEach((widget: WidgetToUpdate) => {
    updateWidgetElement(widget, context.positions);
  });

  const widgetsRef = updateCycle.render.map((widget: WidgetToRender) => {
    prevWidgetsRefs = prevWidgetsRefs.filter((ref) => ref.id !== widget.id);
    return renderWidgetElement(widget, context.positions) as any;
  });

  const addonsRef = updateCycle.widgetAddons
    ? updateCycle.widgetAddons.map((addonWidget: WidgetToRender) => {
        // is the referent can't be founded throw an error
        // todo: we should move this to the reconcile flow
        if (
          widgetsIds.indexOf(
            addonWidget.position.reference as ReferenceToGridPosition
          ) === -1
        ) {
          throw new Error(`reference widget doesn't exit in machine model`);
        }
        // else dispatch action to append addon into the parent widget
        return appendWidgetAddonToRef(
          addonWidget,
          widgets[addonWidget.position.reference as string].id,
          [...widgetsInDom, ...widgetsRef]
        );
      })
    : [];

  const hasNewReferences = !!widgetsRef.length || !!addonsRef.length;

  return Promise.resolve({
    widgetsRef: hasNewReferences
      ? [...prevWidgetsRefs, ...widgetsRef, ...addonsRef]
      : widgetsInDom,
    positionsInUse
  });
};

// Take a valid app id and remove the node from the dom and model
export const removeWidgetInCtx = (
  context: WidgetsMachineCtx,
  event: {
    type: string;
    widgetId: string;
  }
) => {
  const { widgets, renderCycle } = context;
  const { widgetsInDom } = renderCycle;
  const getReference = widgetsInDom.filter((ref) => ref.id === event.widgetId);

  if (!getReference.length) {
    throw new Error(`widget trying to be remove doesn't exit in model`);
  }

  const widgetsInstance = reduce(
    widgets,
    (acc, widget: WidgetRules) => {
      const isWidgetRequiredToBeRemove = widget.id === event.widgetId;
      const filteredAddons = widget.addons.filter(
        (addon: AddonRules) => addon.id !== event.widgetId
      );

      return isWidgetRequiredToBeRemove
        ? { ...acc }
        : {
            ...acc,
            [widget.id]: { ...widget, addons: filteredAddons }
          };
    },
    {}
  );

  return Promise.resolve({
    widgets: widgetsInstance,
    remove: getReference
  });
};

// append an addons to a widget if it valid and require a render if it needed
export const addAddonsToWidget = (
  context: WidgetsMachineCtx,
  event: {
    type: string;
    widgetId: string;
    widgetAddons: AddonRules[];
  }
) => {
  const { widgets, widgetsIds, activeBreakpoint } = context;
  const isWidgetValid = widgetsIds.indexOf(event.widgetId) !== -1;

  if (!isWidgetValid) {
    throw new Error(`Widget doesn't exit in context model`);
  }

  // get the active parent widget instance
  const updatedParentWidgetInstance = {
    ...widgets[event.widgetId],
    addons: [...widgets[event.widgetId].addons, ...event.widgetAddons]
  };

  // is widget breakpoint is disable for the active viewport only return the update widget model
  const isWidgetBreakpointValid = !!updatedParentWidgetInstance.dimensions[
    activeBreakpoint
  ];
  if (!isWidgetBreakpointValid) {
    return Promise.resolve({
      widget: updatedParentWidgetInstance,
      addons: []
    });
  }

  // if the widget is valid try to create the list of widgets
  const addonsToRender = event.widgetAddons.reduce((acc, addon: AddonRules) => {
    const dimensions = addon.dimensions[activeBreakpoint];
    // if the addon doesn't support the breakpoint or is not of
    // the kind relative-to-app return the previous list of addons
    if (!dimensions || addon.position.relation !== 'relative-to-app') {
      return acc;
    }
    // else map the widget and merge to the list
    return [...acc, mapWidgetToRenderProps(addon, dimensions, false)];
  }, []);

  return Promise.resolve({
    widget: updatedParentWidgetInstance,
    addons: addonsToRender
  });
};
