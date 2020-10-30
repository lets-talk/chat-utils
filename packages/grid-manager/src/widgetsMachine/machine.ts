import { assign, Machine, send} from "xstate";
import { GridPositionsInViewport, GridSettings, WidgetRules, WidgetToRender } from "../types";
import { calculateGridDimensions, reconcileWidgets, renderWidgetsInDom, sendViewportDimensions, setWidgetsRules, SET_VIEWPORT_SIZE, SET_WIDGETS_IN_STATE, updateWidgetRules, UPDATE_WIDGET_IN_STATE } from "./actions";

export enum MachineStates {
  calculateGridDimensions = 'calculateGridDimensions',
  setWidgetsRules = 'setWidgetsRules',
  updateWidgetRules = 'updateWidgetRules',
  reconcileWidgets = 'reconcileWidgets',
  renderWidgetsInDom = 'renderWidgetsInDom',
  catchInvokeError = 'catchInvokeError'
}

type WidgetToRenderInCtx = {
  widgetsInDom: string[];
  slotsInUse: string[];
  widgets: WidgetToRender[];
}

export type ExtendedWidgetsRules = {
  requireUpdate: boolean;
} & WidgetRules

export type WidgetsMachineCtx = {
  viewport: {
    width: number;
    height: number;
  };
  activeBreakpoint: string;
  widgetsIds: string[];
  widgets: {[key:string]: ExtendedWidgetsRules};
  positions: GridPositionsInViewport;
  rules: GridSettings;
  requireUpdate: boolean;
  toRender: WidgetToRenderInCtx | null;
}

const handleInvokeError = {
  target: MachineStates.catchInvokeError,
  // rejected promise data is on event.data property
  // we could send to sentry log
  actions: (context, event) => console.log(event.data)
}

const widgetsMachine = (context: WidgetsMachineCtx) => Machine({
  id: 'widgetsMachine',
  initial: MachineStates.calculateGridDimensions,
  context,
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
            widgetsIds: (_, event) => [
              ...event.data.ids
            ],
            widgets: (_, event) => ({
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
            widgetsIds: (_, event) => event.data.widgetsIds,
            widgets: (_, event) => event.data.widgets
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
            viewport: (_, event) => event.data.viewport,
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
          actions: assign({
            toRender: (context: WidgetsMachineCtx, event) => ({
              widgetsInDom: [],
              slotsInUse: event.data.slotsInUse,
              widgets: event.data.widgets

            }),
            requireUpdate: (_, event) => event.data.requireUpdate
          })
        }
      }
    },
    // Third step take the queue of widgets that required be
    // rendered or updated
    [MachineStates.renderWidgetsInDom]: {
      on: {
        [SET_VIEWPORT_SIZE]: {
          target: MachineStates.calculateGridDimensions
        },
      },
      invoke: {
        src: renderWidgetsInDom,
        onDone: {
          actions: assign({
            toRender: (context: WidgetsMachineCtx, event) => ({
              widgetsInDom: event.data.widgetsInDom,
              slotsInUse: context.toRender.slotsInUse,
              widgets: []
          }),
            requireUpdate: () => false
          })
        }
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

