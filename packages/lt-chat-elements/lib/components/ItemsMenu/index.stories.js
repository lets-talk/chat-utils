import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, object } from '@storybook/addon-knobs';

// Component to show on storybook
import ItemsMenu from '.';
import { Avatar } from '../../../lib';
import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';

const stories = storiesOf('ItemsMenu', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ItemsMenu'));

const items = [
  {
    id: 1,
    name: 'Parent 1',
    greeting: '',
  },
  {
    id: 2,
    name: 'Parent 2',
    greeting: '',
  },
  {
    id: 3,
    name: 'Child 1.1',
    greeting: '',
  },
  {
    id: 4,
    name: 'Child 1.2',
    greeting: '',
  },
  {
    id: 5,
    name: 'Child 1.2.1',
    greeting: '',
  },
];

const render = (element) => {
  const { name } = element;
  return (
    <span>
      <Avatar src="http://i46.tinypic.com/sexbb8.png" size="xsmall" />{name}
    </span>
  );
};

stories.addWithInfo(
  'ItemsMenu',
  'This is the basic usage with the ItemsMenu',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <ItemsMenu
          withDivider={boolean('withDivider', true)}
          onItemClick={action('onItemClick')}
          items={object('Items', items)}
          render={render}
        />
      </WrapWithTheme>
    </div>
  )
);
