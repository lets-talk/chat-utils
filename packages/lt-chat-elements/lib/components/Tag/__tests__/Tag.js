import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ConversationList from '../index';

describe('ConversationList component', () => {
  const conversations = [
    {
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
    },
  ];

  it('should render with empty props', () => {
    const component = shallow(<ConversationList />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      conversations,
      clickItem: null,
      cmpRef: null,
      emptyStateText: 'No hay mas conversaciones',
    };

    const component = shallow(<ConversationList {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with no conversation the empty state', () => {
    const props = {
      conversations: [],
      clickItem: null,
      cmpRef: null,
      emptyStateText: 'No hay mas conversaciones',
    };

    const component = shallow(<ConversationList {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Test onClick event ', () => {
    const mockCallBack = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      conversations,
      cmpRef: null,
      emptyStateText: 'No hay mas conversaciones',
    };

    // Need to call mount because the click is triggered in the child ConversationBox item element
    const component = mount(<ConversationList {...props} clickItem={() => mockCallBack()} />);
    component.find('.letstalk-conversation-container').simulate('click', fakeEventObject);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
