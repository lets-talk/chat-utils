import React from 'react';
import moment from 'moment';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withKnobs, text, boolean, number, object, select, color } from '@storybook/addon-knobs';

import { LightTheme, DarkTheme } from '../../../../theme';
// Component to show on storybook
import WidgetBox from './WidgetBox';


const stories = storiesOf('WidgetBox', module);
stories.addDecorator(withKnobs);

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

const loremIpsum = (count, units) => 'I am a random string';
const photo = () => 'http://i46.tinypic.com/sexbb8.png';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let colorGenerated = '#';
  for (let i = 0; i < 6; i += 1) {
    colorGenerated += letters[Math.floor(Math.random() * 16)];
  }
  return colorGenerated;
};

const messages = [];

const token = () => parseInt((Math.random() * 10) % 6, 10);

const random = (type) => {
  switch (type) {
    case 'message':
      var type = token();
      var status = 'waiting';
      switch (type) {
        case 0:
          type = 'photo';
          status = 'sent';
          break;
        case 1:
          type = 'file';
          status = 'sent';
          break;
        case 2:
          type = 'system';
          status = 'received';
          break;
        case 3:
          type = 'location';
          break;
        case 4:
          type = 'spotify';
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
          uri: `data:image/png;base64,${photo(150)}`,
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
  messages.push(random('chat'));
}

stories.addWithInfo(
  'Basic Usage',
  'This is the basic usage of a Widget Box.',
  () => (
    <ThemeProvider theme={themes[select('Theme', { light: 'LightTheme', dark: 'DarkTheme' }, 'light')]}>
      <WidgetBox
        title={text('Title', 'Bienvenido en que podemos ayudar')}
        subtitle={text('Subtitle', 'Subtitulo')}
        sendMessage={(e) => {
          e.preventDefault();
          addMessage();
          return false;
        }}
        senderPlaceHolder={text('Sender PlaceHolder', 'Enviar')}
        profileAvatar={text('Profile Avatar', 'Avatar')}
        toggleChat={(e) => {
          e.preventDefault();
          addMessage();
          return false;
        }}
        showCloseButton={boolean('Show Close Button', true)}
        disabledInput={boolean('Disable Input', false)}
        messages={object('Messages', messages)}
      >
      </WidgetBox>
    </ThemeProvider>
  )
);
