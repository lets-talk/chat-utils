import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import { renderWithTheme } from '../../../test-utils';
import ConversationBox from '../index';

describe('ConversationBox component', () => {
  // Fake the Date.now so test always returns 9 hours
  // This is equivalent to the 19/11/2017 -> 1511136000000
  Date.now = jest.fn(() => new Date(Date.UTC(2017, 10, 20)).valueOf());
  const conversation = {
    client: {
      name: 'Georgia Harmon',
      avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    },
    last_message: {
      type: 'normal',
      status: 'read',
      content: 'Lorem ipusum la la ejemplo largo',
      created_at: '2017-11-20T09:43:57.000-0300',
    },
    tags: [
      {
        name: 'SPU-CLAVE',
      },
    ],
  };

  it('should render with minimal props', () => {
    const component = shallow(<ConversationBox conversation={conversation} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      conversation,
      onClick: () => null,
    };

    const component = shallow(<ConversationBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have the correct styles (Those that depends on the theme) type=internal', () => {
    const props = {
      conversation: {
        ...conversation,
        last_message: {
          ...conversation.last_message,
          type: 'internal',
        },
      },
      onClick: () => null,
    };
    const tree = renderWithTheme(<ConversationBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'rgba(255,213,0,0.2)');
  });

  it('should have the correct styles (Those that depends on the theme) type=important', () => {
    const props = {
      conversation: {
        ...conversation,
        last_message: {
          ...conversation.last_message,
          type: 'important',
        },
      },
      onClick: () => null,
    };
    const tree = renderWithTheme(<ConversationBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'rgb(255,246,244)');
  });
});
