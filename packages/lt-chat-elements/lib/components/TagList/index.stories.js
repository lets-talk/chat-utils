import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, object } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
// Component to show on storybook
import { TagList } from '../../../lib';

const stories = storiesOf('TagList', module);
stories.addDecorator(withKnobs);


const tags = [
  { name: 'Tag1 Name' },
  { name: 'Tag2 Name' },
];

stories.addWithInfo(
  'Basic Usage - TagList',
  'This is the basic usage of a TagList.',
  () => (
    <div
      style={{
        position: 'fixed', bottom: 0, right: '10px', width: 'calc(100% - 20px)', height: '100%',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <TagList
          tags={object('tags', tags)}
          clickItem={action('clickItem')}
        />
      </WrapWithTheme>
    </div>
  )
);
