import { assign, Machine, send} from "xstate";
import { GridPositionsInViewport, GridSettings, WidgetReference, WidgetRules, WidgetToRender, WidgetToUpdate } from "../types";
import { addAddonsToWidget, ADD_WIDGET_ADDON_IN_STATE, calculateGridDimensions, reconcileWidgets, renderWidgetsInDom, sendViewportDimensions, setWidgetsRules, SET_VIEWPORT_SIZE, SET_WIDGETS_IN_STATE, updateWidgetRules, UPDATE_WIDGET_IN_STATE } from "./actions";

export enum MachineStates {
  calculateGridDimensions = 'calculateGridDimensions',
  setWidgetsRules = 'setWidgetsRules',
  updateWidgetRules = 'updateWidgetRules',
  reconcileWidgets = 'reconcileWidgets',
  renderWidgetsInDom = 'renderWidgetsInDom',
  catchInvokeError = 'catchInvokeError',
  extendWidgetWithAddons = 'extendWidgetWithAddons'
}

export type WidgetsToRenderInCtx = {
  widgetsInDom: WidgetReference[]
  updateCycle: {
    render: WidgetToRender[] | null;
    update: WidgetToUpdate[] | null;
    remove: WidgetReference[] | null;
  }
  positionsInUse: string[];
}

export type widgetsIdsToTrackInCtx = {
  forRender: string[] | null;
  forUpdate: string[] | null;
  forRemove: string[] | null;
}

export type WidgetsMachineCtx = {
  viewport: {
    width: number;
    height: number;
  };
  activeBreakpoint: string;
  widgetsIds: string[];
  widgetsIdsToTrack: widgetsIdsToTrackInCtx;
  widgets: {[key:string]: WidgetRules};
  positions: GridPositionsInViewport;
  rules: GridSettings;
  requireGlobalUpdate: boolean;
  renderCycle: WidgetsToRenderInCtx;
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
    },
    [ADD_WIDGET_ADDON_IN_STATE]: {
      target: MachineStates.extendWidgetWithAddons
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
            }),
            widgetsIdsToTrack: (_, event) => ({
              forRender: event.data.forRender,
              forUpdate: [],
              forRemove: []
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
          target: MachineStates.renderWidgetsInDom,
          actions: assign({
            widgets: (ctx: WidgetsMachineCtx, event) => ({
              ...ctx.widgets,
              [event.data.widget.id]: event.data.widget
            }),
            renderCycle: (ctx: WidgetsMachineCtx, event) => ({
              ...ctx.renderCycle,
              updateCycle: {
                render: [],
                remove: event.data.requireRemove ?
                  [event.data.widgetUpdate] : [],
                update: event.data.requireUpdate ?
                  [event.data.widgetUpdate] : [],
              }
            })
          })
        },
        onError: handleInvokeError
      }
    },
    // Event generate to update the rules of a valid and rendered widget,
    // ex => chat minimized (icon state) to maximize (conversation:id view)
    [MachineStates.extendWidgetWithAddons]: {
      invoke: {
        src: () => Promise.resolve(true),
        onDone: {
          target: MachineStates.renderWidgetsInDom,
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
            positions: (_, event) => event.data.positions,
            requireGlobalUpdate: (_, event) => event.data.requiredUpdate,
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
            renderCycle: (context: WidgetsMachineCtx, event) => ({
              ...context.renderCycle,
              positionsInUse: event.data.slotsInUse,
              updateCycle: {
                ...context.renderCycle.updateCycle,
                render: event.data.widgetsToRender,
              },
            }),
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
            widgetsIdsToTrack: () => ({
              forRender: [],
              forUpdate: [],
              forRemove: []
            }),
            renderCycle: (context: WidgetsMachineCtx, event) => ({
              ...context.renderCycle,
              widgetsInDom: event.data.widgetsRef,
              positionsInUse: context.renderCycle.positionsInUse,
              updateCycle: {
                render: [],
                update: [],
                remove: []
              }
            }),
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

