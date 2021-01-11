import * as actions from '../actions';
import * as helpers from '../helpers'
import * as utils from '../../grid/utils';
import { UpdateWidgetRules } from '../../types';

// mock dependencies
const getRulesFromViewportSpy: any = jest.spyOn(utils, 'getRulesFromViewport')
const getGridPositionsSpy: any = jest.spyOn(utils, 'getGridPositions')
const consoleSpy: any = jest.spyOn(console, 'log');
const mapWidgetToRenderPropsSpy: any = jest.spyOn(helpers, 'mapWidgetToRenderProps')

// actions
const updateWidgetRulesSpy: any = jest.spyOn(actions, 'updateWidgetRules')
const reconcileWidgetsSpy: any = jest.spyOn(actions, 'reconcileWidgets')
const calculateGridDimensionsSpy: any = jest.spyOn(actions, 'calculateGridDimensions')
const setWidgetsRulesSpy: any = jest.spyOn(actions, 'setWidgetsRules')
const removeWidgetInCtxSpy: any = jest.spyOn(actions, 'removeWidgetInCtx')
const addAddonsToWidgetSpy: any = jest.spyOn(actions, 'addAddonsToWidget')

describe('Actions machine module', () => {
  beforeEach(() => {
    calculateGridDimensionsSpy.mockClear();
    setWidgetsRulesSpy.mockClear();
    getRulesFromViewportSpy.mockClear();
    updateWidgetRulesSpy.mockClear();
    reconcileWidgetsSpy.mockClear();
    reconcileWidgetsSpy.mockClear();
    consoleSpy.mockClear();
  })

  describe('sendViewportDimensions action', () => {
    it('should return the correct action', () => {
      const result = actions.sendViewportDimensions(100, 100)
      expect(result).toStrictEqual({type: 'SET_VIEWPORT_SIZE', width:100, height:100})
    })
  })

  describe('sendWidgetsIntoMachine action', () => {
    it('should return the correct action', () => {
      const result = actions.sendWidgetsIntoMachine([])
      expect(result).toStrictEqual({type: 'SET_WIDGETS_IN_STATE', widgets:[]})
    })
  })

  describe('sendUpdateToWidget action', () => {
    it('should return the correct action', () => {
      const result = actions.sendUpdateToWidget({} as UpdateWidgetRules)
      expect(result).toStrictEqual({type:'UPDATE_WIDGET_IN_STATE', widget: {} as UpdateWidgetRules})
    })
  })


  describe('removeWidget action', () => {
    it('should return the correct action', () => {
      const result = actions.removeWidget('app-1')
      expect(result).toStrictEqual({type:'REMOVE_WIDGET_IN_STATE', widgetId:'app-1'})
    })
  })

  describe('extendParentWidgetWithAddons action', () => {
    it('should return the correct action', () => {
      const result = actions.extendParentWidgetWithAddons('app-1', [])
      expect(result).toStrictEqual({type: 'ADD_WIDGET_ADDON_IN_STATE', widgetId:'app-1', widgetAddons:[]})
    })
  })

  describe('calculateGridDimensions state invoker', () => {
    it('should be called with the correct arguments', () => {
      const context = {viewport: {width: 100, height: 100}, rules: {label: 'web'}}
      const event = {type: '', width: null, height: null }
      calculateGridDimensionsSpy(context, event)
      expect(actions.calculateGridDimensions).toBeCalledWith(context, event)
    })

    it('should be calculate in base to a event', async () => {
      const context: any = {viewport: {width: 1440, height: 768}, rules: {label: 'web'}}
      const event = {type: '', width: null, height: null }
      const result = await calculateGridDimensionsSpy(context, event)

      expect(result).toStrictEqual({
        viewport: { width: 1440, height: 768 },
        label: 'web',
        rules: {
          label: 'web',
          columns: 3,
          rows: 3,
          positions: [
            'top-left',
            'top-center',
            'top-right',
            'mid-left',
            'mid-center',
            'mid-right',
            'bottom-left',
            'bottom-center',
            'bottom-right'
          ]
        },
        positions: {
          tileSize: { width: 480, height: 256 },
          positions: {
            'top-left': { left: 0, right: 480, top: 0, bottom: 256 },
            'top-center': { left: 480, right: 960, top: 0, bottom: 256 },
            'top-right': { left: 960, right: 1440, top: 0, bottom: 256 },
            'mid-left': { left: 0, right: 480, top: 256, bottom: 512 },
            'mid-center': { left: 480, right: 960, top: 256, bottom: 512 },
            'mid-right': { left: 960, right: 1440, top: 256, bottom: 512 },
            'bottom-left': { left: 0, right: 480, top: 512, bottom: 768 },
            'bottom-center': { left: 480, right: 960, top: 512, bottom: 768 },
            'bottom-right': { left: 960, right: 1440, top: 512, bottom: 768 }
          },
          availablePosition: 9
        },
        requiredUpdate: false
      })
    })

    it('should be calculated in base to a resize event', async () => {
      const context: any = {viewport: {width: null, height: null}, rules: {label: 'web'}}
      const event = {type: 'SET_VIEWPORT_SIZE', width: 1440, height: 768 }
      const result = await calculateGridDimensionsSpy(context, event)

      expect(result).toStrictEqual( {
        viewport: { width: 1440, height: 768 },
        label: 'web',
        rules: {
          label: 'web',
          columns: 3,
          rows: 3,
          positions: [
            'top-left',
            'top-center',
            'top-right',
            'mid-left',
            'mid-center',
            'mid-right',
            'bottom-left',
            'bottom-center',
            'bottom-right'
          ]
        },
        positions: {
          tileSize: { width: 480, height: 256 },
          positions: {
            'top-left': { left: 0, right: 480, top: 0, bottom: 256 },
            'top-center': { left: 480, right: 960, top: 0, bottom: 256 },
            'top-right': { left: 960, right: 1440, top: 0, bottom: 256 },
            'mid-left': { left: 0, right: 480, top: 256, bottom: 512 },
            'mid-center': { left: 480, right: 960, top: 256, bottom: 512 },
            'mid-right': { left: 960, right: 1440, top: 256, bottom: 512 },
            'bottom-left': { left: 0, right: 480, top: 512, bottom: 768 },
            'bottom-center': { left: 480, right: 960, top: 512, bottom: 768 },
            'bottom-right': { left: 960, right: 1440, top: 512, bottom: 768 }
          },
          availablePosition: 9
        },
        requiredUpdate: false
      })
    })
    it('should throw a error if promise can`t be fulfilled', async () => {
      const context: any = {viewport: {width: null, height: null}, rules: {label: 'web'}}
      const event = {type: 'SET_VIEWPORT_SIZE', width: 1440, height: 768 }

      getRulesFromViewportSpy.mockImplementationOnce(() => ({
        columns: null,
        rows: null,
        positions: 0
      }))
      getGridPositionsSpy.mockImplementationOnce(() => null)

      try{
        calculateGridDimensionsSpy(context, event)
      } catch(e) {
        expect(e.message).toBe('invalid grid rules')
        expect(calculateGridDimensionsSpy).toThrowError()
      }
    })
  })

  describe('setWidgetsRules state invoker', () => {
    it('should be called with the correct arguments', () => {
      const context = {
        widgetsIds: [],
        widgets: {}
      }
      const event = {type: '', widgets:[{}] }
      setWidgetsRulesSpy(context, event)
      expect(actions.setWidgetsRules).toBeCalledWith(context, event)
    })

    it('should throw and error if widget actions is empty', async () => {
      const context = {
        widgetsIds: [],
        widgets: {}
      }
      const event = {type: '', widgets:[] }
      try {
        setWidgetsRulesSpy(context, event)
      } catch(e) {
        expect(e.message).toBe('widgets value can`t be empty')
        expect(setWidgetsRulesSpy).toThrowError()
      }
    })

    it('should log duplicated keys', async () => {
      const context = {
        widgetsIds: [1,2,3,4],
        widgets: {}
      }
      const event = {type: '', widgets:[{
        id: 2,
      }] }

      await setWidgetsRulesSpy(context, event)
      expect(consoleSpy).toHaveBeenCalledWith('Trying to duplicate widget in model ids: 1,2,3,4,2')
    })

    it('should return a valid widget model', async () => {
      const context = {
        widgetsIds: [1],
        widgets: {}
      }
      const event = {type: '', widgets:[{
        id: 2,
      }]}

      const result = await setWidgetsRulesSpy(context, event)
      expect(result).toStrictEqual({ ids: [ 1, 2 ], widgets: { '2': { id: 2 } }, forRender: [ 2 ] })
    })
  })

  describe('updateWidgetRules state invoker', () => {
    it('it should be called with the correct arguments', async () => {
      const context = {
        activeBreakpoint: 'web',
        renderCycle: { widgetsInDom:[{id: 1}] },
        widgets:{1:{}}
      }
      const event = {
        type:'',
        widget:{
          id:1,
          dimensions:{web:{}},
          position:{reference:{web:''}},
          kind:{}
        }
      }

      await updateWidgetRulesSpy(context, event)
      expect(actions.updateWidgetRules).toBeCalledWith(context, event)
    })

    it('should throw and error if widget to update is not defined', async () => {
      const context = {
        activeBreakpoint: 'web',
        renderCycle: { widgetsInDom:[{id: 2}] },
        widgets:{2:{}}
      }
      const event = {
        type:'',
        widget:{
          id:1,
          dimensions:{web:{}},
          position:{reference:{web:''}},
          kind:{}
        }
      }

      try{
        updateWidgetRulesSpy(context, event)
      } catch(e) {
        expect(e.message).toBe('invalid widget id to update')
        expect(updateWidgetRulesSpy).toThrowError()
      }
    })
    it('should return require a dom update if the update is valid', async () => {
      const context = {
        activeBreakpoint: 'web',
        renderCycle: { widgetsInDom:[{id: 1}] },
        widgets:{1:{}}
      }
      const event = {
        type:'',
        widget:{
          id:1,
          dimensions:{web:{}},
          position:{reference:{web:''}},
          kind:{}
        }
      }

      const result = await updateWidgetRulesSpy(context, event)
      expect(result.requireUpdate).toBeTruthy()
      expect(result.requireRemove).toBeFalsy()
    })

    it('should remove the widget if the update is invalid', async () => {
      const context = {
        activeBreakpoint: 'table',
        renderCycle: { widgetsInDom:[{id: 1}] },
        widgets:{1:{}}
      }
      const event = {
        type:'',
        widget:{
          id:1,
          dimensions:{table: null},
          position:{reference:{web:''}},
          kind:{}
        }
      }

      const result = await updateWidgetRulesSpy(context, event)
      expect(result.requireRemove).toBeTruthy()
      expect(result.requireUpdate).toBeFalsy()
    })
  })

  describe('removeWidgetInCtx state invoker', () => {
    it('should be called with the correct arguments', async () => {
      const context = {
        widgets: {},
        renderCycle: {
          widgetsInDom: [{id: 'app-1'}]
        }
      }
      const event = {
        type: '',
        widgetId: 'app-1'
      }

      await removeWidgetInCtxSpy(context, event)
      expect(actions.removeWidgetInCtx).toBeCalledWith(context, event)
    })
    it('should throw and error if the widget doesnt exit', async () => {
      const context = {
        widgets: {},
        renderCycle: {
          widgetsInDom: [{id: 'app-2'}]
        }
      }
      const event = {
        type: '',
        widgetId: 'app-1'
      }

      try {
        removeWidgetInCtxSpy(context, event)
      } catch(e) {
        expect(removeWidgetInCtxSpy).toThrowError()
        expect(e.message).toBe(`widget trying to be remove doesn't exit in model`)
      }
    })

    it('Should return a new updated model to the widget machine', async () => {
      const context = {
        widgets: {
          ['app-1']: {id: 'app-1', addons: []},
          ['app-2']: {id: 'app-2', addons: []}
        },
        renderCycle: {
          widgetsInDom: [{id: 'app-1'}, {id: 'app-2'}]
        }
      }
      const event = {
        type: '',
        widgetId: 'app-1'
      }

      const result = await removeWidgetInCtxSpy(context, event)
      expect(result).toStrictEqual({
        widgets: { 'app-2': { id: 'app-2', addons: [] } },
        remove: [ { id: 'app-1' } ]
      })
    })
  })

  describe('addAddonsToWidget state invoker', () => {
    it('should be called with the correct arguments', async () => {
      const context = {
        widgets: {
          ['app-1']: {
            id: 'app-1',
            addons: [],
            dimensions: {web: true}
          },
        },
        widgetsIds: ['app-1'],
        activeBreakpoint: 'web'
      }
      const event = {
        type: '',
        widgetId: 'app-1',
        widgetAddons: [{
          id: 'addon-1',
          dimensions: {web: true},
          position: {
            relation: 'relative-to-app'
          }
        }]
      }

      await addAddonsToWidgetSpy(context, event)
      expect(actions.addAddonsToWidget).toBeCalledWith(context, event)
    })

    it('should throw an error if the parent widget doesnt exit', async () => {
      const context = {
        widgets: {
          ['app-1']: {
            id: 'app-1',
            addons: [],
            dimensions: {web: true}
          },
        },
        widgetsIds: ['app-1'],
        activeBreakpoint: 'web'
      }
      const event = {
        type: '',
        widgetId: 'app-2',
        widgetAddons: [{
          id: 'addon-1',
          dimensions: {web: true},
          position: {
            relation: 'relative-to-app'
          }
        }]
      }

      try {
        addAddonsToWidgetSpy(context, event)
      } catch(e) {
        expect(addAddonsToWidgetSpy).toThrowError()
        expect(e.message).toBe(`Widget doesn't exit in context model`)
      }
    })

    it('should return only the updated model if breakpoint is disable', async () => {
      const context = {
        widgets: {
          ['app-1']: {
            id: 'app-1',
            addons: [],
            dimensions: {tablet: true}
          },
        },
        widgetsIds: ['app-1'],
        activeBreakpoint: 'tablet'
      }
      const event = {
        type: '',
        widgetId: 'app-1',
        widgetAddons: [{
          id: 'addon-1',
          dimensions: {tablet: null},
          position: {
            relation: 'relative-to-app'
          }
        }]
      }

      const result = await addAddonsToWidgetSpy(context, event)
      expect(result).toStrictEqual({
        widget: {
          id: 'app-1',
          dimensions: { tablet: true },
          addons: [{
            id: 'addon-1',
            dimensions: {tablet: null},
            position: {
              relation: 'relative-to-app'
            }
          }]
        },
        addons: []
      })
    })

    it('should return the updated model and the addon to render if breakpoint exit', async () => {
      const context = {
        widgets: {
          ['app-1']: {
            id: 'app-1',
            addons: [],
            dimensions: {tablet: true}
          },
        },
        widgetsIds: ['app-1'],
        activeBreakpoint: 'tablet'
      }
      const event = {
        type: '',
        widgetId: 'app-1',
        widgetAddons: [{
          id: 'addon-1',
          dimensions: {tablet: true},
          position: {
            relation: 'relative-to-app'
          }
        }]
      }

      mapWidgetToRenderPropsSpy.mockImplementationOnce(() => ({
        id: 'addon-1',
          dimensions: {tablet: true},
          position: {
            relation: 'relative-to-app'
          }
      }))

      const result = await addAddonsToWidgetSpy(context, event)
      expect(result).toStrictEqual({
        widget: {
          id: 'app-1',
          dimensions: { tablet: true },
          addons: [{
            id: 'addon-1',
            dimensions: {tablet: true},
            position: {
              relation: 'relative-to-app'
            }
          }]
        },
        addons: [{
          id: 'addon-1',
          dimensions: {tablet: true},
          position: {
            relation: 'relative-to-app'
          }
        }]
      })
    })
  })
})
