import { RELATIVE_RENDER_POSITION } from "../grid/utils";
import { GridSettings, ReferencePosition, ReferenceToGridPosition, WidgetDimensions, WidgetReference, WidgetRelativePosition, WidgetRules, WidgetToRender, WidgetToUpdate, WidgetType } from "../types";

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

export const isValidatePositionReference = (
  relation: WidgetRelativePosition,
  validPositions: ReferenceToGridPosition[],
  positionsInUse: ReferenceToGridPosition[],
  widgetReference: ReferenceToGridPosition
): boolean => {
  switch (relation) {
    case RELATIVE_RENDER_POSITION.toViewport:
      // if the position doesn't exit for the active breakpoint
      // or if the position is duplicated
      return (
        validPositions.indexOf(widgetReference) !== -1 ||
        positionsInUse.indexOf(widgetReference) !== -1
      )
    // un supported cases at this moment need to be implemented and mapped
    case RELATIVE_RENDER_POSITION.toApp:
      // for this case we need to extend this method to take the list
      // of rendered references and search for the relation or
      // maybe search in all the logic widgets for the relation need discussions
    case RELATIVE_RENDER_POSITION.toDomEl:
      // return try { elementById('ref-element-id') } catch() { false }
    case RELATIVE_RENDER_POSITION.toCenter:
      // most simple case, always return true because position is center-center
      return false
    default:
      throw Error('Invalid position type configuration review app settings');
  }
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
  const widgetReference = widget.position.reference[breakpoint]

  // if the widget don't need to be render return the prev list
  if(dimensions === null) return returnWidgetsList;
  if(!isValidatePositionReference(
    widget.position.relation, positions, usedPositions, widgetReference
  )) return returnWidgetsList;

  const isFullSize = dimensions.fullSize ? dimensions.fullSize : false;
  const widgetToRender = mapWidgetToRenderProps(
    widget, dimensions, dimensions.fullSize
  );

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

export const getWidgetMapProps = (
  isPositionValid: boolean,
  widget: WidgetRules,
  ref: WidgetReference,
  update: {
    kind: WidgetType;
    dimension: WidgetDimensions
    position: ReferencePosition
  })
: WidgetReference | WidgetToUpdate => {
  if(!isPositionValid) { return ref };
  const {position, dimension} = update;

  return {
    id: widget.id,
    isFullSize: !!dimension.fullSize,
    ref,
    position,
    dimension
  }
}
