import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import { wrapWithThemes } from '../../utils/stories';
// Component to show on storybook
import { ConversationListBox } from '../../../lib';

const stories = storiesOf('ConversationList', module);
stories.addDecorator(withKnobs);

const conversationList = [
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      content: 'Lorem ipusum la la ejemplo largo',
    },
    tags: [
      {
        name: 'SPU-CLAVE',
      },
    ],
  },
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      type: 'important',
      readed: true,
      content: 'Lorem ipusum la la ejemplo largo',
    },
    tags: null,
  },
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      readed: false,
      content: 'Lorem ipusum la la ejemplo largo',
    },
    tags: [
      {
        name: 'SPU-PYME',
      },
    ],
  },
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      readed: true,
      content: 'Lorem ipusum la la ejemplo largo',
    },
    tags: [
      {
        name: 'SPU-CLAVE',
      },
    ],
  },
  {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      type: 'internal',
      readed: true,
      content: 'Lorem ipusum la la ejemplo largo',
    },
    tags: [
      {
        name: 'SPU-PYME',
      },
      {
        name: 'SPU-CLAVE',
      },
    ],
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

// This HOC Wraps the Box so it is inside a ThemeProvider for styled-components
// and also wraps it inside a div with the selected global themes
const ConversationListBoxWithTheme = wrapWithThemes(ConversationListBox);

stories.addWithInfo(
  'Simple Conversation List',
  'This is the basic usage of a ConversationList with providing a label to show the text.',
  () => (
    <ConversationListBoxWithTheme
      themeName={select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')}
      title={text('Title', 'Conversaciones')}
      subtitle={text('Subtitle', '')}
      senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
      toggleChat={action('toggleChat')}
      openMenu={action('openMenu')}
      showMenuButton={boolean('Show Menu Button', false)}
      showMinimizeButton={boolean('Show Minimize Button', false)}
      conversations={conversationList}
    />
  )
);
