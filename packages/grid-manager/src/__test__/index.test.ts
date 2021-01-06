// const GridManager: any = require('../index')
import GridManager from '../index'
jest.mock('../index')

declare global {
  interface GridManager {
    [key: string]: any
  }
}

// mock window obj
window = Object.assign(window, {
  innerWidth: 1024,
  innerHeight: 768,
});

const sendUpdateToWidgetMock = jest.fn()
const mockWidgetMachine = jest.fn()
const GridManagerClass: any = GridManager
const consoleSpy: any = jest.spyOn(console, 'log')
const removeEventListenerSpy: any = jest.spyOn(window, 'removeEventListener')
const addEventListenerSpy: any = jest.spyOn(window, 'addEventListener')

describe('GridManagerClass module', () => {
  beforeEach(() => {
    GridManagerClass.mockClear();
    consoleSpy.mockClear();
    mockWidgetMachine.mockClear();
    removeEventListenerSpy.mockClear();
    addEventListenerSpy.mockClear();
    sendUpdateToWidgetMock.mockClear();
  })
  it('should be called with a state machine', () => {
    new GridManagerClass(mockWidgetMachine)
    expect(GridManagerClass).toBeCalledTimes(1)
    expect(GridManagerClass).toBeCalledWith(mockWidgetMachine)
  })

  it('should use a custom state if class is create with one', () => {
    const customInitialState: any = {someState: true}
    const machine = new GridManagerClass(mockWidgetMachine, customInitialState)
    machine.start()
    expect(GridManagerClass).toBeCalledTimes(1)
    expect(GridManagerClass).toBeCalledWith(mockWidgetMachine, customInitialState)
  })

  it('should throw and error if interpreter cant be created', () => {
    GridManagerClass.prototype._generateMachineInterpreter =
      jest.fn(() => false)
    const machine = new GridManagerClass(() => {})

    try {
      machine.start(jest.fn())
    } catch(e) {
      expect(machine).toThrowError()
      expect(e.message).toBe('machine doesn`t want to start :(')
    }
  })

  it('should start the grid manager and create listener', () => {
    const cbMock = jest.fn()
    GridManagerClass.prototype.start = jest.fn(() => {
      window.addEventListener('resize', cbMock)
      return true
    })

    const machine = new GridManagerClass(mockWidgetMachine)
    const result = machine.start()

    expect(machine.start).toBeCalledTimes(1)
    expect(result).toBeTruthy()
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', cbMock)
  })

  it('should stop the machine and remove listener', () => {
    const stopInterpreterMock = jest.fn((args) => true)
    GridManagerClass.prototype.interpreter = {
      initialized: false,
      stop: (...args) => stopInterpreterMock(args)
    }

    const cbMock = jest.fn()
    GridManagerClass.prototype.stop = jest.fn(() => {
      GridManagerClass.prototype.interpreter.stop()
      window.removeEventListener('resize', cbMock)
      return true
    })

    const machine = new GridManagerClass(() => {})

    machine.start()
    const result = machine.stop()

    expect(machine.start).toBeCalled()
    expect(machine.stop).toBeCalledTimes(1)

    expect(result).toBeTruthy()

    expect(stopInterpreterMock).toBeCalled()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', cbMock)
  })

  it('should return the state of the machine', () => {
    GridManagerClass.prototype.widgetMachine = {
      context: {someState: true}
    }

    GridManagerClass.prototype.getState = jest.fn(() => {
      return GridManagerClass.prototype.widgetMachine.context
    })

    const machine = new GridManagerClass(() => {})
    const state = machine.getState()

    expect(machine.getState).toBeCalledTimes(1)
    expect(state).toStrictEqual({someState: true})
  })

  it('renderWidgets should emit a event send to the machine', () => {
    GridManagerClass.prototype.interpreter = jest.fn()
    GridManagerClass.prototype.renderWidgets = jest.fn((...args) => {
      GridManagerClass.prototype.interpreter(sendUpdateToWidgetMock(args[0]))
    })

    const machine = new GridManagerClass(() => {})
    machine.renderWidgets({id: 1, someWidgetProps: true})

    expect(machine.renderWidgets).toBeCalledTimes(1)
    expect(sendUpdateToWidgetMock).toBeCalledWith(
      {id: 1, someWidgetProps: true}
    )
  })

  it('updateWidgetRules should emit a event send to the machine', () => {
    GridManagerClass.prototype.interpreter = jest.fn()
    GridManagerClass.prototype.updateWidgetRules = jest.fn((...args) => {
      GridManagerClass.prototype.interpreter(sendUpdateToWidgetMock(args[0]))
    })

    const machine = new GridManagerClass(() => {})
    machine.updateWidgetRules({id: 1, someWidgetProps: true})

    expect(machine.updateWidgetRules).toBeCalledTimes(1)
    expect(sendUpdateToWidgetMock).toBeCalledWith(
      {id: 1, someWidgetProps: true}
    )
  })

  it('attachAddonsToWidget should emit a event send to the machine', () => {
    GridManagerClass.prototype.interpreter = jest.fn()
    GridManagerClass.prototype.attachAddonsToWidget = jest.fn((...args) => {
      GridManagerClass.prototype.interpreter(sendUpdateToWidgetMock(...args))
    })

    const machine = new GridManagerClass(() => {})
    machine.attachAddonsToWidget(1, [{id: 2, widgetToAppendProps: true}])

    expect(machine.attachAddonsToWidget).toBeCalledTimes(1)
    expect(sendUpdateToWidgetMock).toBeCalledWith(
      1, [{id: 2, widgetToAppendProps: true}]
    )
  })

  it('removeWidget should emit a event send to the machine', () => {
    GridManagerClass.prototype.interpreter = jest.fn()
    GridManagerClass.prototype.removeWidget = jest.fn((...args) => {
      GridManagerClass.prototype.interpreter(sendUpdateToWidgetMock(...args))
    })

    const machine = new GridManagerClass(() => {})
    machine.removeWidget(1)

    expect(machine.removeWidget).toBeCalledTimes(1)
    expect(sendUpdateToWidgetMock).toBeCalledWith(1)
  })
})