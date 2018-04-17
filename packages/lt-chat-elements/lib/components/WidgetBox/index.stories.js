import React from 'react';
import moment from 'moment';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';

import { WrapWithTheme } from '../../utils/stories';
// Component to show on storybook
import { WidgetBox } from '../../../lib';


const stories = storiesOf('WidgetBox', module);
stories.addDecorator(withKnobs);


const themeOptions = { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' };
const defaultTheme = 'default';

// Utils functions to generate random data to the stories
const loremIpsum = () => 'I am a random string';
const photo = (avatar = false) => avatar ? 'http://i46.tinypic.com/sexbb8.png' : 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg';

const messages = [];

const token = () => parseInt((Math.random() * 10) % 4, 10);

const agent = {
  avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
  email: '',
  type: 'Agent',
  status: 'online',
};

const random = (messageType) => {
  let type;
  let status;
  switch (messageType) {
    case 'message':
      switch (type) {
        case 0:
          type = 'Photo';
          status = 'waiting';
          break;
        case 1:
          type = 'File';
          status = 'sent';
          break;
        case 2:
          type = 'Time';
          status = 'received';
          break;
        default:
          type = 'Text';
          status = 'read';
          break;
      }

      return {
        position: (token() >= 1 ? 'right' : 'left'),
        forwarded: true,
        type,
        theme: 'white',
        view: 'list',
        title: loremIpsum({ count: 2, units: 'words' }),
        text: loremIpsum({ count: 1, units: 'sentences' }),
        data: {
          uri: type !== 'Photo' ? `${photo()}` : `${photo(true)}`,
          status: {
            click: false,
            loading: 0,
          },
          width: 300,
          height: 300,
          latitude: '37.773972',
          longitude: '-122.431297',
        },
        status,
        date: new Date(),
        dateString: moment(new Date()).format('HH:mm'),
        person: {
          avatar: `${photo()}`,
          email: '',
          type: 'Client',
        },
      };
    case 'chat':
      return {
        id: String(Math.random()),
        avatar: `${photo()}`,
        avatarFlexible: true,
        statusColor: 'lightgreen',
        alt: loremIpsum({ count: 2, units: 'words' }),
        title: loremIpsum({ count: 2, units: 'words' }),
        date: new Date(),
        subtitle: loremIpsum({ count: 1, units: 'sentences' }),
        unread: parseInt((Math.random() * 10) % 3, 10),
        dateString: moment(new Date()).format('HH:mm'),
      };

    default:
      return {};
  }
};

for (let i = 1; i < 15; i += 1) {
  messages.push(random('message'));
}

stories.addWithInfo(
  'Basic Usage - Empty WidgetBox',
  'This is the basic usage of a Widget Box.',
  () => (
    <WrapWithTheme
      themeName={select('Theme', themeOptions, defaultTheme)}
    >
      <WidgetBox
        title={text('Title', 'Ayuda en linea')}
        subtitle={text('Subtitle', '')}
        sendMessage={action('sendMessage')}
        senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
        toggleChat={action('toggleChat')}
        openMenu={action('openMenu')}
        showMenuButton={boolean('Show Menu Button', true)}
        showMinimizeButton={boolean('Show Minimize Button', true)}
        disabledInput={boolean('Disable Input', false)}
        messages={[]}
      />
    </WrapWithTheme>
  )
);

const story3Messages = [
  {
    position: 'left',
    forwarded: true,
    type: 'Time',
    theme: 'white',
    view: 'list',
    text: '23/08/2017',
    status: 'received',
    date: '2017-11-14T03:40:45.298Z',
    dateString: '00:40',
    person: {
      avatar: '',
      email: '',
      type: 'Client',
    },
  },
  {
    position: 'right',
    forwarded: true,
    type: 'Text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Buenos días!',
    status: 'read',
    date: '2017-11-14T18:24:22.133Z',
    dateString: '18:24',
    person: {
      avatar: '',
      email: '',
      type: 'Client',
    },
  },
  {
    position: 'right',
    forwarded: true,
    type: 'Text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Por favor necesito ayuda, perdí mi tarjeta de crédito',
    status: 'read',
    date: '2017-11-14T18:24:22.133Z',
    dateString: '18:24',
    person: {
      avatar: '',
      email: '',
      type: 'Client',
    },
  },
  {
    position: 'left',
    forwarded: true,
    type: 'Text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Buenos días!',
    status: 'read',
    date: '2017-11-14T18:25:22.133Z',
    dateString: '18:25',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Agent',
    },
  },
  {
    position: 'left',
    forwarded: true,
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
    },
  },
];

