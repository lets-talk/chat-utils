import { mocked } from 'ts-jest/utils';
import * as Xstate from 'xstate'
import { GridManager } from '../index'

const startMock = jest.fn()
const stopMock = jest.fn()
const getStateMock = jest.fn()
const renderWidgetsMock = jest.fn()
const updateWidgetRulesMock = jest.fn()
const removeWidgetMock = jest.fn()
const attachAddonsToWidgetMock = jest.fn()

jest.mock('../index', () => {
  return {
    GridManager: jest.fn().mockImplementation(() => ({
      start: (...args) => startMock(...args),
      stop: stopMock,
      getState: getStateMock,
      renderWidgets: renderWidgetsMock,
      updateWidgetRules: updateWidgetRulesMock,
      removeWidget: removeWidgetMock,
      attachAddonsToWidget: attachAddonsToWidgetMock
    }))
  }
})

const MockedGridManager = mocked(GridManager, true);
const mockWidgetMachine = jest.fn()

const consoleSpy: any = jest.spyOn(console, 'log')
const interpretSpy: any = jest.spyOn(Xstate, 'interpret')

console.log(MockedGridManager)

describe('GridManagerClass module', () => {
  beforeEach(() => {
    MockedGridManager.mockClear();
    mockWidgetMachine.mockClear();
    consoleSpy.mockClear();
  })
  it('should be called with a state machine', () => {
    new GridManager(mockWidgetMachine)
    expect(MockedGridManager).toBeCalledTimes(1)
    expect(MockedGridManager).toBeCalledWith(mockWidgetMachine)
  })

  it('should use a custom state if class is create with one', () => {
    const customInitialState: any = {someState: true}
    const machine = new GridManager(mockWidgetMachine, customInitialState)
    machine.start()
    machine.start()
    expect(MockedGridManager).toBeCalledTimes(1)
    expect(startMock).toBeCalledTimes(2)
    expect(MockedGridManager).toBeCalledWith(mockWidgetMachine, customInitialState)
  })
})