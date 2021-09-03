import { assign, Machine } from 'xstate';
import {
  AddonRules,
  GridPositionsInViewport,
  GridSettings,
  WidgetReference,
  WidgetRules,
  WidgetToRender,
  WidgetToUpdate
} from '../types';
import {
  addAddonsToWidget,
  ADD_WIDGET_ADDON_IN_STATE,
  calculateGridDimensions,
  reconcileWidgets,
  removeWidgetInCtx,
  REMOVE_WIDGET_IN_STATE,
  renderWidgetsInDom,
  sendViewportDimensions,
  setWidgetsRules,
  SET_VIEWPORT_SIZE,
  SET_WIDGETS_IN_STATE,
  updateWidgetRules,
  UPDATE_WIDGET_IN_STATE
} from './actions';
import mapAssign from './assign';

export enum MachineStates {
  calculateGridDimensions = 'calculateGridDimensions',
  setWidgetsRules = 'setWidgetsRules',
  updateWidgetRules = 'updateWidgetRules',
  reconcileWidgets = 'reconcileWidgets',
  renderWidgetsInDom = 'renderWidgetsInDom',
  catchInvokeError = 'catchInvokeError',
  extendWidgetWithAddons = 'extendWidgetWithAddons',
  removeWidgetInCtx = 'removeWidgetInCtx'
}

export type WidgetsToRenderInCtx = {
  widgetsInDom: WidgetReference[];
  updateCycle: {
    render: WidgetToRender[] | null;
    update: WidgetToUpdate[] | null;
    remove: WidgetReference[] | null;
    widgetAddons: WidgetToRender[] | null;
  };
  positionsInUse: string[];
};

export type widgetsIdsToTrackInCtx = {
  forRender: string[] | null;
  forUpdate: string[] | null;
  forRemove: string[] | null;
};

export type WidgetsMachineCtx = {
  viewport: {
    width: number;
    height: number;
  };
  activeBreakpoint: string;
  widgetsIds: string[];
  widgetsIdsToTrack: widgetsIdsToTrackInCtx;
  widgets: { [key: string]: WidgetRules };
  positions: GridPositionsInViewport;
  rules: GridSettings;
  requireGlobalUpdate: boolean;
  requireHeightUpdate: boolean;
  renderCycle: WidgetsToRenderInCtx;
};

export const genericErrorHandler = (actions) => {
  target: MachineStates.catchInvokeError,
    // rejected promise data is on event.data property
    // we could send to sentry log
    actions;
};

// todo: find the correct type for a error handler in xstate
const handleInvokeError: any = genericErrorHandler(mapAssign.errorAction);

const widgetsMachine = (context: WidgetsMachineCtx) =>
  Machine({
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
      [REMOVE_WIDGET_IN_STATE]: {
        target: MachineStates.removeWidgetInCtx
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
              widgetsIds: mapAssign.setWidgetsRulesIds,
              widgets: mapAssign.setWidgetsRulesWidgets,
              widgetsIdsToTrack: mapAssign.setWidgetsRulesIdsToTrack
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
              widgets: mapAssign.updateWidgetRulesActions,
              renderCycle: mapAssign.updateWidgetRulesRenderCycle
            })
          },
          onError: handleInvokeError
        }
      },
      // Event generated to remove a widget that exit as a reference aka. rendered
      [MachineStates.removeWidgetInCtx]: {
        invoke: {
          src: removeWidgetInCtx,
          onDone: {
            target: MachineStates.renderWidgetsInDom,
            actions: assign({
              widgets: mapAssign.removeWidgetInCtxWidgets,
              renderCycle: mapAssign.removeWidgetInCtxRenderCycle
            })
          },
          onError: handleInvokeError
        }
      },
      // Event generate to update the rules of a valid and rendered widget,
      // ex => chat minimized (icon state) to maximize (conversation:id view)
      [MachineStates.extendWidgetWithAddons]: {
        invoke: {
          src: addAddonsToWidget,
          onDone: {
            target: MachineStates.renderWidgetsInDom,
            actions: assign({
              widgets: mapAssign.addAddonsToWidgetWidgets,
              renderCycle: mapAssign.addAddonsToWidgetRenderCycle
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
              viewport: mapAssign.calculateGridDimensionsViewport,
              activeBreakpoint:
                mapAssign.calculateGridDimensionsActiveBreakpoint,
              rules: mapAssign.calculateGridDimensionsRules,
              positions: mapAssign.calculateGridDimensionsPositions,
              requireGlobalUpdate:
                mapAssign.calculateGridDimensionsRequireGlobalUpdate,
              requireHeightUpdate:
                mapAssign.calculateGridDimensionsRequireHeightUpdate
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
              renderCycle: mapAssign.reconcileWidgetsRenderCycle
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
          }
        },
        invoke: {
          src: renderWidgetsInDom,
          onDone: {
            actions: assign({
              requireGlobalUpdate: false,
              widgetsIdsToTrack: mapAssign.renderWidgetsInDomWidgetsToTrack,
              renderCycle: mapAssign.renderWidgetsInDomRenderCycle
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
          }
        }
        // invoke: {
        // re-calc the grid dimensions and try to reconcile the state
        // src: () => Promise.resolve(true),
        // onDone: {
        //   target: MachineStates.reconcileWidgets
        // }
        // }
      }
    }
  });

export default widgetsMachine;
