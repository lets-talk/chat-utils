import { withTests } from '@storybook/addon-jest';
import jestTestResults from '../../tests-results/jest-test-results.json';

export default withTests(jestTestResults, {
  filesExt: '__tests__/**.js',
});
