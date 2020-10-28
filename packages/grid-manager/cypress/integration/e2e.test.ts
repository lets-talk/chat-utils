const { createModel } = require('@xstate/test');
import { screen } from '@testing-library/dom';

import { SET_VIEWPORT_SIZE, SET_WIDGETS_IN_STATE, UPDATE_WIDGET_IN_STATE } from "../../src/widgetsMachine/actions";
import widgetsMachine, { MachineStates } from '../../src/widgetsMachine/machine';

const testModel = createModel(widgetsMachine()).withEvents({
  UPDATE_WIDGET_IN_STATE: {
    exec: async (page) => {
      await page.click('input');
    },
    cases: [
      {
        width: 200,
        height: 400,
      },
    ]
  },
  SET_WIDGETS_IN_STATE: {
    exec: async (page) => {
      await page.click('input');
    },
    cases: [
      {
        widgets: [ { id: 1 }],
      },
    ]
  },
  SET_VIEWPORT_SIZE: () => {
    debugger;
    screen.findByTestId('close-button').then((element) => element.click());
  },
});

const testPlans = testModel.getSimplePathPlans();
testPlans.forEach((plan, i) => {
  describe(plan.description, () => {
    console.log('Plan description:', plan.description);
    plan.paths.forEach((path, i) => {
      it(path.description, () => {
        return cy.visit('/').then(() => {
          return path.test(cy);
        });
      });
    });
  });
});