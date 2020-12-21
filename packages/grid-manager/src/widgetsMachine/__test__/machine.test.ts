import * as machine from '../machine'
import * as xstate from 'xstate';

const MachineSpy: any  = jest.spyOn(xstate, 'Machine')
const widgetMachineSpy: any  = jest.spyOn(machine, 'default')
const consoleSpy: any = jest.spyOn(console, 'log')
const errorActionSpy: any = jest.spyOn(machine, 'errorAction')

describe('machine module', () => {
  describe('MachineStates enum', () => {
    it('should be equal to MachineStates enum', () => {
      expect(machine.MachineStates).toStrictEqual({
        calculateGridDimensions: 'calculateGridDimensions',
        setWidgetsRules: 'setWidgetsRules',
        updateWidgetRules: 'updateWidgetRules',
        reconcileWidgets: 'reconcileWidgets',
        renderWidgetsInDom: 'renderWidgetsInDom',
        catchInvokeError: 'catchInvokeError',
        extendWidgetWithAddons: 'extendWidgetWithAddons',
        removeWidgetInCtx: 'removeWidgetInCtx'
      } as any)
    })
  })

  describe('errorAction handler', () => {
    beforeEach(() => {
      errorActionSpy.mockClear()
      consoleSpy.mockClear()
      MachineSpy.mockClear()
      widgetMachineSpy.mockClear()
    })
    it('should be called with the correct number of arguments', () => {
      const context = {}
      const event = {
        data: {msg: 'error'}
      }

      errorActionSpy(context, event)
      expect(machine.errorAction).toBeCalledWith(context, event)
    })

    it('should log the correct error message', () => {
      const context = {}
      const event = {
        data: {msg: 'error'}
      }

      errorActionSpy(context, event)
      expect(consoleSpy).toBeCalledWith('error')
    })
  })

  describe('widgetsMachine factory', () => {
    it('should called Xstate machine', () => {
      const context = {}
      widgetMachineSpy(context)
      expect(machine.default).toBeCalledWith(context)
      expect(MachineSpy).toBeCalled()
    })

    it('should return a xstate machine instance', () => {
      const context = {
        id: 'widgetsMachine',
        initial: 'someState',
        context: {someCtx: true},
        on: {someKey: {target: 'someState'}},
        states: {someState: {}}
      }

      MachineSpy.mockImplementationOnce((...args) => args)
      const result = widgetMachineSpy(context)

      expect(result).toBeTruthy()
      expect(result.length).toBe(1)
      expect(result[0].context).toStrictEqual(context)
    })
  })

  describe.skip('assign fn', () => {
    it('should test setWidgetsRules assign', () => {})
    it('should test updateWidgetRules assign', () => {})
    it('should test removeWidgetInCtx assign', () => {})
    it('should test addAddonsToWidget assign', () => {})
    it('should test calculateGridDimensions assign', () => {})
    it('should test reconcileWidgets assign', () => {})
    it('should test renderWidgetsInDom assign', () => {})
  })
})