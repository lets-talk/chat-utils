import { WidgetRules, WidgetDimensions, WidgetDimensionsList } from "./types"
import { debounce } from "lodash"

declare global {
  interface Window {
    grid: any;
    manager: any
  }
}

window.grid = true
window.manager = {}

console.log('adsf')

window.addEventListener('resize', debounce(() => {
  console.log('resize :)')
}, 200))

interface GridManagerClass {
  renderWidget: (widget: WidgetRules) => void;
  updateWidgetRules: (widget: WidgetRules) => void;
  updateWidgetDimensions: (id: string, dimensions: WidgetDimensionsList) => void;
  removeWidget: (id: string) => void;
}

export class GridManager implements GridManagerClass {
  renderWidget(widget) {}
  updateWidgetRules(widget) {}
  updateWidgetDimensions(id, dimensions) {}
  removeWidget(id) {}
}
