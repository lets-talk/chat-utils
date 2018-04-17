import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, text } from '@storybook/addon-knobs';

// Component to show on storybook
import ActionableMessageBox from '.';
import { WrapWithTheme } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';

const stories = storiesOf('ActionableMessageBox', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ActionableMessageBox'));

const data = {
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
};

stories.addWithInfo(
  'ActionableMessageBox',
  'This is the basic usage with the ActionableMessageBox',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' }, 'default')}
      >
        <ActionableMessageBox
          onClickAction={action('onClick')}
          data={data}
        />
      </WrapWithTheme>
    </div>
  )
);
