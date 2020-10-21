import { Machine} from "xstate";
import { GridPositionsInViewport, GridSettings } from "../types";
import { calculateGridDimensions, reconcileWidgets, SET_VIEWPORT_SIZE, updateGridContext } from "./actions";

export enum MachineStates {
  calculateGridDimensions = 'calculateGridDimensions',
  setWidgetRules = 'setWidgetRules',
  reconcileWidgets = 'reconcileWidgets',
  setWidgetsInDom = 'setWidgetsInDom',
}

export type WidgetsMachineCtx = {
  widgetsIds: string[];
  widgets: any,
  positions: GridPositionsInViewport,
  rules: GridSettings,
}

const widgetsMachine = Machine({
  id: 'widgetsMachine',
  initial: MachineStates.calculateGridDimensions,
  context: {
    widgetsIds: null,
    widgets: null,
    positions: null,
    rules: null,
  } as WidgetsMachineCtx,
  states: {
    // Entry point if the trigger is a window resize event or first mount
    [MachineStates.calculateGridDimensions]: {
      invoke: {
        src: calculateGridDimensions,
        onDone: {
          target: MachineStates.reconcileWidgets,
          actions: updateGridContext
        }
      }
    },
    // Entry point if the trigger is an update in the rules of one or more rendered widgets
    [MachineStates.setWidgetRules]: {},
    //
    [MachineStates.reconcileWidgets]: {
      invoke: {
        src: reconcileWidgets,
        onDone: {
          target: MachineStates.setWidgetsInDom,
          // actions: () => {}
        }
      }
    },
    [MachineStates.setWidgetsInDom]: {
      type: 'final'
    }
  },
  on: {
    [SET_VIEWPORT_SIZE]: {
      target: `.${MachineStates.calculateGridDimensions}`
    }
  }
})

export default widgetsMachine