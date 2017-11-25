import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs';

import { WrapWithTheme } from '../../utils/stories';
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
      created_at: '2017-11-20T09:43:57.000-0300',
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
      content: 'Lorem ipusum la la ejemplo largo, este es muy largo deberia bloquear el tamaño del mensaje la UI.',
      created_at: '2017-11-20T09:40:57.000-0300',
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
      created_at: '2017-11-20T09:33:57.000-0300',
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
      created_at: '2017-11-19T09:43:57.000-0300',
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
      created_at: '2017-11-19T09:41:57.000-0300',
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
      created_at: '2017-11-19T09:42:50.000-0300',
    },
  },
];

stories.addWithInfo(
  'Simple Conversation List',
  'This is the basic usage of a ConversationList with providing a label to show the text.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' }, 'default')}
      >
        <ConversationListBox
          title={text('Title', 'Conversaciones')}
          subtitle={text('Subtitle', '')}
          senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          clickConversationHandler={action('clickConversationHandler')}
          newConversationHandler={action('newConversationHandler')}
          showMenuButton={boolean('Show Menu Button', false)}
          showMinimizeButton={boolean('Show Minimize Button', false)}
          emptyStateText={text('Empty state text', 'Sin conversaciones abiertas')}
          noMoreDataText={text('No more data text', 'No hay mas conversaciones')}
          conversations={object('conversations', conversationList)}
          toBottomHeight="100%"
        />
      </WrapWithTheme>
    </div>
  )
);
