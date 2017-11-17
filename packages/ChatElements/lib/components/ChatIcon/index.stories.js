import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withKnobs, text, boolean, number, object, select, color } from '@storybook/addon-knobs';

import { LightTheme, DarkTheme } from '../../../../theme';
// Component to show on storybook
import { ChatIcon } from '../../../lib';


const stories = storiesOf('ChatIcon', module);
stories.addDecorator(withKnobs);

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

stories.addWithInfo(
  'ChatIcon',
  'This is the basic usage with the ChatIcon with providing a label to show the text.',
  () => {
    const themeName = select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light');
    return (
      <div className={`theme-${themeName}`} style={{ position: 'fixed', bottom: 0, right: 0 }}>
        <ThemeProvider className="" theme={themes[select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')]}>
          <ChatIcon
            type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'rounded')}
            text={text('Text', 'En que podemos ayudar')}
            width={number('Width', 350)}
            height={number('Height', 50)}
            margin={text('Margin', '0px 10px 0px 0px')}
            showIcon={boolean('Show Icon', true)}
            disabled={boolean('Disabled', false)}
            animationStatus={false}
            newMessages={number('New Messages', 22)}
          >
          </ChatIcon>
        </ThemeProvider>
      </div>
    );
  }
);
