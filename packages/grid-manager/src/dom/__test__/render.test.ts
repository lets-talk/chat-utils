import * as renderHelpers from '../render';
import * as utils from '../utils';
import { urlSourceParamsSpec, widgetsDimensionsToViewportSpec, widgetsDimensionsToAppSpec, gridPositionsInViewportSpec, widgetToRenderSpec, createIframeWidgetMock, appendWidgetAddonToRefMock, updateWidgetElementMock } from '../../mocks/renderModule'
import { ReferencePosition } from '../../types';

const openMockObserver = jest.fn();
window.open = openMockObserver;

const mockCreateWindowBlankWidget: any = jest.spyOn(renderHelpers, 'createWindowBlankWidget');
const mockMakePositionStrategy: any = jest.spyOn(renderHelpers, 'makePositionStrategy');
const mockRenderWidgetElement: any = jest.spyOn(renderHelpers, 'renderWidgetElement');
const createIframeWidgetSpy: any = jest.spyOn(renderHelpers, 'createIframeWidget')
const appendWidgetAddonToRefSpy: any = jest.spyOn(renderHelpers, 'appendWidgetAddonToRef')
const updateWidgetElementSpy: any = jest.spyOn(renderHelpers, 'updateWidgetElement')

// helpers
const generateUrlFromParamsSpy: any = jest.spyOn(utils, 'generateUrlFromParams')
const serializeBorderRadiusSpy: any = jest.spyOn(utils, 'serializeBorderRadius')
const generateDomElementSpy: any = jest.spyOn(utils, 'generateDomElement')
const resetNodeToAbsolutePositionSpy: any = jest.spyOn(utils, 'resetNodeToAbsolutePosition')
const appendNodeToParentSpy: any = jest.spyOn(utils, 'appendNodeToParent')
const elementByIdSpy: any = jest.spyOn(utils, 'elementById')
const consoleSpy: any = jest.spyOn(console, 'log')


