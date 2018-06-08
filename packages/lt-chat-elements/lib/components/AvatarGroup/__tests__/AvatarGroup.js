import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import AvatarGroup from '../index';
import { renderWithTheme } from '../../../test-utils';

describe('AvatarGroup component', () => {
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

  it('should render without data', () => {
    const component = shallow(<AvatarGroup />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a group in a circle (groupType: circle)', () => {
    const component = shallow(<AvatarGroup {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a group in a line (groupType: line)', () => {
    const newProps = { ...props, groupType: 'line' };
    const component = shallow(<AvatarGroup {...newProps} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Styled: should have the correct styles (Those that depends on the theme)', () => {
    const newProps = { ...props, groupType: 'line' };
    const tree = renderWithTheme(<AvatarGroup {...newProps} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('margin-right', '30px');
  });
});
