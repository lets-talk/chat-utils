import { ReferenceToFloat, ReferenceToGridPosition, relationTypeX, relationTypeY, WidgetRules } from "../types"

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
  src: 'https://www.yofla.com/black-screen/',
  kind: 'iframe',
  position: {
    relation:'relative-to-viewport',
    reference: 'bottom-right' as ReferenceToGridPosition,
    element: null,
    display: 'fixed' as ReferenceToFloat
  },
  dimensions: {
    tablet: {
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
    web: null,
    mobile: null
  }
},
{
  id: 'app-2',
  extra: {
    slung: 'bci',
    params: null,
  },
  iframeType: 'lt-basic-container-multimedia',
  src: 'https://www.yofla.com/black-screen/',
  kind: 'iframe',
  position: {
    relation:'relative-to-viewport',
    reference: 'top-left' as ReferenceToGridPosition,
    element: null,
    display: 'fixed' as ReferenceToFloat
  },
  dimensions: {
    tablet: {
      fullSize: false,
      animate: true,
      elevation: 2,
      styles: null,
      size: {
        width: 100,
        height: 100
      },
      offset: {
        x: {
          relationType:'LL' as relationTypeX,
          value: 15
        },
        y: {
          relationType:'TT' as relationTypeY,
          value: 15
        }
      }
    },
    web: null,
    mobile: null
  }
}
// },{
//   id: 'app-3',
//   extra: {
//     slung: 'bci',
//     params: null,
//   },
//   iframeType: 'lt-basic-container-multimedia',
//   src: 'https://static-production-letstalk.s3-us-west-1.amazonaws.com/lt-internal-campaign/1.2.0/index.html',
//   kind: 'blank',
//   position: null,
//   dimensions: {
//     web: {
//       fullSize: false,
//       animate: true,
//       elevation: 2,
//       styles: null,
//       size: {
//         width: 350,
//         height: 430
//       },
//       offset: {
//         x: {
//           relationType:'RR' as relationTypeX,
//           value: 15
//         },
//         y: {
//           relationType:'BB' as relationTypeY,
//           value: 15
//         }
//       }
//     },
//     tablet: null,
//     mobile: null
//   }
// }
]
