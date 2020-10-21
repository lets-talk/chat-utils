import { assign } from "xstate"
import { resolveActions } from "xstate/lib/actions"
import { breakpoints, getRulesFromViewport, gridRules } from "../grid/utils"
import { GridSettings } from "../types"

// Actions names
export const SET_VIEWPORT_SIZE = 'SET_VIEWPORT_SIZE'

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

// calculateGridDimensions state invoker
export const calculateGridDimensions = (context, event: SetViewportAction) => {
  const rules: GridSettings = getRulesFromViewport(gridRules, event.width, breakpoints)
  console.log('invoke calculateGridDimensions', {rules})

  if(rules) {
    return Promise.resolve({rules})
  } else {
    throw new Error('invalid grid rules')
  }
}

export const updateGridContext = (context, event) => {
  console.log({context, data: event.data.rules})
  return assign({
    ...context,
    rules: event.data.rules as GridSettings
  })
}

// reconcileWidgets state invoker
export const reconcileWidgets = (context) => {
  console.log({context})
  return Promise.resolve(true)
}