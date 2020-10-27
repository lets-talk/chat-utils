import { flow } from "lodash"
import { ReferenceToGridPosition, relationTypeX, relationTypeY, WidgetRules } from "../types"

export const widgetsDimensionsMock = {
  fullSize: false,
  animate: true,
  elevation: 2,
  styles: null,
  size: {
    width: 360,
    height: 460
  },
  offset: {
    x: {
      relationType:'RR' as relationTypeX,
      value: 15
    },
    y: {
      relationType:'BB' as relationTypeY,
      value: 15
    }
  }
}

export const widgetsToRenderMock: WidgetRules[]  = [{
  id: 'app-1',
  extra: {
    slung: 'bci',
    params: null,
  },
  iframeType: 'lt-basic-container-multimedia',
  src: 'https://static-production-letstalk.s3-us-west-1.amazonaws.com/lt-internal-campaign/1.2.0/index.html',
  kind: 'iframe',
  position: {
    relation:'relative-to-viewport',
    reference: 'bottom-right' as ReferenceToGridPosition,
    element: null
  },
  dimensions: {
    web: {
      fullSize: false,
      animate: true,
      elevation: 2,
      styles: null,
      size: {
        width: 360,
        height: 460
      },
      offset: {
        x: {
          relationType:'RR' as relationTypeX,
          value: 15
        },
        y: {
          relationType:'BB' as relationTypeY,
          value: 15
        }
      }
    },
    tablet: null,
    mobile: null
  }
}]
