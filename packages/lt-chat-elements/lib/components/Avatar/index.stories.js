import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, color, select, text } from '@storybook/addon-knobs';

// Component to show on storybook
import { Avatar } from '../../../lib';
import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';

const stories = storiesOf('Avatar', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('Avatar'));

stories.addWithInfo(
  'Avatar with Image',
  'This is the basic usage with the Avatar with image src.',
  () => (
    <WrapWithTheme
      themeName={select('Theme', themeOptions, defaultTheme)}
    >
      <Avatar
        src="http://i46.tinypic.com/sexbb8.png"
        className={text('Classname')}
        type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'circle')}
        size={select('Size', {
          xsmall: 'xsmall', small: 'small', medium: 'medium', large: 'large', xlarge: 'xlarge',
        }, 'medium')}
        withStatus={boolean('Show Status', false)}
        status={select('Status', {
          online: 'online', offline: 'offline', sleeping: 'sleeping', live: 'live',
        }, 'online')}
      />
    </WrapWithTheme>
  )
);

stories.addWithInfo(
  'Avatar with Letter',
  'This is the basic usage with the Avatar with providing a label to show the text.',
  () => (
    <WrapWithTheme
      themeName={select('Theme', themeOptions, defaultTheme)}
    >
      <Avatar
        className={text('Classname')}
        type={select('Type', { default: 'default', rounded: 'rounded', circle: 'circle' }, 'circle')}
        size={select('Size', {
          xsmall: 'xsmall', small: 'small', medium: 'medium', large: 'large', xlarge: 'xlarge',
        }, 'medium')}
        withStatus={boolean('Show Status', false)}
        status={select('Status', {
          online: 'online', offline: 'offline', sleeping: 'sleeping', live: 'live',
        }, 'online')}
        color={color('Color', false)}
      >
      A
      </Avatar>
    </WrapWithTheme>
  )
);
