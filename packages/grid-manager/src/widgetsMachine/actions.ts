import uniq from "lodash/uniq";
import find from "lodash/find";
import { breakpoints, getGridPositions, getRulesFromViewport, gridRules } from "../grid/utils"
import { AddonRules, GridPositionsInViewport, GridSettings, UpdateWidgetRules, WidgetReference, WidgetRules, WidgetToRender, WidgetToUpdate } from "../types"
import { WidgetsMachineCtx } from "./machine"
import { appendWidgetAddonToRef, renderWidgetElement, updateWidgetElement } from "../dom/render";
import { generateSortedListOfWidgets, getWidgetMapProps } from "./helpers";
import { removeNodeRef } from "../dom/utils";

// Actions names
export const SET_VIEWPORT_SIZE = 'SET_VIEWPORT_SIZE'
export const SET_WIDGETS_IN_STATE = 'SET_WIDGETS_IN_STATE'
export const UPDATE_WIDGET_IN_STATE = 'UPDATE_WIDGET_IN_STATE'
export const ADD_WIDGET_ADDON_IN_STATE = 'UPDATE_WIDGET_IN_STATE'

// Actions fns
type SetViewportAction = {
  type: string;
  width: number;
  height: number;
}

export const sendViewportDimensions = (width:number, height:number) => ({
  type: SET_VIEWPORT_SIZE,
  width,
  height
})

export const sendWidgetsIntoMachine = (widgets: WidgetRules[]) => ({
  type: SET_WIDGETS_IN_STATE,
  widgets
})

export const sendUpdateToWidget = (widget: UpdateWidgetRules) => ({
  type: UPDATE_WIDGET_IN_STATE,
  widget
})

export const removeWidget = (widgetId: string) => ({
  type: UPDATE_WIDGET_IN_STATE,
  widgetId
})

export const extendWidgetWithAddons = (widgetId: string, addons: AddonRules[]) => ({
  type: UPDATE_WIDGET_IN_STATE,
  removeWidget,
  addons
})

// calculateGridDimensions state invoker
export const calculateGridDimensions = (context: WidgetsMachineCtx, event: SetViewportAction) => {
  // if the event is was not triggered by a window resize
  // we use the last valid viewport value
  const isFromResize = event.type === SET_VIEWPORT_SIZE
  const width = isFromResize ? event.width : context.viewport.width
  const height = isFromResize ? event.height : context.viewport.height
  const rules: GridSettings = getRulesFromViewport(gridRules, width, breakpoints)

  const positions: GridPositionsInViewport = getGridPositions({
    width,
    height
    }, {
      cols: rules.columns,
      rows: rules.rows
    }, rules.positions
  )

  if(rules && positions) {
    return Promise.resolve({
      viewport: {
        width,
        height
      },
      label: rules.label,
      rules,
      positions,
      requiredUpdate: rules.label !== context.rules.label
    })
  } else {
    throw new Error('invalid grid rules')
  }
}

// setWidgetRules state invoker
export const setWidgetsRules = (context: WidgetsMachineCtx, event: {
  type: string,
  widgets: WidgetRules[]
}) => {
  if(!event.widgets.length) {
    throw new Error('widgets value can`t be empty')
  }

  const widgetsParsed =  event.widgets.reduce((acc, widget: WidgetRules) => ({
    ids: [...acc.ids, widget.id],
    widgets: {
      ...acc.widgets,
      [widget.id]: widget
    }
  }), {
    ids:[],
    widgets: {},
  })

  const ids = [...context.widgetsIds, ...widgetsParsed.ids]
  const mergeIds = uniq(ids)

  // if the length differ we try to write the same widget to time
  // By design I don't want to trow an error and only log (always last set wins)
  if(mergeIds.length !== ids.length) {
    console.log(`Trying to duplicate widget in model ids: ${[...ids]}`)
  }

  return Promise.resolve({
    ids,
    widgets: {
      ...widgetsParsed.widgets,
      ...context.widgets
    },
    forRender: widgetsParsed.ids
  })
}

// setWidgetRules state invoker
export const updateWidgetRules = (context: WidgetsMachineCtx, event: {
  type: string,
  widget: UpdateWidgetRules
}) => {
  const { activeBreakpoint, renderCycle: {widgetsInDom}, widgets } = context
  const { id, dimensions, position, kind } = event.widget

  const activeWidget = widgets[id]
  const isPositionValid = !!dimensions[activeBreakpoint]
  const getReference = find(widgetsInDom, (ref) => ref.id === id)

  if(!activeWidget || !getReference) {
    throw new Error('invalid widget id to update')
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
        position: {...position, reference: position.reference[activeBreakpoint]},
        kind
      }
    ),
    // if position is null => false, is update obj has the breakpoint => true
    requireUpdate: isPositionValid,
    requireRemove: !isPositionValid
  }

  return Promise.resolve(updateWidget)
}

