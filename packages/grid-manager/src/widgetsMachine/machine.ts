import { assign, Machine} from "xstate";
import { GridPositionsInViewport, GridSettings, WidgetRules } from "../types";
import { calculateGridDimensions, reconcileWidgets, setWidgetsRules, SET_VIEWPORT_SIZE, SET_WIDGETS_IN_STATE } from "./actions";

export enum MachineStates {
  calculateGridDimensions = 'calculateGridDimensions',
  setWidgetsRules = 'setWidgetsRules',
  reconcileWidgets = 'reconcileWidgets',
  setWidgetsInDom = 'setWidgetsInDom',
}

export type WidgetsMachineCtx = {
  widgetsIds: string[];
  widgets: {[key:string]: WidgetRules},
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
          actions: assign({
            rules: (_, event) => event.data as GridSettings
          })
        }
      }
    },
    // Entry point if the trigger is an update in the rules of one or more rendered widgets
    [MachineStates.setWidgetsRules]: {
      invoke: {
        src: setWidgetsRules,
        onDone: {
          target: MachineStates.reconcileWidgets,
          actions: assign({
            widgetsIds: (context: WidgetsMachineCtx, event) =>
              [context.widgetsIds, ...event.data.ids],
            widgets: (context: WidgetsMachineCtx, event) => ({
              ...context.widgets,
              ...event.data.widgets
            })
          })
        }
      }
    },
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
    },
    [SET_WIDGETS_IN_STATE]: {
      target: `.${MachineStates.setWidgetsRules}`
    }
  }
})

export default widgetsMachine