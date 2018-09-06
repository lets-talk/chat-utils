var jsdom = require("jsdom");
const dom = new jsdom.JSDOM();
global.document = dom.window.document;
global.window = dom.window;

Object.defineProperty(global.document, 'getElementById', {
  value: function(id) {
    if (id === 'mockElement') {
      return {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 50, top: 200 }),
      };
    }
    return null;
  },
  configurable: true,
});
