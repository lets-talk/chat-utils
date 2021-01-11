import * as actions from '../actions';
import * as domRender from '../../dom/render';
import * as domUtils from '../../dom/utils';

// mock dependencies
const removeNodeRefSpy: any = jest.spyOn(domUtils, 'removeNodeRef')
const updateWidgetElementSpy: any = jest.spyOn(domRender, 'updateWidgetElement'
)
const renderWidgetElementSpy: any = jest.spyOn(domRender, 'renderWidgetElement')
const appendWidgetAddonToRefSpy: any = jest.spyOn(domRender, 'appendWidgetAddonToRef')

// actions
const renderWidgetsInDomSpy: any = jest.spyOn(actions, 'renderWidgetsInDom')

describe('renderWidgetsInDom state invoker', () => {
  beforeEach(() => {
    removeNodeRefSpy.mockClear()
    updateWidgetElementSpy.mockClear()
    renderWidgetElementSpy.mockClear()
    appendWidgetAddonToRefSpy.mockClear()
    renderWidgetsInDomSpy.mockClear()
  })
  it('should be called with the correct arguments', async () => {
    const renderCycle = {
      widgetsInDom: null,
      updateCycle: {
        render: [],
        update: [],
        remove: [],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {}
    }

    await renderWidgetsInDomSpy(context)
    expect(actions.renderWidgetsInDom).toBeCalledWith(context)
  })

  it('should remove all the widgets if requireGlobalUpdate is true', async () => {
    const renderCycle = {
      widgetsInDom: [
        {ref: true}, {ref: true}
      ],
      updateCycle: {
        render: [],
        update: [],
        remove: [],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: true,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {}
    }

    await renderWidgetsInDomSpy(context)
    expect(removeNodeRefSpy).toBeCalledTimes(2)
    expect(removeNodeRefSpy.mock.calls[0]).toEqual([true])
  })

  it('should only remove the widgets from the updateCycle.remove list', async () => {
    const renderCycle = {
      widgetsInDom: [
        {id: 1}, {id: 2}
      ],
      updateCycle: {
        render: [],
        update: [],
        remove: [{id: 2, ref: true}],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {}
    }

    await renderWidgetsInDomSpy(context)
    expect(removeNodeRefSpy).toBeCalledTimes(1)
    expect(removeNodeRefSpy).toBeCalledWith(true)
  })

  it('should only update the widgets from the updateCycle.update list', async () => {
    const renderCycle = {
      widgetsInDom: [],
      updateCycle: {
        render: [],
        update: [{id: 2, ref: true}],
        remove: [],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {},
      positions: 'context.position'
    }

    updateWidgetElementSpy.mockImplementationOnce(() => null)

    await renderWidgetsInDomSpy(context)
    expect(updateWidgetElementSpy).toBeCalledTimes(1)
    expect(updateWidgetElementSpy).toBeCalledWith({id: 2, ref: true}, 'context.position')
  })
})

describe('renderWidgetsInDom state invoker', () => {
  beforeEach(() => {
    removeNodeRefSpy.mockClear()
    updateWidgetElementSpy.mockClear()
    renderWidgetElementSpy.mockClear()
    appendWidgetAddonToRefSpy.mockClear()
    renderWidgetsInDomSpy.mockClear()
  })
  it('should be called with the correct arguments', async () => {
    const renderCycle = {
      widgetsInDom: null,
      updateCycle: {
        render: [],
        update: [],
        remove: [],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {}
    }

    await renderWidgetsInDomSpy(context)
    expect(actions.renderWidgetsInDom).toBeCalledWith(context)
  })

  it('should remove all the widgets if requireGlobalUpdate is true', async () => {
    const renderCycle = {
      widgetsInDom: [
        {ref: true}, {ref: true}
      ],
      updateCycle: {
        render: [],
        update: [],
        remove: [],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: true,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {}
    }

    await renderWidgetsInDomSpy(context)
    expect(removeNodeRefSpy).toBeCalledTimes(2)
    expect(removeNodeRefSpy.mock.calls[0]).toEqual([true])
  })

  it('should only remove the widgets from the updateCycle.remove list', async () => {
    const renderCycle = {
      widgetsInDom: [
        {id: 1}, {id: 2}
      ],
      updateCycle: {
        render: [],
        update: [],
        remove: [{id: 2, ref: true}],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {}
    }

    await renderWidgetsInDomSpy(context)
    expect(removeNodeRefSpy).toBeCalledTimes(1)
    expect(removeNodeRefSpy).toBeCalledWith(true)
  })

  it('should only update the widgets from the updateCycle.update list', async () => {
    const renderCycle = {
      widgetsInDom: [],
      updateCycle: {
        render: [],
        update: [{id: 2, ref: true}],
        remove: [],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {},
      positions: 'context.position'
    }

    updateWidgetElementSpy.mockImplementationOnce(() => null)

    await renderWidgetsInDomSpy(context)
    expect(updateWidgetElementSpy).toBeCalledTimes(1)
    expect(updateWidgetElementSpy).toBeCalledWith({id: 2, ref: true}, 'context.position')
  })

  it('should only render the widgets from the updateCycle.update list', async () => {
    const renderCycle = {
      widgetsInDom: [],
      updateCycle: {
        render: [{id: 1}, {id: 2}],
        update: [],
        remove: [],
        widgetAddons: [],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: [],
      widgets: {},
      positions: 'context.position'
    }

    renderWidgetElementSpy.mockImplementationOnce(() => [])

    await renderWidgetsInDomSpy(context)
    expect(renderWidgetElementSpy).toBeCalledTimes(2)
    expect(renderWidgetElementSpy.mock.calls[0]).toEqual([
      {id: 1}, 'context.position'
    ])
  })

  it('updateCycle.widgetAddons should check that the parent widget exit if not throw and error', async () => {
    const renderCycle = {
      widgetsInDom: [],
      updateCycle: {
        render: [],
        update: [],
        remove: [],
        widgetAddons: [{id: 1, position: {reference: 'app-1'}}],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: ['app-2'],
      widgets: {},
      positions: 'context.position'
    }

    try {
      await renderWidgetsInDomSpy(context)
    } catch(e) {
      expect(renderWidgetsInDomSpy).toThrowError()
      expect(e.message).toBe(`reference widget doesn't exit in machine model`)
    }
  })

  it('should only append to widget from updateCycle.widgetAddons list', async () => {
    const renderCycle = {
      widgetsInDom: [],
      updateCycle: {
        render: [],
        update: [],
        remove: [],
        widgetAddons: [{id: 2, position: {reference: 'app-1'}}],
      },
      positionsInUse: []
    }

    const context = {
      requireGlobalUpdate: false,
      renderCycle: renderCycle,
      widgetsIds: ['app-1'],
      widgets: {['app-1']: {id: 'app-1'}},
      positions: 'context.position'
    }

    // renderWidgetElementSpy.mockImplementationOnce(() => null)
    appendWidgetAddonToRefSpy.mockImplementationOnce(() => jest.fn(() => null))
    await renderWidgetsInDomSpy(context)

    expect(appendWidgetAddonToRefSpy).toBeCalledTimes(1)
    expect(appendWidgetAddonToRefSpy).toBeCalledWith(
      {id: 2, position: {reference: 'app-1'}},
      'app-1',
      []
    )
  })

  it.skip('Should return a new updated model to the widget machine', () => {})
})