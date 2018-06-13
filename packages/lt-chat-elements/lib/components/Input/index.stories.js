import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, text } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
// Component to show on storybook
import { Input } from '../../../lib';

const stories = storiesOf('Input', module);
stories.addDecorator(withKnobs);

stories.addWithInfo(
  'Basic Usage - Input',
  'This is the basic usage of a Input.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)', height: '100%',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <Input
          type={text('type', 'text')}
          name={text('name', 'username')}
          label={text('label', '')}
          width={number('width', 250)}
          placeholder={text('placeholder', 'Ingresa tu nombre')}
        />
      </WrapWithTheme>
    </div>
  )
);
