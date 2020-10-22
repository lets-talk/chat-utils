import { WidgetRules, WidgetDimensionsList, GridPositionsInViewport, GridSettings } from "./types"
import { debounce } from "lodash"
import { interpret, Interpreter, StateMachine } from "xstate"
import widgetsMachine, { MachineStates, WidgetsMachineCtx } from './widgetsMachine/machine';
import { sendViewportDimensions, sendWidgetsIntoMachine, sendUpdateToWidget } from "./widgetsMachine/actions";

declare global {
  interface Window {
    grid: any;
    manager: any
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
  updateWidgetRules: (widget: WidgetRules) => Promise<TData>;
  updateWidgetDimensions: (id: string, dimensions: WidgetDimensionsList) => Promise<TData>;
  removeWidget: (id: string) => Promise<TData>;
}

export class GridManager implements GridManagerClass {
  interpreter: null | Interpreter<any>;
  machine: null | StateMachine<any,any, any>

  constructor(machine: StateMachine<any,any, any>){
    this.interpreter = null
    this.machine = machine
  }

  private _generateMachineInterpreter() {
    this.interpreter = interpret(this.machine)
      .onTransition((state, event) => {
        console.log(`in transition => event type: ${event.type}`, {state, event})
      }).onDone(state => {
        console.log(`reach final state`, {state})
      }).start()
    return this.interpreter
  }

  private _resizeEventCb() {
    this.interpreter.send(
      sendViewportDimensions(window.innerWidth, window.innerHeight)
    )
  }

  start() {
    const interpreter = this._generateMachineInterpreter()
    // if the interpreter is generated, we start the machine listener
    if(interpreter.initialized) {
      console.log('machine start :)')
      // Send machine to calculate grid dimensions from last viewport
      interpreter.send(
        sendViewportDimensions(window.innerWidth, window.innerHeight)
      )
      // Add event listener for the resize event
      window.addEventListener('resize',
        debounce(this._resizeEventCb.bind(this), 400)
      )
      // return the interpreter instance for consumer utility
      return interpreter
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
      return this.machine.context as StateData
    } catch(e) {
      return new Error(e)
    }
  }

  renderWidgets(widgets) {
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

  updateWidgetRules(widget) {
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

  updateWidgetDimensions(id, dimensions) {
    return Promise.resolve(true)
  }

  removeWidget(id) {
    return Promise.resolve(true)
  }
}

const machine = new GridManager(widgetsMachine)
const widgetService = machine.start()

console.log({widgetService})

window.manager = machine
