import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withKnobs, text, boolean, number, object, select, color } from '@storybook/addon-knobs';

import { LightTheme, DarkTheme } from '../../../../theme';
// Component to show on storybook
import ChatIcon from './ChatIcon';


const stories = storiesOf('ChatIcon', module);
stories.addDecorator(withKnobs);

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

stories.addWithInfo(
  'ChatIcon',
  'This is the basic usage with the ChatIcon with providing a label to show the text.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
      <ThemeProvider theme={themes[select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')]}>
        <ChatIcon
          type={select('Type', { default: 'default', rounded: 'rounded' }, 'default')}
          text={text('Text', 'En que podemos ayudar')}
          width={text('Width', '50px')}
          height={text('Height', '50px')}
          margin={text('Margin', '0 10px 50px 0')}
          disabled={boolean('Disabled', false)}
          animationStatus={false}
          newMessages={number('New Messages', 22)}
        >
        </ChatIcon>
      </ThemeProvider>
    </div>
  )
);
