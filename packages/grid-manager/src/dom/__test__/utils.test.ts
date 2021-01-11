import { frameParentRulesMock, frameParentRulesMockAlternativePath, getPositionRelativeToAppRulesMock, getPositionRelativeToViewportRulesMock, urlSourceParamsSpec } from '../../mocks/renderModule';
import * as utilsHelpers from '../utils';

const mockRemoveNodeRefMock: any = jest.spyOn(utilsHelpers, 'removeNodeRef');
const elementByIdMock: any = jest.spyOn(utilsHelpers, 'elementById');
const getElementDomPositionMock: any = jest.spyOn(utilsHelpers, 'getElementDomPosition');
const getElementPositionFixedMock: any = jest.spyOn(utilsHelpers, 'getElementPositionFixed');
const getElementPositionDefaultMock: any = jest.spyOn(utilsHelpers, 'getElementPositionDefault');
const getElementPositionMock: any = jest.spyOn(utilsHelpers, 'getElementPosition');
const resetNodeToAbsolutePositionMock: any = jest.spyOn(utilsHelpers, 'getElementPosition');
const generateParentContainerMock: any = jest.spyOn(utilsHelpers, 'generateParentContainer')
const getPositionRelativeToAppMock: any = jest.spyOn(utilsHelpers, 'getPositionRelativeToApp')
const getRelativePositionToAppMock: any = jest.spyOn(utilsHelpers, 'getRelativePositionToApp')
const getPositionRelativeToViewportMock: any = jest.spyOn(utilsHelpers, 'getPositionRelativeToViewport')
const getRelativePositionMock: any = jest.spyOn(utilsHelpers, 'getRelativePosition')
const generateUrlFromParamsMock: any = jest.spyOn(utilsHelpers, 'generateUrlFromParams')
const generateDomElementMock: any = jest.spyOn(utilsHelpers, 'generateDomElement')
const appendNodeToParentMock: any = jest.spyOn(utilsHelpers, 'appendNodeToParent')

// mock window obj
window = Object.assign(window, {
  innerWidth: 500,
  innerHeight: 500
});

