import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ConversationListBox from '../index';

describe('ConversationListBox component', () => {
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

  it('should render with minimal props', () => {
    const component = shallow(<ConversationListBox
      conversations={conversations}
      newConversationHandler={() => null}
    />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      conversations,
      title: 'Tus conversaciones',
      subtitle: '',
      avatar: '',
      toggleChat: null,
      openMenu: null,
      clickConversationHandler: () => null,
      newConversationHandler: () => null,
      showMinimizeButton: false,
      showMenuButton: false,
    };

    const component = shallow(<ConversationListBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
