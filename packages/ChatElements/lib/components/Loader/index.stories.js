import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withKnobs, text, boolean, number, object, select, color } from '@storybook/addon-knobs';

import { LightTheme, DarkTheme } from '../../../../theme';
// Component to show on storybook
import Loader from '.';


const stories = storiesOf('Loader', module);
stories.addDecorator(withKnobs);

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

stories.addWithInfo(
  'Loader',
  'This is the basic usage with the Loader with providing a label to show the text.',
  () => (
    <ThemeProvider theme={themes[select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')]}>
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
        color={color('Color', '#FFF')}
      >
      </Loader>
    </ThemeProvider>
  )
);
