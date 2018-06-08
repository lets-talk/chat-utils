import React from 'react';
// Storybook stuff
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, select, object } from '@storybook/addon-knobs';

// Component to show on storybook
import AttachmentMenu from '.';
import { WrapWithTheme, defaultTheme, themeOptions } from '../../utils/stories';
import withTests from '../../test-utils/storiesWithTest';

const stories = storiesOf('AttachmentMenu', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withTests('AttachmentMenu'));

const data = {
  items: [
    {
      id: 1,
      name: 'Imagen',
      type: 'image',
    },
    {
      id: 2,
      name: 'Video',
      type: 'video',
    },
    {
      id: 3,
      name: 'Audio',
      type: 'audio',
    },
    {
      id: 4,
      name: 'Documento',
      type: 'document',
    },
    {
      id: 5,
      name: 'Link de verificación',
      type: 'link',
    },
  ],
};

stories.addWithInfo(
  'AttachmentMenu',
  'This is the basic usage with the AttachmentMenu',
  () => (
    <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
      <WrapWithTheme
        themeName={select('Theme', themeOptions, defaultTheme)}
      >
        <AttachmentMenu
          onClickAction={action('onClick')}
          iconSize={number('IconSize', 20)}
          data={object('Data', data)}
        />
      </WrapWithTheme>
    </div>
  )
);
