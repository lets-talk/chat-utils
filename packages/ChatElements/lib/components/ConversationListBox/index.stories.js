import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs';

import { WrapWithTheme } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';
// Component to show on storybook
import { ConversationListBox } from '../../../lib';

const stories = storiesOf('ConversationList', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ConversationListBox'));

const conversationList = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: '400px',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' }, 'default')}
      >
        <ConversationListBox
          title={text('title', 'Conversaciones')}
          subtitle={text('subtitle', '')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          clickConversationHandler={action('clickConversationHandler')}
          newConversationHandler={action('newConversationHandler')}
          showMenuButton={boolean('showMenuButton', false)}
          showMinimizeButton={boolean('showMinimizeButton', false)}
          showAddConversationButton={boolean('showAddConversationButton', true)}
          emptyStateText={text('emptyStateText', 'Sin conversaciones abiertas')}
          avatar={text('avatar', '')}
          avatarStatus={text('avatarStatus', '')}
          noMoreDataText={text('noMoreDataText', 'No hay mas conversaciones')}
          newConversationText={text('newConversationText', 'Nueva conversación')}
          conversations={object('conversations', conversationList)}
          toBottomHeight="100%"
        />
      </WrapWithTheme>
    </div>
  )
);
