import { assign, Machine} from "xstate";
import { GridPositionsInViewport, GridSettings, WidgetRules } from "../types";
import { calculateGridDimensions, reconcileWidgets, setWidgetsRules, SET_VIEWPORT_SIZE, SET_WIDGETS_IN_STATE, updateWidgetRules, UPDATE_WIDGET_IN_STATE } from "./actions";

export enum MachineStates {
  calculateGridDimensions = 'calculateGridDimensions',
  setWidgetsRules = 'setWidgetsRules',
  updateWidgetRules = 'updateWidgetRules',
  reconcileWidgets = 'reconcileWidgets',
  renderWidgetsInDom = 'renderWidgetsInDom',
}

export type WidgetsMachineCtx = {
  activeRuleName: string;
  widgetsIds: string[];
  widgets: {[key:string]: WidgetRules};
  positions: GridPositionsInViewport;
  rules: GridSettings;
}

const widgetsMachine = () => Machine({
  id: 'widgetsMachine',
  initial: MachineStates.calculateGridDimensions,
  context: {
    activeRuleName: null,
    widgetsIds: [],
    widgets: {},
    positions: {},
    rules: {},
  } as WidgetsMachineCtx,
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
          target: MachineStates.reconcileWidgets,
          actions: assign({
            widgetsIds: (context: WidgetsMachineCtx, event) => [
              ...event.data.ids
            ],
            widgets: (context: WidgetsMachineCtx, event) => ({
              ...event.data.widgets
            })
          })
        }
      }
    },
    // Event generate to update the rules of a valid and rendered widget,
    // ex => chat minimized (icon state) to maximize (conversation:id view)
    [MachineStates.updateWidgetRules]: {
      invoke: {
        src: updateWidgetRules,
        onDone: {
          target: MachineStates.reconcileWidgets,
          actions: assign({
            widgetsIds: (context: WidgetsMachineCtx, event) => event.data.widgetsIds,
            widgets: (context: WidgetsMachineCtx, event) => event.data.widgets
          })
        }
      }
    },
    // first step of the controlled state machine and initial
    // state of the machine
    [MachineStates.calculateGridDimensions]: {
      on: {
        [SET_VIEWPORT_SIZE]: {}
      },
      invoke: {
        src: calculateGridDimensions,
        onDone: {
          target: MachineStates.reconcileWidgets,
          actions: assign({
            activeRuleName: (_, event) => event.data.label,
            rules: (_, event) => event.data
          })
        }
      }
    },
    // Second step
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
        onDone: {
          // target: MachineStates.watchMachineChange
        }
      }
    }
  },
})

export default widgetsMachine

