import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text, object } from '@storybook/addon-knobs';

// Component to show on storybook
import Header from '.';
import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';

const stories = storiesOf('Header', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('Header'));

const leftButtons = [
  {
    onClick: () => action('onLeftButtonClick'),
    icon: <i>Icon Left</i>,
  },
];

const rightButtons = [
  {
    onClick: () => action('onRightButtonClick'),
    icon: <b>Any node</b>,
  },
];

const agent = {
  avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
  email: '',
  type: 'Agent',
  status: 'online',
};

stories.addWithInfo(
  'Header',
  'This is the basic usage with the Header',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <Header
          title={text('Title', 'Ayuda en Línea')}
          subtitle={text('Subtitle', 'Cambio de clave')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          showMenuButton={boolean('Show Menu Button', false)}
          showMinimizeButton={boolean('Show Minimize Button', false)}
          person={object('Person', agent)}
          leftButtons={leftButtons}
          rightButtons={rightButtons}
        />
      </WrapWithTheme>
    </div>
  )
);
