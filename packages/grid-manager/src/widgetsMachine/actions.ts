import { assign } from "xstate"
import { resolveActions } from "xstate/lib/actions"
import { breakpoints, getRulesFromViewport, gridRules } from "../grid/utils"
import { GridSettings, WidgetRules } from "../types"

// Actions names
export const SET_VIEWPORT_SIZE = 'SET_VIEWPORT_SIZE'
export const SET_WIDGETS_IN_STATE = 'SET_WIDGETS_IN_STATE'
export const UPDATE_WIDGETS_IN_STATE = 'UPDATE_WIDGETS_IN_STATE'

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
  type: UPDATE_WIDGETS_IN_STATE,
  widget
})

// calculateGridDimensions state invoker
export const calculateGridDimensions = (_, event: SetViewportAction) => {
  const rules: GridSettings = getRulesFromViewport(gridRules, event.width, breakpoints)

  console.log('calculateGridDimensions', {rules})

  if(rules) {
    return Promise.resolve(rules)
  } else {
    throw new Error('invalid grid rules')
  }
}

// setWidgetRules state invoker
export const setWidgetsRules = (context, event) => {
  console.log('setWidgetsRules', {context, event})
  if(!event.widgets.length) {
    throw new Error('widgets value can`t be empty')
  }

  const widgetsParsed =  event.widgets.reduce((acc, widget: WidgetRules) => ({
    widgetsIds: [...acc.widgetsIds, widget.id],
    widgets: {
      ...acc.widgets,
      [widget.id]: widget
    }
  }), {
    widgetsIds:[], widgets: {}
  })

  return Promise.resolve(widgetsParsed)
}

// setWidgetRules state invoker
export const updateWidgetRules = (context, event) => {
  console.log('updateWidgetRules', {context, event})
  return Promise.resolve(true)
}

// reconcileWidgets state invoker
export const reconcileWidgets = (context) => {
  console.log('reconcileWidgets', {context})
  return Promise.resolve(true)
}