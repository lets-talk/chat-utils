import React from "react";
// Storybook stuff
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from './theme';

// Component to show on storybook
import { ChatIcon } from "./ChatElements/lib";

import { withKnobs, text, boolean, number, object, select, color } from "@storybook/addon-knobs";

const stories = storiesOf("Icons", module);
stories.addDecorator(withKnobs);

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

stories.addWithInfo(
  "ChatIcon",
  `This is the basic usage with the ChatIcon with providing a label to show the text.`,
  () => (
      <div style={{ position: 'fixed', bottom: 10, right: 20 }}>
        <ThemeProvider theme={themes[select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')]}>
          <ChatIcon
            disabled
            animationStatus={false}
            newMessages={number('New Messages', 22)}
          >
            Hola
          </ChatIcon>
        </ThemeProvider>
      </div>
  )
);
