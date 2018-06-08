import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';
// Component to show on storybook
import { ChatIcon } from '../../../lib';

const stories = storiesOf('ChatIcon', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ChatIcon'));

const defaultChatIconPic = {
  imageUrl: '',
};

stories.addWithInfo(
  'ChatIcon',
  'This is the basic usage with the ChatIcon with providing a label to show the text.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <ChatIcon
          type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'rounded')}
          text={text('Text', 'En que podemos ayudar')}
          width={number('Width', 350)}
          height={number('Height', 50)}
          margin={text('Margin', '0px 10px 0px 0px')}
          onClick={action('onClick')}
          showIcon={boolean('Show Icon', true)}
          disabled={boolean('Disabled', false)}
          animationStatus={false}
          newMessages={number('New Messages', 22)}
          chat_icon_pic={object('Chat_Icon_Pic', defaultChatIconPic)}
        />
      </WrapWithTheme>
    </div>
  )
);
