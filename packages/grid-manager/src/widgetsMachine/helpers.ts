import { RELATIVE_RENDER_POSITION } from '../grid/utils';
import {
  AddonRules,
  GridSettings,
  ReferencePosition,
  ReferenceToGridPosition,
  WidgetDimensions,
  WidgetReference,
  WidgetRelativePosition,
  WidgetRules,
  WidgetToRender,
  WidgetToUpdate,
  WidgetType
} from '../types';

export const generateSortedListOfWidgets = (
  widgets: WidgetRules[],
  rules: GridSettings,
  breakpoint: string
) => {
  return widgets.reduce(
    (acc, widget: any) => {
      switch (widget.kind) {
        case 'iframe':
          const widgetToRender = validateIframeWidgetWithProps(
            acc.iframe,
            acc.addons,
            widget,
            rules.positions,
            breakpoint,
            acc.usedPositions
          );

          return {
            ...acc,
            addons: widgetToRender.addons,
            iframe: widgetToRender.list,
            usedPositions: widgetToRender.position
              ? [...acc.usedPositions, widgetToRender.position]
              : acc.usedPositions,
            requireFullSize: widgetToRender.requireFullSize
              ? widgetToRender.requireFullSize
              : acc.requireFullSize
          };
        // I find a case here the blank case apply to any breakpoint?
        case 'blank':
          return widget.dimensions['web'] ? {
            ...acc,
            blank: [
              ...acc.blank,
              mapWidgetToRenderProps(widget, widget.dimensions['web'])
            ]
          } : acc
        // todo: div case is unsupported at the moment and should be return acc
        case 'div':
        default:
          return acc
      }
    },
    {
      blank: [],
      iframe: [],
      addons: [],
      usedPositions: [],
      requireFullSize: false,
      isPristine: false
    }
  );
};

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
        validPositions.indexOf(widgetReference) !== -1 &&
        positionsInUse.indexOf(widgetReference) === -1
      );
    // for this case we need to extend this method to take the list
    // of rendered references and search for the relation or
    // maybe search in all the logic widgets for the relation need discussions
    case RELATIVE_RENDER_POSITION.toDomEl:
    // return try { elementById('ref-element-id') } catch() { false }
    case RELATIVE_RENDER_POSITION.toCenter:
      // most simple case, always return true because position is center-center
      return false;
    default:
      throw Error('Invalid position type configuration review app settings');
  }
};

export const validateIframeWidgetWithProps = (
  widgetList: WidgetToRender[],
  addonsList: WidgetToRender[],
  widget: WidgetRules,
  positions: ReferenceToGridPosition[],
  breakpoint: string,
  usedPositions: ReferenceToGridPosition[]
) => {
  const returnWidgetsList = {
    list: widgetList,
    addons: addonsList,
    position: null,
    requireFullSize: false
  };

  const dimensions = widget.dimensions[breakpoint];
  const widgetReference = widget.position.reference[breakpoint];

  // if the widget don't need to be render return the prev list
  if (dimensions === null) {
    return returnWidgetsList;
  }

  if (
    !isValidatePositionReference(
      widget.position.relation,
      positions,
      usedPositions,
      widgetReference
    )
  ) {
    return returnWidgetsList;
  }

  // if the widget has addons to render try to create the list of widgets
  const addonsToRender =
    widget.addons && !!widget.addons.length
      ? widget.addons.reduce((acc, addon: AddonRules) => {
          const dimensions = addon.dimensions[breakpoint];
          // if the addon doesn't support the breakpoint or is not of
          // the kind relative-to-app return the previous list of addons
          if (!dimensions || addon.position.relation !== 'relative-to-app') {
            return acc;
          }
          // else map the widget and merge to the list
          return [...acc, mapWidgetToRenderProps(addon, dimensions, false)];
        }, [])
      : [];

  const isFullSize = dimensions.fullSize ? dimensions.fullSize : false;
  const widgetToRender = mapWidgetToRenderProps(
    widget,
    dimensions,
    dimensions.fullSize
  );

  return ({
    list: [
      ...widgetList,
      {
        ...widgetToRender,
        position: {
          ...widgetToRender.position,
          reference: widgetReference
        }
      }
    ],
    position: widgetReference,
    fullSize: isFullSize,
    addons: [...addonsList, ...addonsToRender]
  } as unknown) as {
    list: WidgetToRender[];
    position: ReferenceToGridPosition | null;
    requireFullSize: boolean;
    addons: WidgetToRender[];
  };
};

export const mapWidgetToRenderProps = (
  widget: WidgetRules | AddonRules,
  dimensions: WidgetDimensions,
  fullSize = false
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
});

export const getWidgetMapProps = (
  isPositionValid: boolean,
  widget: WidgetRules,
  ref: WidgetReference,
  update: {
    kind: WidgetType;
    dimension: WidgetDimensions;
    position: ReferencePosition;
  }
): WidgetReference | WidgetToUpdate => {
  if (!isPositionValid) {
    return ref;
  }

  const { position, dimension } = update;

  return {
    id: widget.id,
    isFullSize: !!dimension.fullSize,
    ref,
    position,
    dimension
  };
};
