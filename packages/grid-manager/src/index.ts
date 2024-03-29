import {
  WidgetRules,
  GridPositionsInViewport,
  GridSettings,
  UpdateWidgetRules,
  AddonRules
} from './types';
import debounce from 'lodash/debounce';
import { interpret, Interpreter, StateMachine } from 'xstate';
import widgetsMachine, { WidgetsMachineCtx } from './widgetsMachine/machine';
import {
  sendViewportDimensions,
  sendWidgetsIntoMachine,
  sendUpdateToWidget,
  removeWidget,
  extendParentWidgetWithAddons
} from './widgetsMachine/actions';
import {
  breakpoints,
  getGridPositions,
  getRulesFromViewport,
  gridRules
} from './grid/utils';

declare global {
  interface Window {
    manager: any;
  }
}
/* istanbul ignore next */
window.manager = {};

type TData = Boolean | Error;
type StateData = WidgetsMachineCtx;

interface GridManagerProps {
  start: () => Interpreter<any> | Error;
  stop: () => TData;
  getState: () => StateData;
  renderWidgets: (widgets: WidgetRules[]) => Promise<TData>;
  updateWidgetRules: (widget: UpdateWidgetRules) => Promise<TData>;
  removeWidget: (widgetId: string) => Promise<TData>;
  attachAddonsToWidget: (
    widgetId: string,
    addons: AddonRules[]
  ) => Promise<TData>;
}

class GridManager implements GridManagerProps {
  interpreter: null | Interpreter<any>;
  widgetMachine: null | StateMachine<any, any, any>;

  constructor(
    machine?: (state: WidgetsMachineCtx) => StateMachine<any, any, any>,
    state?: WidgetsMachineCtx
  ) {
    this.interpreter = null;
    this.widgetMachine = machine
      ? machine(state ? state : this._generateFirstState())
      : widgetsMachine(state ? state : this._generateFirstState());
  }

  private _generateFirstState() {
    // generate initial viewport rules
    const initialGridRules: GridSettings = getRulesFromViewport(
      gridRules,
      window.innerWidth,
      breakpoints
    );
    // generate initial grid positions values
    const initialGridPositions: GridPositionsInViewport = getGridPositions(
      {
        width: window.innerWidth,
        height: window.innerHeight
      },
      {
        cols: initialGridRules.columns,
        rows: initialGridRules.rows
      },
      initialGridRules.positions
    );

    return {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      activeBreakpoint: initialGridRules.label,
      widgetsIds: [],
      widgets: {},
      positions: initialGridPositions,
      rules: initialGridRules,
      requireGlobalUpdate: false,
      requireHeightUpdate: false,
      widgetsIdsToTrack: {
        forRender: [],
        forUpdate: [],
        forRemove: []
      },
      renderCycle: {
        widgetsInDom: [],
        positionsInUse: [],
        updateCycle: {
          update: [],
          render: [],
          remove: [],
          widgetAddons: []
        }
      }
    };
  }

  private _generateMachineInterpreter() {
    this.interpreter = interpret(this.widgetMachine, { devTools: true })
      .onTransition((state, event) => {
        // todo add log service
        console.log(`event type: ${event.type}`);
        console.log(`state state`, { state });
      })
      .onDone((state) => {
        // todo add log service
        console.log(`reach final state`, { state });
      })
      .start();

    return this.interpreter.initialized ? this.interpreter.initialized : false;
  }

  private _resizeEventCb() {
    return this.interpreter.send(
      sendViewportDimensions(window.innerWidth, window.innerHeight)
    );
  }

  start() {
    const interpreter = this._generateMachineInterpreter();
    // if the interpreter is generated, we start the machine listener
    if (interpreter) {
      // Add event listener for the resize event
      window.addEventListener(
        'resize',
        debounce(this._resizeEventCb.bind(this), 400)
      );
      // return the interpreter instance for consumer utility
      return this.interpreter;
    } else {
      return new Error('machine doesn`t want to start :(');
    }
  }

  stop() {
    this.interpreter.stop();
    if (!this.interpreter.initialized) {
      window.removeEventListener(
        'resize',
        debounce(this._resizeEventCb.bind(this), 400)
      );
      return true;
    } else {
      return new Error('machine doesn`t want to stop :(');
    }
  }

  getState() {
    return this.interpreter.state.context as StateData;
  }

  renderWidgets(widgets: WidgetRules[]) {
    try {
      this.interpreter.send(sendWidgetsIntoMachine(widgets));
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(new Error(e));
    }
  }

  updateWidgetRules(widget: UpdateWidgetRules) {
    try {
      this.interpreter.send(sendUpdateToWidget(widget));
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(new Error(e));
    }
  }

  attachAddonsToWidget(widgetId: string, widgetAddons: AddonRules[]) {
    try {
      this.interpreter.send(
        extendParentWidgetWithAddons(widgetId, widgetAddons)
      );
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(new Error(e));
    }
  }

  removeWidget(widgetId) {
    try {
      this.interpreter.send(removeWidget(widgetId));
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(new Error(e));
    }
  }
}

export { GridManager };