describe('module: dom/utils', () => {
  beforeEach(() => {
    mockRemoveNodeRefMock.mockClear();
    elementByIdMock.mockClear();
    getElementDomPositionMock.mockClear();
    getElementPositionFixedMock.mockClear();
    generateParentContainerMock.mockClear();
    getPositionRelativeToAppMock.mockClear();
    getRelativePositionToAppMock.mockClear();
    getRelativePositionMock.mockClear();
    getPositionRelativeToViewportMock.mockClear();
  })

  describe('removeNodeRef method', () => {
    const el = document.createElement('div');
    it('should be called with with a HTMLElement', () => {
      mockRemoveNodeRefMock(el)
      expect(mockRemoveNodeRefMock).toBeCalled()
      expect(mockRemoveNodeRefMock).toHaveBeenCalledWith(el)
    })

    it('should be throw a error if the HTMLElement is not valid', () => {
      const result = mockRemoveNodeRefMock({
        remove: () => { throw new Error("error") }
      })
      expect(result).toStrictEqual(Error("error"))
    })
  })

  describe('elementById method', () => {
    it('should be called with with a HTMLElement', () => {
      const el = document.createElement('div');
      el.setAttribute('id', 'node');

      const mockDocument = {
        node: el,
        getElementById(id) {
          return el.id ? id : null
        }
      }

      try {
        const result = elementByIdMock('node', mockDocument)
        expect(elementByIdMock).toBeCalled()
        expect(elementByIdMock).toHaveBeenCalledWith('node', mockDocument)
      } catch (e) { }
    })

    it('should throw an error if the element it doesn`t exit ', async () => {
      const el = document.createElement('div');
      el.setAttribute('id', 'node');

      const mockDocument = {
        node: el,
        getElementById(id) {
          return this.node.id === id ? true : null
        }
      }

      try {
        elementByIdMock('otherId', mockDocument)
      } catch (e) {
        expect(e).toStrictEqual(Error('Can not find the dom element with id: otherId'))
      }
    })
  })

  describe('getElementDomPosition method', () => {
    let mockElementById;
    beforeEach(() => {
      const el = document.createElement('div');
      mockElementById = jest.fn((...args) => el)
      elementByIdMock.mockImplementationOnce(mockElementById)
    })

    it('it should be called with the correct elementId', () => {
      getElementDomPositionMock('someIds')
      expect(mockElementById).toHaveBeenCalledWith('someIds')
    })

    it('It should return the correct dimensions ', () => {
      const result = getElementDomPositionMock('someIds')
      expect(result).toEqual({ "bottom": 0, "height": 0, "left": 0, "right": 0, "top": 0, "width": 0 })
    })
  })

  describe('getElementPositionFixed method', () => {
    let mockElementById;
    beforeEach(() => {
      const el = document.createElement('div');
      mockElementById = jest.fn((...args) => el)
      elementByIdMock.mockImplementationOnce(mockElementById)
    })
    it('it should be called with the correct elementId and return the correct dimensions', () => {
      getElementPositionFixedMock('someIds')
      expect(mockElementById).toHaveBeenCalledWith('someIds')
    })

    it('It should return the correct dimensions ', () => {
      const result = getElementPositionFixedMock('someIds')
      expect(result).toEqual({ "bottom": 0, "height": 0, "left": 0, "right": 0, "top": 0, "width": 0 })
    })
  })

  describe('getElementPositionDefault method', () => {
    let mockElementById;
    beforeEach(() => {
      const el = document.createElement('div');
      mockElementById = jest.fn((...args) => el)
      elementByIdMock.mockImplementationOnce(mockElementById)
    })

    it('It should be called with the correct arguments', () => {
      getElementPositionDefaultMock('someIds', { scrollY: 100, scrollX: 100 })
      expect(mockElementById).toHaveBeenCalledWith('someIds')
    })

    it('It should return the correct dimensions ', () => {
      const result = getElementPositionDefaultMock('someIds', { scrollY: 100, scrollX: 100 })
      expect(result).toEqual({ "bottom": 0, "left": 100, "right": 0, "top": 100 })
    })
  })

  describe('getElementPosition method', () => {
    let mockElementById;
    beforeEach(() => {
      const el = document.createElement('div');
      mockElementById = jest.fn((...args) => el)
      elementByIdMock.mockImplementationOnce(mockElementById)
    })
    it('it should be called with the correct arguments', () => {
      getElementPositionMock('someId', 'default')
      expect(getElementPositionMock).toHaveBeenCalledWith('someId', 'default')
    })

    it('it should be called getElementPositionDefault', () => {
      getElementPositionMock('someId', 'default')
      expect(getElementPositionDefaultMock).toHaveBeenCalledWith('someId')
    })

    it('it should be called getElementPositionFixed', () => {
      getElementPositionMock('someId', 'fixed')
      expect(getElementPositionFixedMock).toHaveBeenCalledWith('someId')
    })
  })

  describe('serializeBorderRadius method', () => {
    it('should return a parsed border radius value', () => {
      const result = utilsHelpers.serializeBorderRadius(10, false)
      expect(result).toBe('10px')
    })

    it('should return a fallback case if value its not valid', () => {
      const result = utilsHelpers.serializeBorderRadius(null, false)
      expect(result).toBeFalsy()
    })

    it('should return a string literal if the css value is passed', () => {
      const result = utilsHelpers.serializeBorderRadius('10px 10px 10px 10px', false)
      expect(result).toBe('10px 10px 10px 10px')
    })
  })

  describe('resetNodeToAbsolutePosition method', () => {
    it('it should receive a dom element as argument', () => {
      const node = document.createElement('div');
      resetNodeToAbsolutePositionMock(node)
      expect(resetNodeToAbsolutePositionMock).toBeCalledWith(node)
    })

    it('it should reset the dom node', () => {
      const node = document.createElement('div');
      const result = utilsHelpers.resetNodeToAbsolutePosition(node)

      // update node value to reset values
      node.style.top = '0px'
      node.style.right = '0px'
      node.style.width = '100%'
      node.style.height = '100%'
      node.style.position = 'absolute'
      expect(result).toBe(node)
    })
  })

  describe('generateParentContainer method', () => {
    it('it should be called with the correct arguments', () => {
      generateParentContainerMock('someClass', frameParentRulesMock, null)
      expect(generateParentContainerMock).toBeCalledWith('someClass', frameParentRulesMock, null)
    })

    it('it should return a dom node with the passed rules', () => {
      const result = generateParentContainerMock('someClass',
        frameParentRulesMock, null)

      expect(result.style.position).toBe(frameParentRulesMock.display)
      expect(result.style.width).toBe(frameParentRulesMock.width)
      expect(result.style.height).toBe(frameParentRulesMock.height)
      expect(result.style.left).toBe(frameParentRulesMock.left)
      expect(result.style.top).toBe(frameParentRulesMock.top)
      // right and bottom where initialized as null in the mock
      expect(result.style.right).toBe('')
      expect(result.style.bottom).toBe('')
      expect(result.style.transition).toBe('none')
    })

    it('it should handle alternative paths', () => {
      const result = generateParentContainerMock('someClass',
        frameParentRulesMockAlternativePath, 'ease-out')
      expect(result.style.transition).toBe('ease-out')
    })
  })

  describe('getPositionRelativeToApp method', () => {
    it('should be called with the correct arguments', () => {
      getPositionRelativeToAppMock(getPositionRelativeToAppRulesMock)
      expect(getPositionRelativeToAppMock).toBeCalledWith(getPositionRelativeToAppRulesMock)
    })

    it('it should return a dom node with the passed rules', () => {
      const result = getPositionRelativeToAppMock(getPositionRelativeToAppRulesMock)

      expect(result).toMatchObject({
        bottom: '-115px',
        right: '-115px',
        position: 'absolute',
        width: '100px',
        height: '100px',
        border: '1px solid red',
        'z-index': '9999',
        'border-radius': '10px',
        'box-shadow': '0 -5px 10px rgba(0,0,0,.2)',
        'pointer-events': 'all'
      })
    })

    it('should handle fallbacks cases', () => {
      const fallbackMock = {
        ...getPositionRelativeToAppRulesMock,
        zIndex: false,
        elevation: false
      }

      const result = getPositionRelativeToAppMock(fallbackMock)
      expect(result['z-index']).toBe('inherit')
      expect(result['box-shadow']).toBe('none')
    })
  })

  describe('getRelativePositionToApp method', () => {
    it('it should be called with the correct number of arguments', () => {
      const size = {
        width: 100,
        height: 100,
      }
      const offset = {
        x: {
          relationType: 'RR',
          value: 15
        },
        y: {
          relationType: 'BB',
          value: 15
        }
      }
      getRelativePositionToAppMock(size, offset)
      expect(getRelativePositionToAppMock).toBeCalledWith(size, offset)
    })

    it('For x rr and y bb should be only that two values', () => {
      const size = {
        width: 20,
        height: 20,
      }
      const offset = {
        x: {
          relationType: 'RR',
          value: 15
        },
        y: {
          relationType: 'BB',
          value: 15
        }
      }

      const result = getRelativePositionToAppMock(size, offset as any)
      expect(result).toStrictEqual({ "bottom": -35, "left": null, "right": -35, "top": null })
    })

    it('For x ll and y tt should be only that two values', () => {
      const size = {
        width: 20,
        height: 20,
      }
      const offset = {
        x: {
          relationType: 'LL',
          value: 15
        },
        y: {
          relationType: 'TT',
          value: 15
        }
      }

      const result = getRelativePositionToAppMock(size, offset as any)
      expect(result).toStrictEqual({
        "top": -35,
        "right": null,
        "left": -35,
        "bottom": null
      })
    })

    it('For x LR and y TB should be only that two values', () => {
      const size = {
        width: 20,
        height: 20,
      }
      const offset = {
        x: {
          relationType: 'LR',
          value: 15
        },
        y: {
          relationType: 'TB',
          value: 15
        }
      }

      const result = getRelativePositionToAppMock(size, offset as any)
      expect(result).toStrictEqual({
        "top": -5,
        "right": null,
        "left": -5,
        "bottom": null
      })
    })

    it('For x RL and y BT should be only that two values', () => {
      const size = {
        width: 20,
        height: 20,
      }
      const offset = {
        x: {
          relationType: 'RL',
          value: 15
        },
        y: {
          relationType: 'BT',
          value: 15
        }
      }

      const result = getRelativePositionToAppMock(size, offset as any)
      expect(result).toStrictEqual({
        "top": null,
        "right": -5,
        "left": null,
        "bottom": -5
      })
    })

    it('Should handle default case', () => {
      const size = {
        width: 20,
        height: 20,
      }
      const offset = {
        x: {
          relationType: 'NULL',
          value: 15
        },
        y: {
          relationType: 'NULL',
          value: 15
        }
      }

      const result = getRelativePositionToAppMock(size, offset as any)
      expect(result).toStrictEqual({
        "top": null,
        "right": null,
        "left": null,
        "bottom": null
      })
    })
  })

  describe('getPositionRelativeToViewport method', () => {
    beforeAll(() => {
      getPositionRelativeToViewportMock.mockClear();
    })
    it('should be called with the correct arguments', () => {
      getPositionRelativeToViewportMock(getPositionRelativeToViewportRulesMock)
      expect(getPositionRelativeToViewportMock)
        .toBeCalledWith(getPositionRelativeToViewportRulesMock)
    })
    it('should return the correct css props', () => {
      const result = getPositionRelativeToViewportMock(getPositionRelativeToViewportRulesMock)
      expect(result).toStrictEqual({
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
      })
    })

    it('should handle fallback cases', () => {
      const fallbackMock = {
        ...getPositionRelativeToViewportRulesMock,
        fullSize: true,
        borderRadius: false,
        zIndex: false,
        animate: 'ease-out',
        elevation: false
      }
      const result = getPositionRelativeToViewportMock(fallbackMock)
      expect(result.width).toBe('500px')
      expect(result.height).toBe('500px')
      expect(result.top).toBe(0)
      expect(result.left).toBe(0)
      expect(result['border-radius']).toBe('none')
      expect(result.transition).toBe('ease-out')
    })
  })

  describe('getRelativePosition method', () => {
    it('it should be called with the correct number of arguments', () => {
      const rect = {
        left: 100,
        bottom: 100,
        right: 100,
        top: 100,
      }
      const offset = {
        x: {
          relationType: 'RR',
          value: 15
        },
        y: {
          relationType: 'BB',
          value: 15
        }
      }
      getRelativePositionMock(rect, offset)
      expect(getRelativePositionMock).toBeCalledWith(rect, offset)
    })

    it('For x rr and y bb should be only that two values', () => {
      const rect = {
        left: 0,
        top: 0,
        right: 20,
        bottom: 20
      }
      const offset = {
        x: {
          relationType: 'RR',
          value: 15
        },
        y: {
          relationType: 'BB',
          value: 15
        }
      }

      const result = getRelativePositionMock(rect, offset as any)
      expect(result).toStrictEqual({
        "bottom": 495,
        "left": null,
        "right": 495,
        "top": null
      })
    })

    it('For x ll and y tt should be only that two values', () => {
      const rect = {
        left: 20,
        top: 20,
        right: 0,
        bottom: 0
      }
      const offset = {
        x: {
          relationType: 'LL',
          value: 15
        },
        y: {
          relationType: 'TT',
          value: 15
        }
      }

      const result = getRelativePositionMock(rect, offset as any)
      expect(result).toStrictEqual({
        "top": 35,
        "right": null,
        "left": 35,
        "bottom": null
      })
    })


    it('For x lr and y tb should be only that two values', () => {
      const rect = {
        left: 20,
        top: 20,
        right: 0,
        bottom: 0
      }
      const offset = {
        x: {
          relationType: 'LR',
          value: 15
        },
        y: {
          relationType: 'TB',
          value: 15
        }
      }

      const result = getRelativePositionMock(rect, offset as any)
      expect(result).toStrictEqual({
        "top": 15,
        "right": null,
        "left": 15,
        "bottom": null
      })
    })
  })

  it('For x rl and y bt should be only that two values', () => {
    const rect = {
      left: 20,
      top: 20,
      right: 0,
      bottom: 0
    }
    const offset = {
      x: {
        relationType: 'RL',
        value: 15
      },
      y: {
        relationType: 'BT',
        value: 15
      }
    }

    const result = getRelativePositionMock(rect, offset as any)
    expect(result).toStrictEqual({
      "top": null,
      "right": 495,
      "left": null,
      "bottom": 495
    })
  })

  it('should handle default case', () => {
    const rect = {
      left: 20,
      top: 20,
      right: 0,
      bottom: 0
    }
    const offset = {
      x: {
        relationType: 'NULL',
        value: 15
      },
      y: {
        relationType: 'NULL',
        value: 15
      }
    }

    const result = getRelativePositionMock(rect, offset as any)
    expect(result).toStrictEqual({
      "top": null,
      "right": null,
      "left": null,
      "bottom": null
    })
  })

  describe('generateUrlFromParams method', () => {
    it('should be called with the correct arguments', () => {
      generateUrlFromParamsMock(urlSourceParamsSpec, 'slugKey')
      expect(generateUrlFromParamsMock).toBeCalledWith(urlSourceParamsSpec, 'slugKey')
    })

    // we need to mock URL class
    it.skip('it should return a correct parse url', () => {
      const result = generateUrlFromParamsMock(urlSourceParamsSpec)
      expect(result).toBe("http://localhost/?appName=bci&test=a")
    })
  })

  describe('generateDomElementMock method', () => {
    it('should call the correct arguments', () => {
      generateDomElementMock(
        'app', 'iframe',
        {
          width: '100px',
          height: '100px'
        }, {
        src: 'http://www.bci.cl',
        type: 'lt-basic-container-multimedia'
      })

      expect(generateDomElementMock).toBeCalledWith(
        'app', 'iframe',
        {
          width: '100px',
          height: '100px'
        }, {
        src: 'http://www.bci.cl',
        type: 'lt-basic-container-multimedia'
      })
    })
    it('should be a HTMLIFrameElement element', () => {
      const result = generateDomElementMock(
        'app', 'iframe',
        {
          width: '100px',
          height: '100px'
        }, {
        src: 'http://www.bci.cl',
        type: 'lt-basic-container-multimedia'
      })

      expect(result.tagName).toBe("IFRAME")
      expect(result.id).toBe("app")
      expect(result.src).toBe("http://www.bci.cl/")
      expect(result.className).toBe("")
      expect(result.style["width"]).toBe("100px")
      expect(result.style["height"]).toBe("100px")
    })
  })

  describe('appendNodeToParentMock method', () => {
    it('should be called with the correct arguments', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      appendNodeToParentMock(parent, children)
      expect(appendNodeToParentMock).toBeCalledWith(parent, children)
    })

    it('parent node should have a the children attached', () => {
      const parent = document.createElement('div')
      const children = document.createElement('div')
      appendNodeToParentMock(parent, children)
      expect(parent.childElementCount).toBe(1)
      expect(parent.children[0]).toBe(children)
    })
  })
})
