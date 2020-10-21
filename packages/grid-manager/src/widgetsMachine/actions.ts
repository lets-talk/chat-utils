import { assign } from "xstate"
import { resolveActions } from "xstate/lib/actions"
import { breakpoints, getRulesFromViewport, gridRules } from "../grid/utils"
import { GridSettings, WidgetRules } from "../types"

// Actions names
export const SET_VIEWPORT_SIZE = 'SET_VIEWPORT_SIZE'
export const SET_WIDGETS_IN_STATE = 'SET_WIDGETS_IN_STATE'

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

export const sendWidgetsToMachine = (widgets: WidgetRules) => ({
  type: SET_WIDGETS_IN_STATE,
  widgets
})

// calculateGridDimensions state invoker
export const calculateGridDimensions = (_, event: SetViewportAction) => {
  const rules: GridSettings = getRulesFromViewport(gridRules, event.width, breakpoints)
  console.log('invoke calculateGridDimensions', {rules})

  if(rules) {
    return Promise.resolve(rules)
  } else {
    throw new Error('invalid grid rules')
  }
}

// reconcileWidgets state invoker
export const reconcileWidgets = (context) => {
  console.log('reconcileWidgets', {context})
  return Promise.resolve(true)
}

// setWidgetRules state invoker
export const setWidgetsRules = (context, event) => {
  console.log('reconcileWidgets', {context, event})
  return Promise.resolve(true)
}