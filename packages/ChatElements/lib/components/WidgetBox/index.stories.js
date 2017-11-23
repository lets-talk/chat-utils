import React from 'react';
import moment from 'moment';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';

import { wrapWithThemes } from '../../utils/stories';
// Component to show on storybook
import { WidgetBox } from '../../../lib';


const stories = storiesOf('WidgetBox', module);
stories.addDecorator(withKnobs);

const themeOptions = { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' };
const defaultTheme = 'default';

// This HOC Wraps the Box so it is inside a ThemeProvider for styled-components
// and also wraps it inside a div with the selected global themes
const WidgetBoxWithTheme = wrapWithThemes(WidgetBox);

// Utils functions to generate random data to the stories
const loremIpsum = (count, units) => 'I am a random string';
const photo = (avatar = false) => avatar ? 'http://i46.tinypic.com/sexbb8.png' : 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let colorGenerated = '#';
  for (let i = 0; i < 6; i += 1) {
    colorGenerated += letters[Math.floor(Math.random() * 16)];
  }
  return colorGenerated;
};

const messages = [];

const token = () => parseInt((Math.random() * 10) % 4, 10);

const random = (type) => {
  switch (type) {
    case 'message':
      var type = token();
      var status = 'waiting';
      switch (type) {
        case 0:
          type = 'photo';
          status = 'waiting';
          break;
        case 1:
          type = 'file';
          status = 'sent';
          break;
        case 2:
          type = 'system';
          status = 'received';
          break;
        default:
          type = 'text';
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
        // titleColor: getRandomColor(),
        text: loremIpsum({ count: 1, units: 'sentences' }),
        data: {
          uri: type !== 'photo' ? `${photo()}` : `${photo(true)}`,
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
        avatar: `${photo()}`,
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
        unread: parseInt(Math.random() * 10 % 3),
        // dropdownMenu: (
        //   <Dropdown
        //     animationPosition="norteast"
        //     buttonProps={{
        //       type: 'transparent',
        //       color: '#cecece',
        //       icon: {
        //         component: <FaMenu />,
        //         size: 24,
        //       },
        //     }}
        //     items={[
        //       'Menu Item1',
        //       'Menu Item2',
        //       'Menu Item3',
        //     ]}
        //   />
        // ),
        dateString: moment(new Date()).format('HH:mm'),
      };

    default:
      return {};
  }
};

const addMessage = () => {
  messages.push(random('message'));
};

for (let i = 1; i < 15; i += 1) {
  messages.push(random('message'));
  // messages.push(random('chat'));
}

stories.addWithInfo(
  'Chat Widget - 2',
  'This is the basic usage of a Widget Box.',
  () => (
    <WidgetBoxWithTheme
      themeName={select('Theme', themeOptions, defaultTheme)}
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
  )
);

const story3Messages = [
  {
    position: 'left',
    forwarded: true,
    type: 'system',
    theme: 'white',
    view: 'list',
    text: '23/08/2017',
    status: 'received',
    date: '2017-11-14T03:40:45.298Z',
    dateString: '00:40',
  },
  {
    position: 'right',
    forwarded: true,
    type: 'text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Buenos días!',
    status: 'read',
    date: '2017-11-14T18:24:22.133Z',
    dateString: '18:24',
  },
  {
    position: 'right',
    forwarded: true,
    type: 'text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Por favor necesito ayuda, perdí mi tarjeta de crédito',
    status: 'read',
    date: '2017-11-14T18:24:22.133Z',
    dateString: '18:24',
  },
  {
    position: 'left',
    forwarded: true,
    type: 'text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Buenos días!',
    status: 'read',
    date: '2017-11-14T18:25:22.133Z',
    dateString: '18:25',
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    user_type: 'agent',
  },
  {
    position: 'left',
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
  'Chat widget - 3',
  'This is the usage using the user Avatar.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WidgetBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        title={text('Title', 'Georgia Harmon')}
        subtitle={text('Subtitle', 'Emergencia Bancaria')}
        sendMessage={action('sendMessage')}
        senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
        toggleChat={action('toggleChat')}
        openMenu={action('openMenu')}
        showMenuButton={boolean('Show Menu Button', true)}
        showMinimizeButton={boolean('Show Minimize Button', true)}
        disabledInput={boolean('Disable Input', false)}
        avatar={text('Avatar', 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg')}
        messages={story3Messages}
      />
    </div>
  )
);

const fileMessages = [
  {
    position: 'left',
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
    type: 'file',
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
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
  },
];

stories.addWithInfo(
  'Only File messages',
  'This is the advanced usage of a Widget Box showing file messages.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WidgetBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        title={text('Title', 'Georgia Harmon')}
        subtitle={text('Subtitle', 'Emergencia Bancaria')}
        sendMessage={action('sendMessage')}
        senderPlaceHolder={text('Sender PlaceHolder', 'Escribe una respuesta')}
        toggleChat={action('toggleChat')}
        openMenu={action('openMenu')}
        showMenuButton={boolean('Show Menu Button', true)}
        showMinimizeButton={boolean('Show Minimize Button', true)}
        disabledInput={boolean('Disable Input', false)}
        avatar={text('Avatar', 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg')}
        messages={fileMessages}
      />
    </div>
  )
);

const actionableMessages = [
  {
    position: 'left',
    forwarded: true,
    type: 'text',
    theme: 'white',
    view: 'list',
    title: 'TalkBot',
    text: 'Buenos días!',
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
    dateString: '18:23',
    user_type: 'bot',
  },
  {
    position: 'left',
    forwarded: true,
    type: 'text',
    theme: 'white',
    view: 'list',
    title: '',
    text: 'Por favor cuentame en que te podemos ayudar?',
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
    dateString: '18:23',
    user_type: 'bot',
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
];

stories.addWithInfo(
  'Actionable messages',
  'This is the advanced usage of a Widget Box showing Actionable messages.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WidgetBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
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
        avatar={text('Avatar', 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg')}
        messages={actionableMessages}
      />
    </div>
  )
);

stories.addWithInfo(
  'Advanced Usage',
  'This is the advanced usage of a Widget Box showing messages.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WidgetBoxWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
        title={text('Title', 'Bienvenido en que podemos ayudar')}
        subtitle={text('Subtitle', 'Subtitulo')}
        sendMessage={action('sendMessage')}
        senderPlaceHolder={text('Sender PlaceHolder', 'Enviar')}
        toggleChat={action('toggleChat')}
        openMenu={action('openMenu')}
        showMinimizeButton={boolean('Show Minimize Button', true)}
        showMenuButton={boolean('Show Menu Button', true)}
        disabledInput={boolean('Disable Input', false)}
        messages={object('Messages', messages)}
      />
    </div>
  )
);
