import { assign, Machine, send} from "xstate";
import { GridPositionsInViewport, GridSettings, WidgetRules } from "../types";
import { calculateGridDimensions, reconcileWidgets, sendViewportDimensions, setWidgetsRules, SET_VIEWPORT_SIZE, SET_WIDGETS_IN_STATE, updateWidgetRules, UPDATE_WIDGET_IN_STATE } from "./actions";

export enum MachineStates {
  calculateGridDimensions = 'calculateGridDimensions',
  setWidgetsRules = 'setWidgetsRules',
  updateWidgetRules = 'updateWidgetRules',
  reconcileWidgets = 'reconcileWidgets',
  renderWidgetsInDom = 'renderWidgetsInDom',
  catchInvokeError = 'catchInvokeError'
}

export type WidgetsMachineCtx = {
  activeBreakpoint: string;
  widgetsIds: string[];
  widgets: {[key:string]: WidgetRules};
  positions: GridPositionsInViewport;
  rules: GridSettings;
}

const handleInvokeError = {
  target: MachineStates.catchInvokeError,
  // rejected promise data is on event.data property
  // we could send to sentry log
  actions: (context, event) => console.log(event.data)
}

const widgetsMachine = (initialState: WidgetsMachineCtx) => Machine({
  id: 'widgetsMachine',
  initial: MachineStates.calculateGridDimensions,
  context: initialState,
  on: {
    [SET_WIDGETS_IN_STATE]: {
      target: MachineStates.setWidgetsRules
    },
    [UPDATE_WIDGET_IN_STATE]: {
      target: MachineStates.updateWidgetRules
    }
  },
  states: {
    // Event generate to update the rules of a valid and rendered widget,
    // ex => chat minimized (icon state) to maximize (conversation:id view)
    [MachineStates.setWidgetsRules]: {
      invoke: {
        src: setWidgetsRules,
        onDone: {
          target: MachineStates.calculateGridDimensions,
          actions: assign({
            widgetsIds: (context: WidgetsMachineCtx, event) => [
              ...event.data.ids
            ],
            widgets: (context: WidgetsMachineCtx, event) => ({
              ...event.data.widgets
            })
          })
        },
        onError: handleInvokeError
      }
    },
    // Event generate to update the rules of a valid and rendered widget,
    // ex => chat minimized (icon state) to maximize (conversation:id view)
    [MachineStates.updateWidgetRules]: {
      invoke: {
        src: updateWidgetRules,
        onDone: {
          target: MachineStates.calculateGridDimensions,
          actions: assign({
            widgetsIds: (context: WidgetsMachineCtx, event) => event.data.widgetsIds,
            widgets: (context: WidgetsMachineCtx, event) => event.data.widgets
          })
        },
        onError: handleInvokeError
      }
    },
    // first step of the controlled state machine
    // calculate the lasted grid dimensions and viewport breakpoint
    [MachineStates.calculateGridDimensions]: {
      on: {
        [SET_VIEWPORT_SIZE]: {}
      },
      invoke: {
        src: calculateGridDimensions,
        onDone: {
          target: MachineStates.reconcileWidgets,
          actions: assign({
            activeBreakpoint: (_, event) => event.data.label,
            rules: (_, event) => event.data.rules,
            positions: (_, event) => event.data.positions
          })
        },
        onError: handleInvokeError
      }
    },
    // Second step reconcile the new widget or grid state
    // with the previous rendered state and merge models
    [MachineStates.reconcileWidgets]: {
      invoke: {
        src: reconcileWidgets,
        onDone: {
          target: MachineStates.renderWidgetsInDom,
          // actions: () => {}
        }
      }
    },
    // Third step
    [MachineStates.renderWidgetsInDom]: {
      on: {
        [SET_VIEWPORT_SIZE]: {
          target: MachineStates.calculateGridDimensions
        },
      },
      invoke: {
        src: () => Promise.resolve(true),
      }
    },
    // handle error state
    // first approach is recalculate the grid dimensions for a next update
    [MachineStates.catchInvokeError]: {
      on: {
        [SET_VIEWPORT_SIZE]: {
          target: MachineStates.calculateGridDimensions
        },
      },
      // invoke: {
        // re-calc the grid dimensions and try to reconcile the state
        // src: () => Promise.resolve(true),
        // onDone: {
        //   target: MachineStates.reconcileWidgets
        // }
      // }
    },
  },
})

export default widgetsMachine

