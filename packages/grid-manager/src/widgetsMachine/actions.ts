import uniq from "lodash/uniq"
import reduce from "lodash/reduce"
import { breakpoints, getGridPositions, getRulesFromViewport, gridRules } from "../grid/utils"
import { GridPositionsInViewport, GridSettings, WidgetRules, WidgetToRender } from "../types"
import { ExtendedWidgetsRules, WidgetsMachineCtx } from "./machine"

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
  console.log('setWidgetsRules', {context, event})
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
  console.log('reconcileWidgets', {context})

  const sortedWidgetsByType = reduce(context.widgets, (acc, widget: ExtendedWidgetsRules) => {
    switch(widget.kind) {
      case 'iframe':
        return {
          ...acc,
          iframe: mapWidgetToRender(
            acc.iframe,
            widget,
            context.rules.positions,
            context.activeBreakpoint
          )
        }
      // I find a case here the blank case apply to any breakpoint?
      case 'blank':
        return {...acc, blank: [...acc.blank, widget]}
      // div case is unsupported and default doesn't exit
      case 'div':
      default:
        return acc
    }
  }, {
    blank: [],
    iframe: []
  })

  function mapWidgetToRender(
    list: WidgetToRender[],
    widget: ExtendedWidgetsRules,
    positions: string[],
    breakpoint: string
  ) {
    const dimensions = widget.dimensions[breakpoint]
    // if the widget don't meed to be render return the prev list
    if(dimensions === null) return list;
    // if the position doesn't exit for the active breakpoint return list
    if(
      widget.position.relation === 'relative-to-viewport' &&
      positions.indexOf(widget.position.reference) === -1
    ) {
      return list;
    }

    return {
      isFullSize: dimensions.fullSize,
      dimensions: widget.dimensions[breakpoint],
    }
  }

  console.log({sortedWidgetsByType})

  return Promise.resolve(true)
}