stories.addWithInfo(
  'Basic Usage with Agent typing',
  'This is the usage when agent is typing.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <WidgetBox
          title={text('Title', 'Georgia Harmon')}
          subtitle={text('Subtitle', 'Emergencia Bancaria')}
          sendMessage={action('sendMessage')}
          senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          showMenuButton={boolean('Show Menu Button', true)}
          showMinimizeButton={boolean('Show Minimize Button', true)}
          disabledInput={boolean('Disable Input', false)}
          person={object('Agent', agent)}
          messages={object('Messages', story3Messages)}
        />
      </WrapWithTheme>
    </div>
  )
);

const fileMessages = [
  {
    position: 'left',
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
    },
  },
  {
    position: 'right',
    forwarded: false,
    type: 'File',
    theme: 'white',
    view: 'list',
    title: 'Datos Contacto',
    text: 'Datos Contacto',
    data: {
      uri: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      status: {
        click: true,
        loading: 0,
      },
      width: 300,
      height: 300,
      size: '12Kb',
    },
    status: 'waiting',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '17:34',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Client',
    },
  },
];

stories.addWithInfo(
  'Only File messages',
  'This is the advanced usage of a Widget Box showing file messages.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <WidgetBox
          title={text('Title', 'Georgia Harmon')}
          subtitle={text('Subtitle', 'Emergencia Bancaria')}
          sendMessage={action('sendMessage')}
          senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          showMenuButton={boolean('Show Menu Button', true)}
          showMinimizeButton={boolean('Show Minimize Button', true)}
          disabledInput={boolean('Disable Input', false)}
          person={object('Agent', agent)}
          messages={fileMessages}
        />
      </WrapWithTheme>
    </div>
  )
);

const photoMessages = [
  {
    position: 'left',
    forwarded: true,
    type: 'Photo',
    theme: 'white',
    view: 'list',
    title: 'Solicitud de nueva tarjeta Banco',
    text: 'Solicitud de nueva tarjeta Banco',
    data: {
      uri: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      status: {
        click: false,
      },
      width: 100,
      height: 100,
      size: '1Mb',
    },
    status: 'sent',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '17:34',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Client',
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
    },
  },
];

stories.addWithInfo(
  'Only Photo messages',
  'This is the advanced usage of a Widget Box showing photo messages.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <WidgetBox
          title={text('Title', 'Georgia Harmon')}
          subtitle={text('Subtitle', 'Emergencia Bancaria')}
          sendMessage={action('sendMessage')}
          senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          showMenuButton={boolean('Show Menu Button', true)}
          showMinimizeButton={boolean('Show Minimize Button', true)}
          disabledInput={boolean('Disable Input', false)}
          person={object('Agent', agent)}
          messages={photoMessages}
        />
      </WrapWithTheme>
    </div>
  )
);

const actionableMessages = [
  {
    position: 'left',
    forwarded: true,
    type: 'Text',
    theme: 'white',
    view: 'list',
    title: 'TalkBot',
    text: 'Buenos días!',
    data: {
    },
    status: 'sent',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '18:23',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Bot',
    },
  },
  {
    position: 'left',
    forwarded: true,
    type: 'Text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Por favor cuentame en que te podemos ayudar?',
    data: {
    },
    status: 'sent',
    date: '2017-11-15T20:34:27.173Z',
    dateString: '18:23',
    person: {
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      email: '',
      type: 'Bot',
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
      type: 'Bot',
    },
  },
];

stories.addWithInfo(
  'Actionable messages',
  'This is the advanced usage of a Widget Box showing Actionable messages.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <WidgetBox
          title={text('Title', 'Georgia Harmon')}
          subtitle={text('Subtitle', 'Emergencia Bancaria')}
          sendMessage={action('sendMessage')}
          senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          onActionMessageClick={action('onActionMessageClick')}
          showMenuButton={boolean('Show Menu Button', true)}
          showMinimizeButton={boolean('Show Minimize Button', true)}
          disabledInput={boolean('Disable Input', false)}
          person={object('Agent', agent)}
          messages={actionableMessages}
        />
      </WrapWithTheme>
    </div>
  )
);

stories.addWithInfo(
  'Advanced Usage',
  'This is the advanced usage of a Widget Box showing messages.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <WidgetBox
          title={text('Title', 'Bienvenido en que podemos ayudar')}
          subtitle={text('Subtitle', 'Subtitulo')}
          sendMessage={action('sendMessage')}
          senderPlaceHolder={text('Sender PlaceHolder', 'Enviar')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          showMinimizeButton={boolean('Show Minimize Button', true)}
          showMenuButton={boolean('Show Menu Button', true)}
          disabledInput={boolean('Disable Input', false)}
          person={object('Agent', agent)}
          messages={object('Messages', messages)}
        />
      </WrapWithTheme>
    </div>
  )
);
