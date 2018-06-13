import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, color, select, text } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
// Component to show on storybook
import { Button } from '../../../lib';

const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);

stories.addWithInfo(
  'Basic Usage - Button',
  'This is the basic usage of a Button.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)', height: '100%',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <Button
          type={select('Type', { button: 'button', submit: 'submit', reset: 'reset' }, 'button')}
          color={color('Color', '#7DBC37')}
          borderRadius={text('borderRadius', '5px')}
          className={text('className', '')}
          disabled={boolean('disabled', false)}
          value={text('value', 'Identificarse')}
          clickHandler={action('clickHandler')}
        />
      </WrapWithTheme>
    </div>
  )
);
