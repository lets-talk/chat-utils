import uniq from "lodash/uniq";
import reduce from "lodash/reduce";
import find from "lodash/find";
import { breakpoints, getGridPositions, getRulesFromViewport, gridRules } from "../grid/utils"
import { GridPositionsInViewport, GridSettings, WidgetRules, WidgetToRender } from "../types"
import { WidgetsMachineCtx } from "./machine"
import { mapWidgetToRenderProps } from "../dom/utils"

// Actions names
export const SET_VIEWPORT_SIZE = 'SET_VIEWPORT_SIZE'
export const SET_WIDGETS_IN_STATE = 'SET_WIDGETS_IN_STATE'
export const UPDATE_WIDGET_IN_STATE = 'UPDATE_WIDGET_IN_STATE'

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

export const sendWidgetsIntoMachine = (widgets: WidgetRules) => ({
  type: SET_WIDGETS_IN_STATE,
  widgets
})

export const sendUpdateToWidget = (widget: WidgetRules) => ({
  type: UPDATE_WIDGET_IN_STATE,
  widget
})

export const removeWidget = (id: number) => ({
  type: UPDATE_WIDGET_IN_STATE,
  id
})

// calculateGridDimensions state invoker
export const calculateGridDimensions = (context, event: SetViewportAction) => {
  console.log({calculateGridDimensions: event})

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
      positions
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
      [widget.id]: {...widget, requireUpdate: true}
    }
  }), {
    ids:[], widgets: {}
  })

  const ids = [...context.widgetsIds, ...widgetsParsed.ids]
  const mergeIds = uniq(ids)

  // if the length differ we try to write the same widget to time
  // By design I don't want to trow an error and only log (always last set wins)
  if(mergeIds.length !== ids.length) {
    console.log(`Trying opf write the same ids ${[...ids]}`)
  }

  return Promise.resolve({
    ids,
    widgets: {
      ...widgetsParsed.widgets,
      ...context.widgets
    }
  })
}

// setWidgetRules state invoker
export const updateWidgetRules = (context, event) => {
  console.log('updateWidgetRules', {context, event})
  return Promise.resolve(true)
}

// reconcileWidgets state invoker
export const reconcileWidgets = (context) => {
  // Take all the widgets that request to be rendered and consolidate
  // in a finite list of valid widgets for renderWidgetElement dom method
  const sortWidgetsByType = reduce(context.widgets, (acc, widget: any) => {
    switch(widget.kind) {
      case 'iframe':
        const widgetToRender = mapWidgetToRenderProps(
          acc.iframe,
          widget,
          context.rules.positions,
          context.activeBreakpoint,
          acc.usedPositions
        );
        return {
          ...acc,
          iframe: widgetToRender.list,
          usedPositions: widgetToRender.position ?
            [...acc.usedPositions, widgetToRender.position] : acc.usedPositions,
          requireFullSize: widgetToRender.requireFullSize ?
            widgetToRender.requireFullSize : acc.requireFullSize
        };
      // I find a case here the blank case apply to any breakpoint?
      case 'blank':
        return {...acc, blank: [...acc.blank, widget]};
      // div case is unsupported and default doesn't exit
      case 'div':
      default:
        return acc;
    }
  }, {
    blank: [],
    iframe: [],
    usedPositions: [],
    requireFullSize: false
  })

  // if any widget require to be rendered at full size take the first one
  // that match the criteria and remove all the rest from the iframe queue
  if(sortWidgetsByType.requireFullSize) {
    const firstFullSizeWidget = find(sortWidgetsByType.iframe,
      (widget) => widget.dimensions.fullSize
    )
    return Promise.resolve([
      ...sortWidgetsByType.blank, firstFullSizeWidget
    ])
  }

  return Promise.resolve([
    ...sortWidgetsByType.blank, ...sortWidgetsByType.iframe
  ])
}

// reconcileWidgets state invoker
export const renderWidgetsInDom = (context) => {


  return Promise.resolve(true)
}