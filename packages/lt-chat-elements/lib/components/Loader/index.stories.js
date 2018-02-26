import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, color } from '@storybook/addon-knobs';

import { WrapWithTheme } from '../../utils/stories';
// Component to show on storybook
import Loader from '.';

const stories = storiesOf('Loader', module);
stories.addDecorator(withKnobs);

stories.addWithInfo(
  'Loader',
  'This is the basic usage with the Loader with providing a label to show the text.',
  () => (
    <WrapWithTheme
      themeName={select('Theme', { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' }, 'default')}
    >
      <Loader
        active={boolean('Active', true)}
        fullScreen={boolean('Full Screen', true)}
        size={select('Size', {
          default: 'default', xsmall: 'xsmall', small: 'small', medium: 'medium', large: 'large', xlarge: 'xlarge',
        }, 'medium')}
        type={select('Type', {
          'ball-beat': 'ball-beat',
          'ball-pulse': 'ball-pulse',
          'ball-pulse-sync': 'ball-pulse-sync',
          'single-ball-beat': 'single-ball-beat',
          'ball-clip-rotate': 'ball-clip-rotate',
        }, 'ball-beat')}
        color={color('Color', false)}
      />
    </WrapWithTheme>
  )
);
