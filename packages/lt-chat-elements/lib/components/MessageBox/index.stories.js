import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, object } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';
// Component to show on storybook
import MessageBox from '.';

const stories = storiesOf('MessageBox', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('MessageBox', 'FileMessage', 'PhotoMessage', 'SystemMessage'));

const messages = [
  {
    position: 'left',
    forwarded: true,
    type: 'Text',
    theme: 'white',
    view: 'list',
    title: 'TalkBot',
    text: 'Buenos días! En que podemos ayudarte?',
    status: 'waiting',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '18:23',
    person: {
      avatar: '',
      email: '',
      type: 'Bot',
      status: 'online',
    },
  },
  {
    position: 'right',
    forwarded: true,
    type: 'File',
    theme: 'white',
    view: 'list',
    title: 'Solicitud de nueva tarjeta Banco',
    text: 'Solicitud de nueva tarjeta Banco',
    data: {
      uri: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      status: {
        click: true,
        loading: 70,
      },
      width: 300,
      height: 300,
      size: '2Mb',
    },
    status: 'sent',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '17:34',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Client',
      status: 'sleeping',
    },
  },
  {
    position: 'right',
    forwarded: true,
    type: 'Photo',
    theme: 'white',
    view: 'list',
    title: 'Solicitud de nueva tarjeta Banco',
    text: 'Solicitud de nueva tarjeta Banco',
    data: {
      uri: 'http://i46.tinypic.com/sexbb8.pngg',
      status: {
        click: true,
        loading: 70,
      },
      width: 150,
      height: 150,
      size: '2Mb',
    },
    status: 'sent',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '17:34',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Client',
      status: 'online',
    },
  },
  {
    position: 'left',
    forwarded: false,
    type: 'Actionable',
    theme: 'white',
    view: 'list',
    text: 'Datos Contacto',
    data: {
      actions: [
        {
          id: 1,
          name: 'Emergencia Bancaria',
        },
        {
          id: 2,
          name: 'Tarjeta de crédito',
        },
        {
          id: 3,
          name: 'Crédito Personal',
        },
        {
          id: 4,
          name: 'Otro',
        },
      ],
    },
    status: 'waiting',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '18:23',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Client',
      status: 'sleeping',
    },
  },
  {
    position: 'right',
    forwarded: false,
    type: 'Typing',
    theme: 'white',
    view: 'list',
    title: '',
    text: '',
    status: 'read',
    date: '2017-11-14T18:25:22.133Z',
    dateString: '18:25',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Agent',
      status: 'offline',
    },
  },
  {
    position: 'left',
    forwarded: false,
    type: 'Time',
    theme: 'white',
    view: 'list',
    title: 'TalkBot',
    text: '15/11/2017',
    status: 'waiting',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '18:23',
    person: {
      avatar: '',
      email: '',
      type: 'Bot',
      status: 'online',
    },
  },
  {
    position: 'left',
    forwarded: false,
    type: 'System',
    theme: 'white',
    view: 'list',
    title: 'TalkBot',
    text: 'Sandino ha agregado a Cristian a la conversación',
    status: 'waiting',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '18:23',
    person: {
      avatar: '',
      email: '',
      type: 'Bot',
      status: 'online',
    },
  },
];

stories.addWithInfo(
  'MessageBox - Text Message',
  'TextMessage type use',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <MessageBox
          message={object('message', messages[0])}
          onOpen={action('onOpen')}
          onDownload={action('onDownload')}
          onTitleClick={action('onTitleClick')}
          onForwardClick={action('onForwardClick')}
          onMessageClick={action('onMessageClick')}
          onActionMessageClick={action('onActionMessageClick')}
        />
      </WrapWithTheme>
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - File Message Type',
  'FileMessage type use',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <MessageBox
          message={object('message', messages[1])}
          onOpen={action('onOpen')}
          onDownload={action('onDownload')}
          onTitleClick={action('onTitleClick')}
          onForwardClick={action('onForwardClick')}
          onMessageClick={action('onMessageClick')}
          onActionMessageClick={action('onActionMessageClick')}
        />
      </WrapWithTheme>
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Photo Message Type',
  'Photo type use',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <MessageBox
          message={object('message', messages[2])}
          onOpen={action('onOpen')}
          onDownload={action('onDownload')}
          onTitleClick={action('onTitleClick')}
          onForwardClick={action('onForwardClick')}
          onMessageClick={action('onMessageClick')}
          onActionMessageClick={action('onActionMessageClick')}
        />
      </WrapWithTheme>
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Actionable Message Type',
  'Message of ActionableMessageBox type',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <MessageBox
          message={object('message', messages[3])}
          onOpen={action('onOpen')}
          onDownload={action('onDownload')}
          onTitleClick={action('onTitleClick')}
          onForwardClick={action('onForwardClick')}
          onMessageClick={action('onMessageClick')}
          onActionMessageClick={action('onActionMessageClick')}
        />
      </WrapWithTheme>
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Typing Message Type',
  'Message of Typing type',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <MessageBox
          message={object('message', messages[4])}
          onOpen={action('onOpen')}
          onDownload={action('onDownload')}
          onTitleClick={action('onTitleClick')}
          onForwardClick={action('onForwardClick')}
          onMessageClick={action('onMessageClick')}
          onActionMessageClick={action('onActionMessageClick')}
        />
      </WrapWithTheme>
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Date Message Type',
  'Message of Date type',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <MessageBox
          message={object('message', messages[5])}
          onOpen={action('onOpen')}
          onDownload={action('onDownload')}
          onTitleClick={action('onTitleClick')}
          onForwardClick={action('onForwardClick')}
          onMessageClick={action('onMessageClick')}
          onActionMessageClick={action('onActionMessageClick')}
        />
      </WrapWithTheme>
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - System Message Type',
  'Message of System type',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: '100%',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <MessageBox
          message={object('message', messages[6])}
          onOpen={action('onOpen')}
          onDownload={action('onDownload')}
          onTitleClick={action('onTitleClick')}
          onForwardClick={action('onForwardClick')}
          onMessageClick={action('onMessageClick')}
          onActionMessageClick={action('onActionMessageClick')}
        />
      </WrapWithTheme>
    </div>
  )
);
