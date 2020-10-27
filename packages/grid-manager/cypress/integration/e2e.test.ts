const { createModel } = require('@xstate/test');

import widgetsMachine from '../../src/widgetsMachine/machine';
import { screen } from '@testing-library/dom'
import { findByTestId, findByText } from '@testing-library/dom';

const testModel = createModel(widgetsMachine).withEvents({
  CLICK_GOOD: () => {
    screen.findByTestId('good-button').then((element) => element.click());
  },
  CLICK_BAD: () => {
    screen.findByTestId('bad-button').then((element) => element.click());
  },
  CLOSE: () => {
    screen.findByTestId('close-button').then((element) => element.click());
  },
  ESC: () => {
    cy.get('body').type('{esc}');
  },
  SUBMIT: {
    exec: (event) => {
      screen.findByTestId('submit-button').then((element) => element.click());
    },
    cases: [{ value: 'something' }]
  }
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