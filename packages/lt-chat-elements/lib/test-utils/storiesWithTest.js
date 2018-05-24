import { withTests } from '@storybook/addon-jest';
import jestTestResults from '../../tests-results/jest-test-results.json';

export default withTests({ results: jestTestResults }, {
  filesExt: '__tests__/**.js',
});
