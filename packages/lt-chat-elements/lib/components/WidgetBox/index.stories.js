import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
// Component to show on storybook
import { WidgetBox, MessageList, Header } from '../../../lib';

const stories = storiesOf('WidgetBox', module);
stories.addDecorator(withKnobs);

const agent = {
  avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
  email: '',
  type: 'Agent',
  status: 'online',
};

stories.addWithInfo(
  'Basic Usage - Empty WidgetBox',
  'This is the basic usage of a Widget Box.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)', height: '100%',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <WidgetBox
          title={text('Title', 'Ayuda en linea')}
          subtitle={text('Subtitle', '')}
          toggleChat={action('toggleChat')}
          openMenu={action('openMenu')}
          showMenuButton={boolean('Show Menu Button', true)}
          showMinimizeButton={boolean('Show Minimize Button', true)}
          person={object('Person', agent)}
          header={(props) => <Header {...props} />}
        >
          <MessageList
            messages={[]}
            onActionMessageClick={action('onActionMessageClick')}
          />
        </WidgetBox>
      </WrapWithTheme>
    </div>
  )
);
