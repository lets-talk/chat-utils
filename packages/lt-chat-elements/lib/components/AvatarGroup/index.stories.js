import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text, object, number } from '@storybook/addon-knobs';

// Component to show on storybook
import AvatarGroup from '.';
import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';

const stories = storiesOf('AvatarGroup', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('AvatarGroup'));

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

stories.addWithInfo(
  'AvatarGroup',
  'This is the basic usage with the AvatarGroup with providing a label to show the text.',
  () => (
    <div
      style={{
        position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', marginTop: '50px', marginLeft: '50px',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <AvatarGroup
          avatars={object('Avatars', avatars)}
          className={text('Classname')}
          type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'circle')}
          groupType={select('Group Type', { circle: 'circle', line: 'line' }, 'circle')}
          size={select('Size', {
            xsmall: 'xsmall', small: 'small', medium: 'medium', large: 'large', xlarge: 'xlarge',
          }, 'xsmall')}
          xDistance={number('xDistance', 12, {
            range: true, min: 1, max: 100, step: 1,
          })}
          yDistance={number('yDistance', 12, {
            range: true, min: 1, max: 100, step: 1,
          })}
          withStatus={boolean('Show Status', false)}
        />
      </WrapWithTheme>
    </div>
  )
);
