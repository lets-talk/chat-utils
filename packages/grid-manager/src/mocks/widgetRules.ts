import { ReferenceToFloat, ReferenceToGridPosition, relationTypeX, relationTypeY, UpdateWidgetRules, WidgetRules } from "../types"

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

export const widgetAddonMock = {
  id: 'left-addon-app-2',
  extra: {
    slug: '',
  },
  iframeType: "lt-basic-container-multimedia",
  kind: "iframe",
  src: 'https://www.yofla.com/black-screen/',
  position: {
    relation: 'relative-to-app',
    display: 'absolute',
    reference: 'app-1'
  },
  dimensions: {
    web: {
      styles: null,
      elevation: 2,
      borderRadius: 3,
      size: {
        width: 75,
        height: 75
      },
      offset: {
        x: {
          relationType:'LL',
          value: 10
        },
        y: {
          relationType:'TT',
          value: 10
        }
      }
    },
    tablet: {
      styles: null,
      elevation: 2,
      borderRadius: 3,
      size: {
        width: 75,
        height: 75
      },
      offset: {
        x: {
          relationType:'RR',
          value: 15
        },
        y: {
          relationType:'TT',
          value: 15
        }
      }
    },
    mobile: null
  }
}

export const widgetAddonMock2 = {
  id: 'left-addon-app-1',
  extra: {
    slug: '',
  },
  iframeType: "lt-basic-container-multimedia",
  kind: "iframe",
  src: 'https://www.yofla.com/black-screen/',
  position: {
    relation: 'relative-to-app',
    display: 'absolute',
    reference: 'app-2'
  },
  dimensions: {
    web: {
      styles: null,
      elevation: 2,
      borderRadius: 3,
      size: {
        width: 50,
        height: 50
      },
      offset: {
        x: {
          relationType:'RR',
          value: 15
        },
        y: {
          relationType:'TB',
          value: 50
        }
      }
    },
    tablet: {
      styles: null,
      elevation: 2,
      borderRadius: 3,
      size: {
        width: 35,
        height: 35
      },
      offset: {
        x: {
          relationType:'LR',
          value: 35
        },
        y: {
          relationType:'BB',
          value: 10
        }
      }
    },
    mobile: null
  }
}

const widgetAddonMock3 = {
  id: 'left-addon-app-3',
  extra: {
    slug: '',
  },
  iframeType: "lt-basic-container-multimedia",
  kind: "iframe",
  src: 'https://www.yofla.com/black-screen/',
  position: {
    relation: 'relative-to-app',
    display: 'absolute',
    reference: 'app-1'
  },
  dimensions: {
    web: {
      styles: null,
      elevation: 2,
      borderRadius: 3,
      size: {
        width: 50,
        height: 50
      },
      offset: {
        x: {
          relationType:'RL',
          value: 49
        },
        y: {
          relationType:'TT',
          value: 15
        }
      }
    },
    tablet: null,
    mobile: null
  }
}

let updateRenderedWidgetMock = {
  id: 'app-1',
  kind: 'iframe',
  position: {
    relation:'relative-to-viewport',
    reference: {
      web: 'bottom-right',
      tablet: 'bottom-left',
      mobile: 'bottom',
    },
    element: null,
    display: 'fixed'
  },
  dimensions: {
    mobile: null,
    web: {
      fullSize: false,
      animate: true,
      elevation: 3,
      styles: null,
      borderRadius: 50,
      size: {
        width: 150,
        height: 150
      },
      offset: {
        x: {
          relationType:'RR',
          value: 20
        },
        y: {
          relationType:'BB',
          value: 20
        }
      }
    },
    tablet: {
      fullSize: false,
      animate: true,
      elevation: 3,
      styles: null,
      borderRadius: 50,
      size: {
        width: 100,
        height: 100
      },
      offset: {
        x: {
          relationType:'LL',
          value: 10
        },
        y: {
          relationType:'BB',
          value: 10
        }
      }
    }
  }
}

const widgetsToRenderMock  = [{
  id: 'app-1',
  extra: {
    slug: 'bci',
    params: null,
  },
  iframeType: 'lt-basic-container-multimedia',
  src: 'https://www.yofla.com/black-screen/',
  kind: 'iframe',
  addons: [widgetAddonMock],
  position: {
    relation:'relative-to-viewport',
    reference: {
      web: 'bottom-right',
      tablet: 'bottom-left',
      mobile: 'bottom',
    },
    element: null,
    display: 'fixed'
  },
  dimensions: {
    tablet: {
      zIndex: 9999,
      borderRadius: '10px 10px 0 0',
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
          relationType:'LL',
          value: 15
        },
        y: {
          relationType:'BB',
          value: 0
        }
      }
    },
    web: {
      fullSize: false,
      animate: true,
      elevation: 2,
      styles: null,
      borderRadius: '10px 10px 0 0',
      size: {
        width: 460,
        height: 560
      },
      offset: {
        x: {
          relationType:'RR',
          value: 15
        },
        y: {
          relationType:'BB',
          value: 0
        }
      }
    },
    mobile: {
      fullSize: true,
      animate: true,
      elevation: 2,
      styles: null,
      offset: {
        x: {
          relationType:'RR',
          value: 0
        },
        y: {
          relationType:'BB',
          value: 0
        }
      }
    }
  }
},
{
  id: 'app-2',
  extra: {
    slug: 'bci',
    params: null,
  },
  iframeType: 'lt-basic-container-multimedia',
  src: 'https://www.yofla.com/black-screen/',
  addons: [widgetAddonMock2],
  kind: 'iframe',
  position: {
    relation:'relative-to-viewport',
    reference: {
      web: 'top-left',
      tablet: 'top-left',
      mobile: 'top',
    },
    element: null,
    display: 'fixed'
  },
  dimensions: {
    tablet: {
      fullSize: false,
      animate: true,
      elevation: 'center',
      styles: null,
      borderRadius: 20,
      size: {
        width: 600,
        height: 140
      },
      offset: {
        x: {
          relationType:'LL',
          value: 15
        },
        y: {
          relationType:'TT',
          value: 15
        }
      }
    },
    web: {
      fullSize: false,
      animate: true,
      elevation: 'center',
      styles: null,
      borderRadius: 20,
      size: {
        width: 200,
        height: 600
      },
      offset: {
        x: {
          relationType:'LL',
          value: 15
        },
        y: {
          relationType:'TT',
          value: 15
        }
      }
    },
    mobile: null
  }
}]

const widgetsToRenderBlank =[{
  id: 'app-3',
  extra: {
    slug: 'bci',
    params: null,
  },
  iframeType: 'lt-basic-container-multimedia',
  src: 'https://static-production-letstalk.s3-us-west-1.amazonaws.com/lt-internal-campaign/1.2.0/index.html',
  kind: 'blank',
  position: null,
  dimensions: {
    web: {
      fullSize: false,
      animate: true,
      elevation: 2,
      styles: null,
      size: {
        width: 350,
        height: 430
      },
      offset: {
        x: {
          relationType:'RR',
          value: 15
        },
        y: {
          relationType:'BB',
          value: 15
        }
      }
    },
    tablet: null,
    mobile: null
  }
}]

export {
  updateRenderedWidgetMock,
  widgetsToRenderMock,
  widgetsToRenderBlank
}

function resizeNode() {
  var el =document.getElementById('lt-app-frame-app-1')
  el.style.setProperty('height', '700px')
  el.style.setProperty('width', '290px')
}
