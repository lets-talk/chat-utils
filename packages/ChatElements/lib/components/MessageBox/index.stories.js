import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';

import { wrapWithThemes } from '../../utils/stories';
// Component to show on storybook
import MessageBox from '.';


const stories = storiesOf('MessageBox', module);
stories.addDecorator(withKnobs);

const themeOptions = { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' };
const defaultTheme = 'default';

// This HOC Wraps the Box so it is inside a ThemeProvider for styled-components
// and also wraps it inside a div with the selected global themes
const MessageBoxWithTheme = wrapWithThemes(MessageBox);

const messages = [
  {
    position: 'left',
    forwarded: true,
    type: 'text',
    theme: 'white',
    view: 'list',
    title: 'TalkBot',
    text: 'Buenos días! En que podemos ayudarte?',
    status: 'waiting',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '18:23',
    user_type: 'bot',
  },
  {
    position: 'right',
    forwarded: true,
    type: 'file',
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
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
  },
  {
    position: 'right',
    forwarded: false,
    type: 'photo',
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
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
  },
  {
    position: 'left',
    forwarded: false,
    type: 'actionable',
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
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
  },
  {
    position: 'right',
    forwarded: true,
    type: 'typing',
    theme: 'white',
    view: 'list',
    title: '',
    text: '',
    status: 'read',
    date: '2017-11-14T18:25:22.133Z',
    dateString: '18:25',
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    user_type: 'agent',
  },
];

stories.addWithInfo(
  'MessageBox - Text Message',
  'TextMessage type use',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <MessageBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        {...messages[0]}
        onOpen={action('onOpen')}
        onDownload={action('onDownload')}
        onTitleClick={action('onTitleClick')}
        onForwardClick={action('onForwardClick')}
        onClick={action('onClick')}
        onActionMessageClick={action('onActionMessageClick')}
      />
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Fie Message Type',
  'FileMessage type use',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <MessageBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        {...messages[1]}
        onOpen={action('onOpen')}
        onDownload={action('onDownload')}
        onTitleClick={action('onTitleClick')}
        onForwardClick={action('onForwardClick')}
        onClick={action('onClick')}
        onActionMessageClick={action('onActionMessageClick')}
      />
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Photo Message Type',
  'Photo type use',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <MessageBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        {...messages[2]}
        onOpen={action('onOpen')}
        onDownload={action('onDownload')}
        onTitleClick={action('onTitleClick')}
        onForwardClick={action('onForwardClick')}
        onClick={action('onClick')}
        onActionMessageClick={action('onActionMessageClick')}
      />
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Actionable Message Type',
  'Message of ActionableMessageBox type',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <MessageBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        {...messages[3]}
        onOpen={action('onOpen')}
        onDownload={action('onDownload')}
        onTitleClick={action('onTitleClick')}
        onForwardClick={action('onForwardClick')}
        onClick={action('onClick')}
        onActionMessageClick={action('onActionMessageClick')}
      />
    </div>
  )
);

stories.addWithInfo(
  'MessageBox - Typing Message Type',
  'Message of Typing type',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <MessageBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        {...messages[4]}
        onOpen={action('onOpen')}
        onDownload={action('onDownload')}
        onTitleClick={action('onTitleClick')}
        onForwardClick={action('onForwardClick')}
        onClick={action('onClick')}
        onActionMessageClick={action('onActionMessageClick')}
      />
    </div>
  )
);