describe('module: dom/render', () => {
  beforeEach(() => {
    openMockObserver.mockClear()
    mockCreateWindowBlankWidget.mockClear()
    mockMakePositionStrategy.mockClear()
    mockRenderWidgetElement.mockClear()
    createIframeWidgetSpy.mockClear()
    generateUrlFromParamsSpy.mockClear()
    serializeBorderRadiusSpy.mockClear()
    generateDomElementSpy.mockClear()
    resetNodeToAbsolutePositionSpy.mockClear()
    consoleSpy.mockClear()
    appendNodeToParentSpy.mockClear()
    appendWidgetAddonToRefSpy.mockClear()
    elementByIdSpy.mockClear()
  })

  describe('createWindowBlankWidget method', () => {
    const windowSize = { width: 100, height: 100 };

    it('it should be called', () => {
      mockCreateWindowBlankWidget('app-1', urlSourceParamsSpec, windowSize)
      expect(mockCreateWindowBlankWidget).toHaveBeenCalled()
    })


    it('it should throw a error is window open fail', () => {
      openMockObserver.mockImplementationOnce(() => {
        return new Error('method undefined')
      })
      try {
        mockCreateWindowBlankWidget('app-1', urlSourceParamsSpec, windowSize)
      } catch(e) {
        expect(mockCreateWindowBlankWidget).toThrowError()
        expect(mockCreateWindowBlankWidget).toBe('method undefined')
      }
    })

    it('it should be called with the default arguments', () => {
      mockCreateWindowBlankWidget('app-1', urlSourceParamsSpec, windowSize)
      expect(mockCreateWindowBlankWidget).toHaveBeenCalledWith(
        'app-1', urlSourceParamsSpec, windowSize
      )
    })

    it('it should be receive windowName and windowFeatures too', () => {
      mockCreateWindowBlankWidget('app-1', urlSourceParamsSpec, windowSize, 'windowName', 'windowFeatures')
      expect(mockCreateWindowBlankWidget).toHaveBeenCalledWith(
        'app-1',
        urlSourceParamsSpec,
        windowSize,
        'windowName',
        'windowFeatures'
      )
    })

    it('It should throw an error', async () => {
      mockCreateWindowBlankWidget.mockImplementationOnce(() => Error('fail'))
      try{
        mockCreateWindowBlankWidget('app-1', urlSourceParamsSpec, windowSize)
      } catch(e) {
        expect(mockCreateWindowBlankWidget).toReturnWith(Error('fail'))
      }
    })

    it('Window.open should receive the correct number of arg', () => {
      mockCreateWindowBlankWidget('app-1', urlSourceParamsSpec, windowSize, 'a', 'a=b', openMockObserver)

      expect(openMockObserver).toHaveBeenCalled()
      expect(openMockObserver).toHaveBeenCalledWith(
        "http://localhost/?appName=bci&test=a",
        "app-1-a",
        "width=100,height=100,a=b"
      )
    })

  })

  describe('makePositionStrategy method', () => {
    it('it should be called', () => {
      mockMakePositionStrategy('', {})
      expect(mockMakePositionStrategy).toHaveBeenCalled()
    })

    it('it should trow a error if type is not defined or valid', () => {
      const result = mockMakePositionStrategy('', {})
      expect(result).toBeInstanceOf(Error)
    })

    it('if the render case is not handle should return false', () => {
      const result = mockMakePositionStrategy('relative-to-center', {})
      expect(result).toBeFalsy()
    })


    it('if case is relative to viewport need to call getPositionRelativeToViewport', () => {
      const getPositionRelativeToViewportMock = jest.fn((data) => true)

      const result = mockMakePositionStrategy('relative-to-viewport', widgetsDimensionsToViewportSpec, {getPositionRelativeToViewport: getPositionRelativeToViewportMock})

      console.log(result)

      expect(getPositionRelativeToViewportMock).toBeCalled()
      expect(getPositionRelativeToViewportMock).toBeCalledWith(widgetsDimensionsToViewportSpec)
    })

    it('if case is relative to dom el should return false', () => {

      const result = mockMakePositionStrategy('relative-to-dom-element', widgetsDimensionsToViewportSpec, {getPositionRelativeToViewport: () => {}})
      expect(result).toBeFalsy()
    })
    it('if case is relative to viewport need to call getPositionRelativeToApp', () => {
      const getPositionRelativeToAppMock = jest.fn((data) => true)

      mockMakePositionStrategy('relative-to-app', widgetsDimensionsToViewportSpec, {getPositionRelativeToApp: getPositionRelativeToAppMock})

      expect(getPositionRelativeToAppMock).toBeCalled()
      expect(getPositionRelativeToAppMock).toBeCalledWith(widgetsDimensionsToAppSpec)
    })
  })

  describe('renderWidgetElement method', () => {
    it('it should be called', () => {
      mockRenderWidgetElement(
        widgetToRenderSpec,
        gridPositionsInViewportSpec,
      )
      expect(mockRenderWidgetElement).toHaveBeenCalled()
    })

    it('it should be called with the default arguments', () => {
      mockRenderWidgetElement(
        widgetToRenderSpec,
        gridPositionsInViewportSpec
      )
      expect(mockRenderWidgetElement).toHaveBeenCalledWith(widgetToRenderSpec, gridPositionsInViewportSpec)
    })

    it('it should throw a error if the case is div or default', () => {
      const result = mockRenderWidgetElement(
        {...widgetToRenderSpec, kind: 'unhandled'},
        gridPositionsInViewportSpec
      )
      expect(result).toStrictEqual(Error('Invalid WidgetType review app settings'))
    })

    it('it should be called createIframeWidget if the case is iframe', () => {
      const createIframeWidgetMock = jest.fn((...args) => true)
      const iframeCase = {...widgetToRenderSpec, kind: 'iframe'}
      mockRenderWidgetElement(
        iframeCase,
        gridPositionsInViewportSpec,
        {createIframeWidget: createIframeWidgetMock }
      )

      const {
        id,
        kind,
        url,
        dimensions,
        iframeType,
        position
      } = iframeCase;

      expect(createIframeWidgetMock).toBeCalled()
      expect(createIframeWidgetMock).toHaveBeenCalledWith(
        id,
        url,
        position,
        dimensions,
        iframeType,
        kind,
        gridPositionsInViewportSpec
      )
    })

    it('it should be called createWindowBlankWidget if the case is blank', () => {
      const createWindowBlankWidgetMock = jest.fn((...args) => true)
      const blankCase = {...widgetToRenderSpec, kind: 'blank'}
      mockRenderWidgetElement(
        blankCase,
        gridPositionsInViewportSpec,
        {createWindowBlankWidget: createWindowBlankWidgetMock }
      )

      const {
        id,
        url,
        dimensions,
      } = blankCase;

      expect(createWindowBlankWidgetMock).toBeCalled()
      expect(createWindowBlankWidgetMock).toHaveBeenCalledWith(
        id,
        url,
        dimensions.size
      )
    })
  })

  describe('method: appendWidgetAddonToRef', () => {
    beforeAll(() => {
      appendWidgetAddonToRefSpy.mockClear()
    })
    it('should be called with the correct arguments', () => {
      const {addonWidget, parentWidgetId, widgetRefs} = appendWidgetAddonToRefMock
      const el =  document.createElement('div');
      elementByIdSpy.mockImplementationOnce(() => el)

      renderHelpers.appendWidgetAddonToRef(
        addonWidget as any,
        parentWidgetId as any,
        widgetRefs as any
      )

      expect(appendWidgetAddonToRefSpy).toBeCalledWith(
        addonWidget, parentWidgetId, widgetRefs
      )
    })

    it('should throw and error if parentWrapperEl doesnt exit', () => {
      const {addonWidget, parentWidgetId, widgetRefs} = appendWidgetAddonToRefMock
      elementByIdSpy.mockImplementationOnce(() => false)

      try {
        appendWidgetAddonToRefSpy(
          addonWidget as any,
          parentWidgetId as any,
          widgetRefs as any
        )
      } catch(e) {
        expect(appendWidgetAddonToRefSpy).toThrowError()
        expect(e.message).toBe(`kind can't not be iframe or parent wrapped not found`)
      }
    })

    it('should throw and error if cant appendNodeToParent', () => {
      const {addonWidget, parentWidgetId, widgetRefs} = appendWidgetAddonToRefMock
      const el =  document.createElement('div');
      elementByIdSpy.mockImplementationOnce(() => el)
      appendNodeToParentSpy.mockImplementationOnce(() => {
        throw new Error('error')
      })

      try {
        appendWidgetAddonToRefSpy(
          addonWidget as any,
          parentWidgetId as any,
          widgetRefs as any
        )
      } catch(e) {
        expect(appendWidgetAddonToRefSpy).toThrowError()
        expect(e.message).toBe('Error: error')
      }
    })
  })

  describe('method: createIframeWidget', () => {
    beforeAll(() => {
      mockMakePositionStrategy.mockClear();
    })
    it('should be called with the correct arguments', () => {
      const {id, urlParams, position, dimensions, iframeType, kind, viewportPositions} = createIframeWidgetMock;

      renderHelpers.createIframeWidget(
        id,
        urlParams,
        position as any,
        dimensions as any,
        iframeType as any,
        kind as any,
        viewportPositions as any
      )

      expect(createIframeWidgetSpy).toBeCalledWith(
        id,
        urlParams,
        position as ReferencePosition,
        dimensions,
        iframeType,
        kind,
        viewportPositions
      )
  })

    it('should throw an error if framePosition cant be calculated', () => {
      const {id, urlParams, position, dimensions, iframeType, kind, viewportPositions} = createIframeWidgetMock;
      mockMakePositionStrategy.mockImplementationOnce(() => false)

      try {
        createIframeWidgetSpy(
          id,
          urlParams,
          position as ReferencePosition,
          dimensions,
          iframeType,
          kind,
          viewportPositions
        )
      } catch(e) {
        expect(createIframeWidgetSpy).toThrowError()
        expect(e.message).toBe('invalid position')
      }
    })

    it('should try to append the widget to the client dom', () => {
      const {id, urlParams, position, dimensions, iframeType, kind, viewportPositions} = createIframeWidgetMock;

      mockMakePositionStrategy.mockImplementationOnce(() => ({
        border: '1px solid red',
        bottom: '515px',
        right: '515px',
        position: 'fixed',
        width: '100px',
        height: '100px',
        'z-index': '9999',
        'border-radius': '10px',
        'box-shadow': '0 -5px 10px rgba(0,0,0,.2)',
        transition: 'none',
        'pointer-events': 'all'
      }))

      createIframeWidgetSpy(
        id,
        urlParams,
        position as ReferencePosition,
        dimensions,
        iframeType,
        kind,
        viewportPositions
      )


      // the real fn is test in utils test, we only need to check
      // that is been called
      const firstCall = appendNodeToParentSpy.mock.calls[0];
      // need to have two dom nodes
      expect(firstCall.length).toBe(2)
      // the wrapper div need to have the correct id
      expect(firstCall[0].id).toBe('lt-app__frame-test')
      // the iframe need to have the correct id
      expect(firstCall[1].id).toBe('lt-app__iframe-test')
      expect(appendNodeToParentSpy).toBeCalledTimes(4)
    })

    it('is positions is not fixed should only have one dom el', () => {
      const {id, urlParams, position, dimensions, iframeType, kind, viewportPositions} = createIframeWidgetMock;

      mockMakePositionStrategy.mockImplementationOnce(() => ({
        border: '1px solid red',
        bottom: '515px',
        right: '515px',
        position: 'fixed',
        width: '100px',
        height: '100px',
        'z-index': '9999',
        'border-radius': '10px',
        'box-shadow': '0 -5px 10px rgba(0,0,0,.2)',
        transition: 'none',
        'pointer-events': 'all'
      }))

      createIframeWidgetSpy(
        id,
        urlParams,
        { ...position, display: 'absolute' } as ReferencePosition,
        dimensions,
        iframeType,
        kind,
        viewportPositions
      )

      // the real fn is test in utils test, we only need to check
      // that is been called
      const firstCall = appendNodeToParentSpy.mock.calls[1];
      // the wrapper div need to have the correct id
      expect(firstCall[0].id).toBe('lt-app__container-test')
    })

    it('should throw an error appendNodeToParent is can be fulfilled', () => {
      const {id, urlParams, position, dimensions, iframeType, kind, viewportPositions} = createIframeWidgetMock;
      appendNodeToParentSpy.mockImplementationOnce(() => {
       throw new Error('parent node doest exit')
      })

      try {
        createIframeWidgetSpy(
          id,
          urlParams,
          position as ReferencePosition,
          dimensions,
          iframeType,
          kind,
          viewportPositions
        )
      } catch(e) {
        expect(createIframeWidgetSpy).toThrowError()
        expect(e.message).toBe('Error: parent node doest exit')
      }
    })
  })

  describe('method: updateWidgetElement', () => {
    beforeAll(() => {
      mockMakePositionStrategy.mockClear()
      mockMakePositionStrategy.mockClear()
    })
    it('should be called with the correct arguments', () => {
      const { widget, viewportPositions } = updateWidgetElementMock

      mockMakePositionStrategy.mockImplementationOnce(() => ({
        border: '1px solid red',
        bottom: '10px',
        right: '10px',
        position: 'fixed',
        width: '150px',
        height: '150px',
        'z-index': '9999',
        'border-radius': '10px',
        'box-shadow': '0 -5px 10px rgba(0,0,0,.2)',
        transition: 'none',
        'pointer-events': 'all'
      }))

      renderHelpers.updateWidgetElement({
        ...widget, position: {...widget.position, relation: 'invalid'}
      } as any, viewportPositions as any)
      expect(updateWidgetElementSpy).toBeCalledWith({
        ...widget, position: {...widget.position, relation: 'invalid'}
      } , viewportPositions)
    })

    it('should throw an error if framePosition is invalid', () => {
      const { widget, viewportPositions } = updateWidgetElementMock
      mockMakePositionStrategy.mockImplementationOnce(() => false)

      try {
        updateWidgetElementSpy(widget, viewportPositions)
      } catch(e) {
        expect(updateWidgetElementSpy).toThrowError()
        expect(e.message).toBe('invalid resizing or positions props')
      }
    })

    it('should throw and error if cant get dom element been requested', () => {
      const { widget, viewportPositions } = updateWidgetElementMock
      mockMakePositionStrategy.mockImplementationOnce(() => ({
        border: '1px solid red',
        bottom: '515px',
        right: '515px',
        position: 'fixed',
        width: '100px',
        height: '100px',
        'z-index': '9999',
        'border-radius': '10px',
        'box-shadow': '0 -5px 10px rgba(0,0,0,.2)',
        transition: 'none',
        'pointer-events': 'all'
      }))

      try {
        updateWidgetElementSpy(
          {
            ...widget,
            position: {
              relation: 'relative-to-viewport',
              reference: {
                web: 'bottom-right',
                tablet: 'bottom-left',
                mobile: 'bottom'
              },
              element: null,
              display: 'fixed'
            }
          },
          viewportPositions
        )
      } catch(e) {
        expect(updateWidgetElementSpy).toThrowError()
        expect(e.message).toBe(`Error: Can not find the dom element with id: iframe-class`)
      }
    })

    it('should try to update the iframe and parent dom nodes with the new props', () => {
      const { widget, viewportPositions } = updateWidgetElementMock
      const iframeEL =  document.createElement('div');
      const containerEl =  document.createElement('div');
      const parentEL =  document.createElement('div');

      iframeEL.id = 'iframe-class'
      containerEl.id = 'container-class'
      parentEL.id = 'parent-class'

      elementByIdSpy
        .mockImplementation((id) => {
          switch(id) {
            case 'iframe-class':
              return iframeEL
            case 'container-class':
              return containerEl
            case 'parent-class':
              return parentEL
          }
        })

      mockMakePositionStrategy.mockImplementationOnce(() => ({
        border: '1px solid red',
        bottom: '10px',
        right: '10px',
        position: 'fixed',
        width: '150px',
        height: '150px',
        'z-index': '9999',
        'border-radius': '10px',
        'box-shadow': '0 -5px 10px rgba(0,0,0,.2)',
        transition: 'none',
        'pointer-events': 'all'
      }))

      updateWidgetElementSpy({...widget}, viewportPositions)

      expect(parentEL.style.height).toBe('150px')
      expect(parentEL.style.width).toBe('150px')
      expect(parentEL.style.bottom).toBe('10px')
      expect(parentEL.style.right).toBe('10px')
    })

  })
})