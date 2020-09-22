import { WidgetRules, WidgetDimensions } from "./types"

declare global {
  interface Window {
    grid: any;
    manager: any
  }
}

window.grid = true
window.manager = {}

interface GridManagerClass {
  renderWidget: (widget: WidgetRules) => void;
  updateWidgetRules: (widget: WidgetRules) => void;
  updateWidgetDimensions: (id: string, dimensions: WidgetDimensions) => void;
  removeWidget: (id: string) => void;
}

export class GridManager implements GridManagerClass {
  renderWidget(widget) {}
  updateWidgetRules(widget) {}
  updateWidgetDimensions(id, dimensions) {}
  removeWidget(id) {}
}
