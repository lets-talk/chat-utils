import * as actions from '../actions';
import * as helpers from '../helpers';

// mock dependencies
const generateSortedListOfWidgetsSpy: any = jest.spyOn(helpers, 'generateSortedListOfWidgets')

// actions
const reconcileWidgetsSpy: any = jest.spyOn(actions, 'reconcileWidgets')

describe('reconcileWidgets state invoker', () => {
  beforeEach(() => {
    reconcileWidgetsSpy.mockClear();
    generateSortedListOfWidgetsSpy.mockClear()
  })
  it('should be called with the correct arguments', async () => {
    const context = {
      widgets: {},
      rules: {},
      activeBreakpoint: 'web',
      requireGlobalUpdate: false,
      widgetsIdsToTrack: { forRender: [] }
    }

    await reconcileWidgetsSpy(context)
    expect(actions.reconcileWidgets).toBeCalledWith(context)
  })

  describe('case: generateSortedListOfWidgets is empty then return a pristine', () => {
    it('should not call generateSortedListOfWidgets if model is empty', async () => {
      const context = {
        widgets: {},
        rules: {web: true},
        activeBreakpoint: 'web',
        requireGlobalUpdate: false,
        widgetsIdsToTrack: { forRender: [] }
      }

      reconcileWidgetsSpy(context)
      expect(generateSortedListOfWidgetsSpy).toBeCalledTimes(0)
    })
    it('should return a promise with a empty model', async () => {
      const context = {
        widgets: {},
        rules: {web: true},
        activeBreakpoint: 'web',
        requireGlobalUpdate: false,
        widgetsIdsToTrack: { forRender: [] }
      }

      const result = await reconcileWidgetsSpy(context)
      expect(result).toStrictEqual({
        slotsInUse: [],
        widgetsToRender: []
      })
    })
  })

  describe('case: generateSortedListOfWidgets should be called', () => {
    it('should call generateSortedListOfWidgets from requireGlobalUpdate', async () => {
      const context = {
        widgets: {1: {someData: true}},
        rules: {web: true},
        activeBreakpoint: 'web',
        requireGlobalUpdate: true,
        widgetsIdsToTrack: { forRender: [] }
      }

      await reconcileWidgetsSpy(context)
      expect(generateSortedListOfWidgetsSpy).toBeCalledWith(
        [{someData: true}],
        {web: true},
        'web'
      )
    })

    it('should call generateSortedListOfWidgets from forRender', async () => {
      const context = {
        widgets: {1: {someData: true}, 2: {someOtherData: true}},
        rules: {web: true},
        activeBreakpoint: 'web',
        requireGlobalUpdate: true,
        widgetsIdsToTrack: { forRender: [2] }
      }

      await reconcileWidgetsSpy(context)
      expect(generateSortedListOfWidgetsSpy).toBeCalledWith(
        [{someOtherData: true}],
        {web: true},
        'web'
      )
    })
  })

  describe('case: generateSortedListOfWidgets requireFullSize', () => {
    beforeEach(() => {
      generateSortedListOfWidgetsSpy.mockImplementationOnce((...args) => ({
        blank: [],
        iframe: [
          {id:1, dimensions: {fullSize: false}},
          {id:2, dimensions: {fullSize: true}}
        ],
        addons: [],
        usedPositions: ['bottom'],
        requireFullSize: true,
        isPristine: false
      }))
    })
    it('should return a promise with only one widget', async () => {
      const context = {
        widgets: {},
        rules: {web: true},
        activeBreakpoint: 'web',
        requireGlobalUpdate: true,
        widgetsIdsToTrack: { forRender: [] }
      }

      const result = await reconcileWidgetsSpy(context)
      expect(result).toStrictEqual({
        slotsInUse: ['bottom'],
        widgetsToRender: [{id:2, dimensions: {fullSize: true}}],
        addonsToRender: []
      })
    })
  })

  describe('case: generateSortedListOfWidgets return blank and iframe widgets', () => {
    beforeEach(() => {
      generateSortedListOfWidgetsSpy.mockImplementationOnce((...args) => ({
        blank: [{id:3}],
        iframe: [
          {id:1},
          {id:2}
        ],
        addons: [{id:4}],
        usedPositions: ['bottom', 'top'],
        requireFullSize: false,
        isPristine: false
      }))
    })
    it('should return a promise with the widgets merges in the same collection', async () => {
      const context = {
        widgets: {},
        rules: {web: true},
        activeBreakpoint: 'web',
        requireGlobalUpdate: true,
        widgetsIdsToTrack: { forRender: [] }
      }

      const result = await reconcileWidgetsSpy(context)
      expect(result).toStrictEqual({
        slotsInUse: ['bottom', 'top'],
        widgetsToRender: [{id:3}, {id:1}, {id:2}],
        addonsToRender: [{id:4}]
      })
    })
  })
})