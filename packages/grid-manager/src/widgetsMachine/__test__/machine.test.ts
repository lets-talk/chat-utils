import * as machine from '../machine'
import mapAssign  from '../assign'
import * as xstate from 'xstate';
import { breakpoints, getGridPositions, getRulesFromViewport, gridRules } from '../../grid/utils';
import { sendViewportDimensions } from '../actions';

const MachineSpy: any = jest.spyOn(xstate, 'Machine')
const errorActionSpy: any = jest.spyOn(mapAssign, 'errorAction')
const widgetMachineSpy: any  = jest.spyOn(machine, 'default')
const assignSpy: any = jest.spyOn(xstate, 'assign')
const consoleSpy: any = jest.spyOn(console, 'log')

const initialGridRules = getRulesFromViewport(
  gridRules,
  1024,
  breakpoints
);

const initialGridPositions = getGridPositions(
  {
    width: 1024,
    height: 768
  },
  {
    cols: initialGridRules.columns,
    rows: initialGridRules.rows
  },
  initialGridRules.positions
);

const initialState = {
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
      remove: [],
      widgetAddons: []
    }
  }
};


const machineInstance = widgetMachineSpy(initialState)
const interpret = xstate.interpret(machineInstance)

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
      errorActionSpy.mockClear();
      consoleSpy.mockClear();
      MachineSpy.mockClear();
      widgetMachineSpy.mockClear();
    })
    it('should be called with the correct number of arguments', () => {
      const context = {}
      const event = {
        data: {msg: 'error'}
      }

      errorActionSpy(context, event)
      expect(mapAssign.errorAction).toBeCalledWith(context, event)
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

  describe('assign', () => {
    beforeEach(() => {
      interpret.send(
        sendViewportDimensions(1024, 768)
      )
    })

    it('assign should be called', () => {
      expect(assignSpy).toBeCalled()
    })

    it('for each call should return and array of maps', () => {
      const firstAction = assignSpy.mock.calls[0]
      const getKeys = Object.keys(firstAction[0])

      expect(getKeys.length).toBe(3)
      expect(getKeys).toEqual([ 'widgetsIds', 'widgets', 'widgetsIdsToTrack' ])
    })
  })
})