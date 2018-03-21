import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
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
});