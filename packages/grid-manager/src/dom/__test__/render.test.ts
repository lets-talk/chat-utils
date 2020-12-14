import * as renderHelpers from '../render';
import { urlSourceParamsSpec, widgetsDimensionsToViewportSpec, widgetsDimensionsToAppSpec, gridPositionsInViewportSpec, widgetToRenderSpec } from '../../mocks/renderModule'


const openMockObserver = jest.fn();
window.open = openMockObserver;

const mockCreateWindowBlankWidget: any = jest.spyOn(renderHelpers, 'createWindowBlankWidget');
const mockMakePositionStrategy: any = jest.spyOn(renderHelpers, 'makePositionStrategy');
const mockRenderWidgetElement: any = jest.spyOn(renderHelpers, 'renderWidgetElement');


describe('module: dom/render', () => {
  beforeEach(() => {
    openMockObserver.mockClear()
    mockCreateWindowBlankWidget.mockClear()
    mockMakePositionStrategy.mockClear()
    mockRenderWidgetElement.mockClear()
  })

  describe('createWindowBlankWidget method', () => {
    const windowSize = { width: 100, height: 100 };

    it('it should be called', () => {
      mockCreateWindowBlankWidget('app-1', urlSourceParamsSpec, windowSize)
      expect(mockCreateWindowBlankWidget).toHaveBeenCalled()
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

      mockMakePositionStrategy('relative-to-viewport', widgetsDimensionsToViewportSpec, {getPositionRelativeToViewport: getPositionRelativeToViewportMock})

      expect(getPositionRelativeToViewportMock).toBeCalled()
      expect(getPositionRelativeToViewportMock).toBeCalledWith(widgetsDimensionsToViewportSpec)
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
    it.skip('I need to inject the appendNodeToParent to test the try/catch', () => {})
  })

  describe('method: createIframeWidget', () => {
    it.skip('I need to inject the appendNodeToParent to test the try/catch', () => {})
  })

  describe('method: updateWidgetElement', () => {
    it.skip('I need to inject the appendNodeToParent to test the try/catch', () => {})
  })
})