// reconcileWidgets state invoker
export const reconcileWidgets = (context: WidgetsMachineCtx) => {
  const {
    widgets,
    rules,
    activeBreakpoint,
    requireGlobalUpdate,
    widgetsIdsToTrack: {forRender},
    renderCycle: {widgetsInDom}
  } = context;

  let widgetsListByType = {
    blank: [],
    iframe: [],
    usedPositions: [],
    requireFullSize: false,
    isPristine: true,
    addons: []
  };

  // flow
  // Take all the widgets that request to be rendered and consolidate
  // in a finite list of valid widgets for renderWidgetElement dom method

  // if the breakpoint change the entire model required to be recalculated
  if(requireGlobalUpdate) {
    widgetsListByType = generateSortedListOfWidgets(
      Object.keys(widgets).map(key => widgets[key]),
      rules,
      activeBreakpoint
    )
  }

  // if only was a method set or from class invoker map the new widget to model
  if(!!forRender.length) {
    widgetsListByType = generateSortedListOfWidgets(
      forRender.map(key => widgets[key]),
      rules,
      activeBreakpoint
    )
  }

  // is model is the same ex. resize event but the breakpoint
  // return empty model
  if(widgetsListByType.isPristine) {
    return Promise.resolve({
      slotsInUse: [],
      widgetsToRender: [],
    })
  }

  // if any widget require to be rendered at full size take the first one
  // that match the criteria and remove all the rest from the iframe queue
  if(widgetsListByType.requireFullSize) {
    const firstFullSizeWidget = find(widgetsListByType.iframe,
      (widget) => widget.dimensions.fullSize
    )
    return Promise.resolve({
      slotsInUse: widgetsListByType.usedPositions,
      widgetsToRender: [...widgetsListByType.blank, firstFullSizeWidget],
      addonsToRender: []
    })
  }

  // else merge the two list and check if it's no empty
  const toRenderList = [
    ...widgetsListByType.blank, ...widgetsListByType.iframe
  ]

  return Promise.resolve({
    widgetsToRender: toRenderList,
    slotsInUse: widgetsListByType.usedPositions,
    addonsToRender: widgetsListByType.addons,
  })
}

// Get a list of widgets to render or update and call renderWidgetElement
export const renderWidgetsInDom = (context: WidgetsMachineCtx) => {
  const { requireGlobalUpdate, renderCycle, widgetsIds, widgets, } = context
  const { widgetsInDom, updateCycle, positionsInUse} = renderCycle;

  let prevWidgetsRefs = widgetsInDom ? widgetsInDom : [];
  console.log({updateCycle, prevWidgetsRefs})

  if(requireGlobalUpdate) {
    prevWidgetsRefs = [];
    widgetsInDom.forEach((widget: WidgetReference) =>
      removeNodeRef(widget.ref)
    );
  }

  updateCycle.remove.forEach((widget: WidgetReference) => {
    prevWidgetsRefs = prevWidgetsRefs.filter(ref => ref.id !== widget.id);
    removeNodeRef(widget.ref)
  })

  updateCycle.update.forEach((widget: WidgetToUpdate) => {
    updateWidgetElement(widget, context.positions)
  })

  const widgetsRef = updateCycle.render.map((widget: WidgetToRender) => {
    prevWidgetsRefs = prevWidgetsRefs.filter(ref => ref.id !== widget.id);
    return renderWidgetElement(widget, context.positions) as any;
  });

  // append
  updateCycle.widgetAddons.forEach((addonWidget: any) => {
    // is the referent can't be founded throw
    if(widgetsIds.indexOf(addonWidget.position.reference) === -1) {
      throw new Error('reference widget doesn`t exit in machine model')
    }
    // else dispatch action to append addon into the parent widget
    appendWidgetAddonToRef(
      addonWidget,
      widgets[addonWidget.position.reference].id,
      [...widgetsInDom, ...widgetsRef]
    )
  })

  return Promise.resolve({
    widgetsRef: !!widgetsRef.length ? [...prevWidgetsRefs, ...widgetsRef] : widgetsInDom,
    positionsInUse
  })
}

export const addAddonsToWidget = (context: WidgetsMachineCtx, event: {
  widgetId: string,
  addons: AddonRules[]
}) => {
  return Promise.resolve(true)
}