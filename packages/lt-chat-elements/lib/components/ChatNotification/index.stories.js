import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';
// Component to show on storybook
import ChatNotification from './';

const stories = storiesOf('ChatNotification', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ChatNotification'));

const avatars = [
  {
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    email: '',
    type: 'Agent',
    status: 'offline',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    email: '',
    type: 'Agent',
    status: 'offline',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    email: '',
    type: 'Agent',
    status: 'offline',
  },
];
// style={{
//   position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', marginTop: '50px', marginLeft: '50px',
// }}
stories.addWithInfo(
  'ChatNotification',
  'This is the basic usage with the ChatNotification with providing a label to show the text.',
  () => (
    <div>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <ChatNotification
          persons={object('Persons', avatars)}
          title={text('Text', "Let's Talk")}
          body={text('Body', 'Hi! Have any questions about pricing?')}
          dismissText={text('dismissText', 'Close')}
          width={number('Width', 350)}
          height={number('Height', 350)}
          margin={text('Margin', '0px 10px 0px 0px')}
          showAvatars={boolean('showAvatars', true)}
          avatarPosition={select('AvatarPosition', { in: 'in', out: 'out' }, 'out')}
          onClick={action('onClick')}
          onDismiss={action('onDismiss')}
        />
      </WrapWithTheme>
    </div>
  )
);
