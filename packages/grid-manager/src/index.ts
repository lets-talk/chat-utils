import { WidgetPosition, WidgetRules } from "./types"

declare global {
  interface Window {
    grid: any;
    manager: any
  }
}

window.grid = true
window.manager = {}

interface GridManager {
  renderWidget: (widget: WidgetRules) => void;
  updateWidgetPosition: (widget: WidgetRules) => void;
  resizeWidget: (id: string, dimensions: WidgetPosition) => void;
}

export class GridManager implements GridManager {
  render() {}
}
