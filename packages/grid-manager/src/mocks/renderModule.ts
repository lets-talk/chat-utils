export const urlSourceParamsSpec = {
  src: 'http://localhost/',
  extra: {
    slug: 'bci',
    params: {a: 'test'}
  }
}

export const widgetsDimensionsToViewportSpec = {
  rect: {left: 0, top: 0, right: 0, bottom: 0},
  size: {width: 0, height: 0},
  offset: {x: {}, y:{}},
  display: 'fixed',
  styles: null,
  elevation: 1,
  fullSize: false,
  animate: false,
  borderRadius: 5,
  zIndex: 9999
}

export const widgetsDimensionsToAppSpec = {
  rect: {left: 0, top: 0, right: 0, bottom: 0},
  size: {width: 0, height: 0},
  offset: {x: {}, y:{}},
  display: 'fixed',
  styles: null,
  elevation: 1,
  fullSize: false,
  animate: false,
  borderRadius: 5,
  zIndex: 9999
}

export const gridPositionsInViewportSpec = {
  tileSize: {
    width: 100,
    height: 100
  },
  positions: {
    top: {left: 0, top: 0, right: 0, bottom: 0},
    mid: {left: 0, top: 0, right: 0, bottom: 0},
    bottom: {left: 0, top: 0, right: 0, bottom: 0}
  },
  availablePosition: 3
};


const argsToReceive = {
  id: 'app-1',
  url: {
    src: 'http://localhost/',
    extra: {
      slug: 'bci',
      params: {a: 'test'}
    }
  },
  position: {
    relation: 'relative-to-viewport',
    reference: {
      web: 'bottom-right',
      tablet: 'bottom-left',
      mobile: 'bottom'
    },
    element: null,
    display: 'fixed'
  },
  dimensions: {
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
        relationType: 'RR',
        value: 15
      },
      y: {
        relationType: 'BB',
        value: 0
      }
    }
  }
}

export const widgetToRenderSpec = {
  id: 'app-1',
  isFullSize: false,
  url: urlSourceParamsSpec,
  iframeType: 'lt-basic-container-multimedia',
  kind: 'div',
  position: {
    relation: 'relative-to-center',
    reference: {
      web: 'bottom-right',
      tablet: 'bottom-left',
      mobile: 'bottom'
    },
    element: null,
    display: 'fixed'
  },
  dimensions: {
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
        relationType: 'RR',
        value: 15
      },
      y: {
        relationType: 'BB',
        value: 0
      }
    }
  }
}

export const frameParentRulesMock = {
  top: '100px',
  right: null,
  bottom: null,
  left: '100px',
  display: 'fixed',
  animate: false,
  height: '200px',
  width: '200px',
}

export const frameParentRulesMockAlternativePath = {
  top: null,
  display: 'fixed',
  right: null,
  bottom: null,
  left: null,
  animate: true,
  height: '200px',
  width: '200px',
}

export const getPositionRelativeToAppRulesMock = {
  addonSize: {
    height: 100,
    width: 100,
  },
  offset: {
    x: {
      relationType: 'RR' as any,
      value: 15
    },
    y: {
      relationType: 'BB' as any,
      value: 15
    }
  },
  styles: {
    border: '1px solid red'
  },
  display: 'fixed' as any,
  borderRadius: '10px',
  zIndex: 9999,
  elevation: 1
}

export const getPositionRelativeToViewportRulesMock = {
  rect: {
    top: 100,
    left: 100,
    bottom: 0,
    right: 0,
  },
  size: {
    height: 100,
    width: 100,
  },
  offset: {
    x: {
      relationType: 'RR' as any,
      value: 15
    },
    y: {
      relationType: 'BB' as any,
      value: 15
    }
  },
  styles: {
    border: '1px solid red'
  },
  fullSize: false,
  display: 'fixed' as any,
  borderRadius: 10,
  zIndex: 9999,
  elevation: 1,
  animate: false
}

export const createIframeWidgetMock = {
  id: 'test',
  urlParams: urlSourceParamsSpec,
  position: {
    relation: 'relative-to-viewport',
    reference: 'top',
    element: null,
    display: 'fixed'
  },
  dimensions: {
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
        relationType: 'RR',
        value: 15
      },
      y: {
        relationType: 'BB',
        value: 0
      }
    }
  },
  iframeType: 'lt-basic-container-multimedia',
  kind: 'iframe',
  viewportPositions: {
    tileSize: {
      width: 100,
      height: 100
    },
    positions: {
      top: {left: 0, top: 0, right: 0, bottom: 0},
      mid: {left: 0, top: 0, right: 0, bottom: 0},
      bottom: {left: 0, top: 0, right: 0, bottom: 0}
    },
    availablePosition: 3
  }
}

export const appendWidgetAddonToRefMock = {
  addonWidget: {
    ...widgetToRenderSpec,
    kind: 'iframe',
  },
  parentWidgetId: 'parent',
  widgetRefs: [{
    id: 'parent',
    iframe: 'iframe-class',
    container: 'container-class',
    parent: 'parent-class',
    ref: () => {}
  }]
}

export const updateWidgetElementMock = {
  widget: {
    ...widgetToRenderSpec,
    dimension: widgetToRenderSpec.dimensions
  },
  viewportPositions: {
    tileSize: {
      width: 100,
      height: 100
    },
    positions: {
      top: {left: 0, top: 0, right: 0, bottom: 0},
      mid: {left: 0, top: 0, right: 0, bottom: 0},
      bottom: {left: 0, top: 0, right: 0, bottom: 0}
    },
    availablePosition: 3
  }
}