import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

// Component to show on storybook
import { Avatar } from '../../../lib';
import { WrapWithTheme } from '../../utils/stories';

const stories = storiesOf('Avatar', module);
stories.addDecorator(withKnobs);

stories.addWithInfo(
  'Avatar',
  'This is the basic usage with the Avatar with providing a label to show the text.',
  () => (
    <WrapWithTheme
      themeName={select('Theme', { default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme' }, 'default')}
    >
      <Avatar
        src="http://i46.tinypic.com/sexbb8.png"
        type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'circle')}
        size={select('Size', {
          xsmall: 'xsmall', small: 'small', medium: 'medium', large: 'large', xlarge: 'xlarge',
        }, 'medium')}
        withStatus={boolean('Show Status', false)}
        status={select('Status', {
          online: 'online', offline: 'offline', sleeping: 'sleeping',
        }, 'online')}
      />
    </WrapWithTheme>
  )
);
