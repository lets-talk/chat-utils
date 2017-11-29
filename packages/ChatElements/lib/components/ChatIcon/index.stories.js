import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';

import { WrapWithTheme } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';
// Component to show on storybook
import { ChatIcon } from '../../../lib';

const stories = storiesOf('ChatIcon', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ChatIcon'));

stories.addWithInfo(
  'ChatIcon',
  'This is the basic usage with the ChatIcon with providing a label to show the text.',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
      <WrapWithTheme
        themeName={select('Theme', { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' }, 'default')}
      >
        <ChatIcon
          type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'rounded')}
          text={text('Text', 'En que podemos ayudar')}
          width={number('Width', 350)}
          height={number('Height', 50)}
          margin={text('Margin', '0px 10px 0px 0px')}
          showIcon={boolean('Show Icon', true)}
          disabled={boolean('Disabled', false)}
          animationStatus={false}
          newMessages={number('New Messages', 22)}
        />
      </WrapWithTheme>
    </div>
  )
);
