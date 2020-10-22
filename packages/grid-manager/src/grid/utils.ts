import {
  GridSettings,
  GridBreakpoints,
  ReferenceToGridPosition,
  GridPositionsInViewport,
  TilePosition
 } from "../types"
import { reduce } from "lodash"

export const RELATIVE_RENDER_POSITION = {
  toViewport: 'relative-to-viewport',
  toDomEl: 'relative-to-dom-element',
  toApp: 'relative-to-app',
  toCenter: 'relative-to-center'
}

export const breakpoints: GridBreakpoints = {
  small: [0, 480],
  medium: [481, 1024],
  large: [1025, null]
}

export const gridRules: {[key in 'small' | 'medium'| 'large']: GridSettings} = {
  small: {
    label: 'small',
    columns: 1,
    rows: 1,
    positions: [
      'top',
      'mid',
      'bottom',
    ] as ReferenceToGridPosition[]
  },
  medium: {
    label: 'medium',
    columns: 2,
    rows: 2,
    positions: [
      'top-left',
      'top-right',
      'mid-left',
      'mid-right',
      'bottom-left',
      'bottom-right',
    ] as ReferenceToGridPosition[]
  },
  large: {
    label: 'large',
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
      'bottom-right',
    ] as ReferenceToGridPosition[]
  }
}

export const getGridPositions = (
  viewport: {height: number, width: number},
  grid: {cols:number, rows:number},
  keys: ReferenceToGridPosition[]
): GridPositionsInViewport=> {
  // calc tile size
  const tileSize = {
    width: Math.floor(viewport.width / grid.cols),
    height: Math.floor(viewport.height / grid.rows)
  }

  // calc the x and y position of all the tiles in the grid
  const positions = reduce(keys, (acc, key, i) => {
    const row: number = Math.trunc(i / grid.cols);
    const column:number = (i % grid.cols);
    return {
      ...acc,
      [key]: {
        left: column * tileSize.width,
        right: (column * tileSize.width) + tileSize.width,
        top: row * tileSize.height,
        bottom: (row * tileSize.height) + tileSize.height
      }
    }
  }, {}) as TilePosition

  return {
    tileSize,
    positions,
    availablePosition: keys.length,
    renderedWidgetsIds: []
  }
}

export const getRulesFromViewport = (
  rules: {[key in 'small' | 'medium'| 'large']: GridSettings},
  viewportWidth: number,
  breakpoints: GridBreakpoints
): GridSettings => {
  if (viewportWidth <= breakpoints.small[0]) {
    return rules.small
  } else if (
    viewportWidth > breakpoints.medium[0] &&
    viewportWidth <= breakpoints.medium[1]
  ) {
    return rules.medium
  } else {
    return rules.large
  }
}