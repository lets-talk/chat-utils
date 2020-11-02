import { GridSettings, ReferenceToGridPosition, WidgetDimensions, WidgetRules, WidgetToRender } from "../types";

export const generateSortedListOfWidgets = (
  widgets: WidgetRules[],
  rules: GridSettings,
  breakpoint: string
) => {
  console.log({generateSortedListOfWidgets: widgets})
  return widgets.reduce((acc, widget: any) => {
    switch(widget.kind) {
      case 'iframe':
        const widgetToRender = validateIframeWidgetWithProps(
          acc.iframe,
          widget,
          rules.positions,
          breakpoint,
          acc.usedPositions
        );

        return {
          ...acc,
          iframe: widgetToRender.list,
          usedPositions: widgetToRender.position ?
            [...acc.usedPositions, widgetToRender.position] : acc.usedPositions,
          requireFullSize: widgetToRender.requireFullSize ?
            widgetToRender.requireFullSize : acc.requireFullSize
        };
      // I find a case here the blank case apply to any breakpoint?
      case 'blank':
        return {
          ...acc,
          blank: [
            ...acc.blank,
            mapWidgetToRenderProps(widget, widget.dimensions['web'])]
        };
      // div case is unsupported and default doesn't exit
      case 'div':
      default:
        return acc;
    }
  }, {
    blank: [],
    iframe: [],
    usedPositions: [],
    requireFullSize: false,
    isPristine: false
  })
}

export const validateIframeWidgetWithProps = (
  list: WidgetToRender[],
  widget: WidgetRules,
  positions: ReferenceToGridPosition[],
  breakpoint: string,
  usedPositions: ReferenceToGridPosition[]
) => {
  const returnWidgetsList = {
    list,
    position: null,
    requireFullSize: false
  }

  const dimensions = widget.dimensions[breakpoint];
  const widgetReference = breakpoint === 'mobile' ?
    widget.position.reference.split('-')[0] : widget.position.reference as any

  // if the widget don't need to be render return the prev list
  if(dimensions === null) return returnWidgetsList;
  // if the position doesn't exit for the active breakpoint return list
  if(
    widget.position.relation === 'relative-to-viewport' &&
    positions.indexOf(widgetReference) === -1
  ) {
    return returnWidgetsList
  }
  // if the position is duplicated return list
  if(usedPositions.indexOf(widgetReference) !== -1) {
    return returnWidgetsList
  }

  const isFullSize = dimensions.fullSize ? dimensions.fullSize : false;
  const widgetToRender = mapWidgetToRenderProps(
    widget, dimensions, dimensions.fullSize
  );

  // console.log({dimensions, positions, reference: widget.position.reference, widgetReference, indexOf: positions.indexOf(widgetReference) })
  // console.log({isFullSize, widgetToRender})

  return {
    list: [...list, {
      ...widgetToRender,
      position: {
        ...widgetToRender.position,
        reference: widgetReference
      }
    }],
    position: widgetReference,
    fullSize: isFullSize
  } as unknown as {
    list: WidgetToRender[];
    position: ReferenceToGridPosition | null;
    requireFullSize: boolean;
  }
}

export const mapWidgetToRenderProps = (
  widget: WidgetRules,
  dimensions: WidgetDimensions,
  fullSize = false,
  ): WidgetToRender => ({
    id: widget.id,
    isFullSize: fullSize,
    kind: widget.kind,
    url: {
      src: widget.src,
      extra: widget.extra
    },
    dimensions,
    iframeType: widget.iframeType,
    position: widget.position
})