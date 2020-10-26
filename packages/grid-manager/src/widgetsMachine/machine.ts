import { assign, Machine} from "xstate";
import { GridPositionsInViewport, GridSettings, WidgetRules } from "../types";
import { calculateGridDimensions, reconcileWidgets, setWidgetsRules, SET_VIEWPORT_SIZE, SET_WIDGETS_IN_STATE, updateWidgetRules, UPDATE_WIDGETS_IN_STATE } from "./actions";

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

const widgetsMachine = Machine({
  id: 'widgetsMachine',
  initial: MachineStates.calculateGridDimensions,
  context: {
    activeRuleName: null,
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
            activeRuleName: (_, event) => event.data.label,
            rules: (_, event) => event.data
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
    // Entry point in case of a widget asking to update her position or size in model
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
    //
    [MachineStates.reconcileWidgets]: {
      invoke: {
        src: reconcileWidgets,
        onDone: {
          target: MachineStates.renderWidgetsInDom,
          // actions: () => {}
        }
      }
    },
    [MachineStates.renderWidgetsInDom]: {
      invoke: {
        src: () => Promise.resolve(true),
        onDone: {
          // target: MachineStates.watchMachineChange
        }
      }
    }
  },
  on: {
    [SET_VIEWPORT_SIZE]: {
      target: `.${MachineStates.calculateGridDimensions}`
    },
    [SET_WIDGETS_IN_STATE]: {
      target: `.${MachineStates.setWidgetsRules}`
    },
    [UPDATE_WIDGETS_IN_STATE]: {
      target: `.${MachineStates.updateWidgetRules}`
    }
  }
})

export default widgetsMachine


  // // Available variables:
  // // - Machine
  // // - interpret
  // // - assign
  // // - send
  // // - sendParent
  // // - spawn
  // // - raise
  // // - actions
  // // - XState (all XState exports)

  // const fetchMachine = Machine({
  //   id: 'widgetsMachine',
  //   initial: 'calculateGridDimensions',
  //   context: {
  //     activeRuleName: null,
  //     widgetsIds: null,
  //     widgets: null,
  //     positions: null,
  //     rules: null,
  //   },
  //   states: {
  //     setWidgetsRules: {
  //       on: {
  //         'SET_WIDGETS_IN_STATE': {},
  //       },
  //       invoke: {
  //         src: () => setTimeout(() => Promise.resolve(true), 500),
  //         onDone: {
  //           target: 'calculateGridDimensions'
  //         }
  //       }
  //     },
  //     updateWidgetRules: {
  //       on: {
  //         'UPDATE_WIDGETS_IN_STATE': {}
  //       },
  //       invoke: {
  //         src: () => setTimeout(() => Promise.resolve(true), 500),
  //         onDone: {
  //           target: 'calculateGridDimensions'
  //         }
  //       }
  //     },
  //     calculateGridDimensions: {
  //       on: {
  //         'SET_VIEWPORT_SIZE': {},
  //       },
  //       invoke: {
  //         src: () => setTimeout(() => Promise.resolve(true), 2000),
  //         onDone: {
  //           target: 'reconcileWidgets'
  //         }
  //       }
  //     },
  //     reconcileWidgets: {
  //       invoke: {
  //         src: () => setTimeout(() => Promise.resolve(true), 500),
  //         onDone: {
  //           target: 'renderWidgetsInDom'
  //         }
  //       }
  //     },
  //     renderWidgetsInDom: {
  //       invoke: {
  //         src: () => setTimeout(() => Promise.resolve(true), 500),
  //       },
  //       on: {
  //         'SET_VIEWPORT_SIZE': {
  //           target: 'calculateGridDimensions'
  //         },
  //         'SET_WIDGETS_IN_STATE': {
  //           target: 'setWidgetsRules'
  //         },
  //         'UPDATE_WIDGETS_IN_STATE': {
  //           target: 'updateWidgetRules'
  //         }
  //       }
  //     }
  //   },
  // });
