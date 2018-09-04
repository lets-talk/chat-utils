var jsdom = require("jsdom");
const dom = new jsdom.JSDOM();
global.document = dom.window.document;
global.window = dom.window;

Object.defineProperty(global.document, 'getElementById', {
  value: function(id) {
    if (id === 'mockElement') {
      return {
        getBoundingClientRect: () => ({ bottom: 99, left: 22, right: 0, top: 0 }),
      };
    }
    return null;
  },
  configurable: true,
});