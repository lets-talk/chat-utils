import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from '../../../../theme';
// Component to show on storybook
import { ConversationListBox } from '../../../lib';

import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, object, select, color } from '@storybook/addon-knobs';

const stories = storiesOf('ConversationList', module);
stories.addDecorator(withKnobs);

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

const conversationList = [
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      content: 'Lorem ipusum la la ejemplo largo',
    },
  },
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      content: 'Lorem ipusum la la ejemplo largo',
    },
  },
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      content: 'Lorem ipusum la la ejemplo largo',
    },
  },
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      content: 'Lorem ipusum la la ejemplo largo',
    },
  },
];

stories.addWithInfo(
  'Simple Conversation List',
  'This is the basic usage of a ConversationList with providing a label to show the text.',
  () => (
    <ThemeProvider theme={themes[select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')]}>
      <ConversationListBox
        title={text('Title', 'Conversaciones')}
        subtitle={text('Subtitle', '')}
        senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
        toggleChat={action('toggleChat')}
        openMenu={action('openMenu')}
        showMenuButton={boolean('Show Menu Button', false)}
        showMinimizeButton={boolean('Show Minimize Button', false)}
        conversations={conversationList}
      >
      </ConversationListBox>
    </ThemeProvider>
  )
);
