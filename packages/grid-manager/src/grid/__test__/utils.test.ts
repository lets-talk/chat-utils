import { keys } from 'xstate/lib/utils';
import { gridRulesMock } from '../../mocks/gridModule';
import * as gridUtils from '../utils';

const getGridPositionsMock: any = jest.spyOn(gridUtils, 'getGridPositions')
const getRulesFromViewportMock: any = jest.spyOn(gridUtils, 'getRulesFromViewport')

describe('Grid utils module', () => {
  describe('We should respect the grid and breakpoints rules', () => {
    it('should be test that the render positions are defined', () => {
      expect(gridUtils.RELATIVE_RENDER_POSITION).toStrictEqual({
        toViewport: 'relative-to-viewport',
        toDomEl: 'relative-to-dom-element',
        toApp: 'relative-to-app',
        toCenter: 'relative-to-center'
      })
    })

    it('should be test that the grid breakpoints are defined', () => {
      expect(gridUtils.breakpoints).toStrictEqual({
        small: [0, 520],
        medium: [521, 1024],
        large: [1025, null]
      })
    })
  })

  describe('The grid rules would be defined for each viewport', () => {
    beforeEach(() => {
      getGridPositionsMock.mockClear();
    })

    it('small viewport should be defined', () => {
      expect(gridUtils.gridRules.small).toStrictEqual({
        label: 'mobile',
        columns: 1,
        rows: 3,
        positions: ['top', 'mid', 'bottom']
      } as any)
    })

    it('medium viewport should be defined', () => {
      expect(gridUtils.gridRules.medium).toStrictEqual({
        label: 'tablet',
        columns: 2,
        rows: 3,
        positions: [
          'top-left',
          'top-right',
          'mid-left',
          'mid-right',
          'bottom-left',
          'bottom-right'
        ]
      } as any)
    })

    it('large viewport should be defined', () => {
      expect(gridUtils.gridRules.large).toStrictEqual({
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
      } as any)
    })
  })

  describe('getGridPositions method', () => {
    it('should be called with the correct arguments', () => {
      const viewport = {width: 1024, heigh:768}
      const grid = {cols:3, rows: 3}
      const keys = [
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

      getGridPositionsMock(viewport, grid, keys)
      expect(gridUtils.getGridPositions).toBeCalledWith(viewport, grid, keys)
    })

    it('should return a valid layout from a viewport', () => {
      const viewport = {width: 1440, height:768}
      const grid = {cols:3, rows: 3}
      const keys = [
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

      const result = getGridPositionsMock(viewport, grid, keys)
      expect(result.availablePosition).toBe(9)
      expect(result.tileSize).toStrictEqual({"height": 256, "width": 480})
      expect(result.positions).toStrictEqual({"bottom-center": {"bottom": 768, "left": 480, "right": 960, "top": 512}, "bottom-left": {"bottom": 768, "left": 0, "right": 480, "top": 512}, "bottom-right": {"bottom": 768, "left": 960, "right": 1440, "top": 512}, "mid-center": {"bottom": 512, "left": 480, "right": 960, "top": 256}, "mid-left": {"bottom": 512, "left": 0, "right": 480, "top": 256}, "mid-right": {"bottom": 512, "left": 960, "right": 1440, "top": 256}, "top-center": {"bottom": 256, "left": 480, "right": 960, "top": 0}, "top-left": {"bottom": 256, "left": 0, "right": 480, "top": 0}, "top-right": {"bottom": 256, "left": 960, "right": 1440, "top": 0}})
    })

    it('should handle more than a viewport size', () => {
      const viewport = {width: 920, height:768}
      const grid = {cols:2, rows: 3}
      const keys = [
        'top-left',
        'top-right',
        'mid-left',
        'mid-right',
        'bottom-left',
        'bottom-right'
      ]

      const result = getGridPositionsMock(viewport, grid, keys)
      expect(result.availablePosition).toBe(6)
      expect(result.tileSize).toStrictEqual({"height": 256, "width": 460})
      expect(result.positions).toStrictEqual({"bottom-left": {"bottom": 768, "left": 0, "right": 460, "top": 512}, "bottom-right": {"bottom": 768, "left": 460, "right": 920, "top": 512}, "mid-left": {"bottom": 512, "left": 0, "right": 460, "top": 256}, "mid-right": {"bottom": 512, "left": 460, "right": 920, "top": 256}, "top-left": {"bottom": 256, "left": 0, "right": 460, "top": 0}, "top-right": {"bottom": 256, "left": 460, "right": 920, "top": 0}})
    })
  })

  describe('getRulesFromViewport method', () => {
    const breakpoints = {
      small: [0, 520],
      medium: [521, 1024],
      large: [1025, null]
    };
    it('should be called with the correct arguments', () => {
      const viewport = 1440
      getRulesFromViewportMock(gridRulesMock, viewport, breakpoints)
      expect(gridUtils.getRulesFromViewport).toBeCalledWith(gridRulesMock, viewport, breakpoints)
    })

    it('should return a small grid if the viewport is lower to 520', () => {
      const viewport = 480;
      const result = getRulesFromViewportMock(gridRulesMock, viewport, breakpoints)
      expect(result.label).toBe('mobile')
    })

    it('should return a medium grid if the viewport is lower to 520', () => {
      const viewport = 800;
      const result = getRulesFromViewportMock(gridRulesMock, viewport, breakpoints)
      expect(result.label).toBe('tablet')
    })

    it('should return a large grid if the viewport is lower to 520', () => {
      const viewport = 1440;
      const result = getRulesFromViewportMock(gridRulesMock, viewport, breakpoints)
      expect(result.label).toBe('web')
    })
  })
})