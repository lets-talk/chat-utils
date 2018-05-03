import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AvatarGroup from '../index';

describe('AvatarGroup component', () => {
  it('should render without data', () => {
    const component = shallow(<AvatarGroup />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const props = {
      size: 'small',
      withStatus: true,
      avatars: [
        {
          id: 1,
          type: 'Agent',
          status: 'online',
          avatar: 'http://i46.tinypic.com/sexbb8.png',
          name: 'Sandino',
          alt: 'Agent image',
        },
        {
          id: 2,
          type: 'Client',
          status: 'online',
          avatar: 'http://i46.tinypic.com/sexbb8.png',
          name: 'Sandino',
          alt: 'Client Image',
        },
        {
          id: 3,
          type: 'Bot',
          status: 'online',
          avatar: 'http://i46.tinypic.com/sexbb8.png',
          name: 'BotName',
          alt: 'Bot Image',
        },
      ],
    };

    const component = shallow(<AvatarGroup {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
