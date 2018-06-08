import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
// Component to show on storybook
import { Sender } from '../../../lib';

const stories = storiesOf('Sender', module);
stories.addDecorator(withKnobs);

stories.addWithInfo(
  'Basic Usage - Sender',
  'This is the basic usage of a Sender.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)', height: '100%',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <Sender
          onChange={action('onChange')}
          sendMessage={action('sendMessage')}
          placeholder={text('placeholder', 'Escriba un mensaje')}
          disabled={boolean('disabled', false)}
        />
      </WrapWithTheme>
    </div>
  )
);
