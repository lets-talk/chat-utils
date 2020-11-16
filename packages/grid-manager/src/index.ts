import { WidgetRules, WidgetDimensionsList, GridPositionsInViewport, GridSettings, ReferenceToGridPosition, relationTypeY, relationTypeX, UpdateWidgetRules, AddonRules } from "./types"
import debounce from "lodash/debounce"
import { interpret, Interpreter, StateMachine } from "xstate"
import widgetsMachine, { MachineStates, WidgetsMachineCtx } from './widgetsMachine/machine';
import { sendViewportDimensions, sendWidgetsIntoMachine, sendUpdateToWidget, extendWidgetWithAddons, removeWidget } from "./widgetsMachine/actions";
import { updateRenderedWidgetMock, widgetsToRenderMock } from "./mocks/widgetRules";
import { breakpoints, getGridPositions, getRulesFromViewport, gridRules } from "./grid/utils";

declare global {
  interface Window {
    grid: any;
    manager: any
    updateMock: any
  }
}

window.grid = true
window.manager = {}

type TData = Boolean | Error
type StateData = WidgetsMachineCtx

interface GridManagerClass {
  start: () => Interpreter<any> | Error;
  stop: () => TData;
  getState: () => StateData | Error;
  renderWidgets: (widgets: WidgetRules[]) => Promise<TData>;
  updateWidgetRules: (widget: UpdateWidgetRules) => Promise<TData>;
  removeWidget: (widgetId: string) => Promise<TData>;
  attachAddons: (widgetId: string, addons: AddonRules[]) => Promise<TData>
}

export class GridManager implements GridManagerClass {
  interpreter: null | Interpreter<any>;
  widgetMachine: null | StateMachine<any,any, any>

  constructor(
    machine: (state: WidgetsMachineCtx) => StateMachine<any,any, any>,
    state?: WidgetsMachineCtx
  ){
    this.interpreter = null
    this.widgetMachine = machine(state ? state : this._generateFirstState())
  }

  private _generateFirstState() {
    // generate initial viewport rules
    const initialGridRules: GridSettings = getRulesFromViewport(gridRules, window.innerWidth, breakpoints)
    // generate initial grid positions values

    const initialGridPositions: GridPositionsInViewport = getGridPositions({
      width: window.innerWidth,
      height: window.innerHeight
      }, {
        cols: initialGridRules.columns,
        rows: initialGridRules.rows
      }, initialGridRules.positions
    )

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
          remove: []
        }
      },
    }
  }

  private _generateMachineInterpreter() {
    this.interpreter = interpret(this.widgetMachine, {devTools: true})
      .onTransition((state, event) => {
        console.log(`in transition => event type: ${event.type}`, {state, event})
      }).onDone(state => {
        console.log(`reach final state`, {state})
      }).start()

    return this.interpreter.initialized ? this.interpreter.initialized : false
  }

  private _resizeEventCb() {
    console.log('viewport resize', {
      interpreter: this.interpreter,
      width: window.innerWidth
    })
    return this.interpreter.send(
      sendViewportDimensions(window.innerWidth, window.innerHeight)
    )
  }

  start() {
    const interpreter = this._generateMachineInterpreter()
    // if the interpreter is generated, we start the machine listener
    if(interpreter) {
      console.log('machine start :)')
      // Add event listener for the resize event
      window.addEventListener('resize',
        debounce(this._resizeEventCb.bind(this), 400)
      )
      // return the interpreter instance for consumer utility
      return this.interpreter
    } else {
      return new Error('machine doesn`t want to start :(')
    }
  }

  stop() {
    this.interpreter.stop()
    if(!this.interpreter.initialized) {
      window.removeEventListener('resize',
        debounce(this._resizeEventCb.bind(this), 400)
      )
      return true
    } else {
      return new Error('machine doesn`t want to stop :(')
    }
  }

  getState() {
    try {
      return this.widgetMachine.context as StateData
    } catch(e) {
      return new Error(e)
    }
  }

  renderWidgets(widgets:  WidgetRules[]) {
    try {
      this.interpreter.send(sendWidgetsIntoMachine(widgets))
      // we can improve this because tracking the onDone interpreter
      // this.interpreter.onDone(state => {
        // return Promise.resolve(true)
      // })
      return Promise.resolve(true)
    } catch(e) {
      return Promise.reject(new Error(e))
    }
  }

  updateWidgetRules(widget: UpdateWidgetRules) {
    try {
      this.interpreter.send(sendUpdateToWidget(widget))
      // we can improve this because tracking the onDone interpreter
      // this.interpreter.onDone(state => {
        // return Promise.resolve(true)
      // })
      return Promise.resolve(true)
    } catch(e) {
      return Promise.reject(new Error(e))
    }
  }

  attachAddons(widgetId: string, addons: AddonRules[]) {
    try {
      this.interpreter.send(extendWidgetWithAddons(widgetId, addons))
      // we can improve this because tracking the onDone interpreter
      // this.interpreter.onDone(state => {
        // return Promise.resolve(true)
      // })
      return Promise.resolve(true)
    } catch(e) {
      return Promise.reject(new Error(e))
    }
  }

  removeWidget(widgetId) {
    try {
      this.interpreter.send(removeWidget(widgetId))
      // we can improve this because tracking the onDone interpreter
      // this.interpreter.onDone(state => {
        // return Promise.resolve(true)
      // })
      return Promise.resolve(true)
    } catch(e) {
      return Promise.reject(new Error(e))
    }
  }
}

// create machine with initial state
const machine = new GridManager(widgetsMachine)
const widgetService = machine.start()
machine.renderWidgets(widgetsToRenderMock as any)
// machine.updateWidgetRules(updateRenderedWidgetMock as any)

window.manager = machine
window.updateMock = updateRenderedWidgetMock
