import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from '../../../../theme';
// Component to show on storybook
import Avatar from '.';

import { withKnobs, text, boolean, number, object, select, color } from '@storybook/addon-knobs';

const stories = storiesOf('Avatar', module);
stories.addDecorator(withKnobs);

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

stories.addWithInfo(
  'Avatar',
  'This is the basic usage with the Avatar with providing a label to show the text.',
  () => (
    <ThemeProvider theme={themes[select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')]}>
      <Avatar
        src="http://i46.tinypic.com/sexbb8.png"
        type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'circle')}
        size={select('Size', {
          xsmall: 'xsmall', small: 'small', medium: 'medium', large: 'large', xlarge: 'xlarge',
        }, 'medium')}
        withStatus={boolean('Show Status', false)}
        status={select('Status', {
          online: 'online', offline: 'offline', sleeping: 'sleeping',
        }, 'online')}
      >
      </Avatar>
    </ThemeProvider>
  )
);
