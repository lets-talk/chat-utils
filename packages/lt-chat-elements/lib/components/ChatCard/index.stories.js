import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select, boolean } from '@storybook/addon-knobs';

import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';
// Component to show on storybook
import ChatCard from './';

const stories = storiesOf('ChatCard', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('ChatCard'));

stories.addWithInfo(
  'ChatCard',
  'This is the basic usage with the ChatCard with providing a label to show the text.',
  () => (
    <div
      style={{
        position: 'absolute', top: '50%', left: '50%', marginTop: '50px', marginLeft: '50px',
      }}
    >
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <ChatCard
          title={text('Title', 'Hey There!!')}
          body={text('Content', 'Questions? We can help!')}
          width={number('Width', 200)}
          height={number('Height', 100)}
          margin={text('Margin', '0px 10px 0px 0px')}
          showRenderProp={boolean('showRenderProp', false)}
          render={() => <h3>Can show any Component </h3>}
        />
      </WrapWithTheme>
    </div>
  )
);
