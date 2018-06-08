import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChatNotification from '../index';
import { shallowWithTheme, mountWithTheme } from '../../../test-utils';

describe('ChatNotification component', () => {
  it('should render with basic required Props', () => {
    const props = {
      title: 'Do you want to see more info',
      body: 'If you want more pricing information you can talk with an Agent',
    };
    const component = shallow(<ChatNotification {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      title: 'Do you want to see more info',
      body: 'If you want more pricing information you can talk with an Agent',
      dismissText: 'Cerrar',
      showAvatars: true,
      avatarPosition: 'in',
      persons: [],
      width: 350,
      height: 100,
    };

    const component = shallow(<ChatNotification {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should render an AvatarGroup with Avatars', () => {
    const props = {
      title: 'Do you want to see more info',
      body: 'If you want more pricing information you can talk with an Agent',
      dismissText: 'Cerrar',
      showAvatars: true,
      avatarPosition: 'out',
      persons: [{
        avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
        email: '',
        type: 'Agent',
        status: 'online',
      },
      {
        avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
        email: '',
        type: 'Agent',
        status: 'online',
      },
      {
        avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
        email: '',
        type: 'Agent',
        status: 'online',
      }],
      width: 350,
      height: 100,
    };

    const component = shallowWithTheme(<ChatNotification {...props} />);
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();

    // Because this components uses ChatCard we assert there is one present and that it has the correct props passed
    expect(component.find('ChatCard').length).toBe(1);
    expect(component.find('ChatCard').props().title).toBe(props.title);
    expect(component.find('ChatCard').props().body).toBe(props.body);
    // Because we have showAvatars: true we expect this component to render an AvatarGroup with the correct props
    expect(component.find('AvatarGroup').length).toBe(1);
    expect(component.find('AvatarGroup').props().avatars).toBe(props.persons);
  });

  it('Should not render an AvatarGroup', () => {
    const props = {
      title: 'Do you want to see more info',
      body: 'If you want more pricing information you can talk with an Agent',
      dismissText: 'Close',
      showAvatars: false,
    };

    const component = shallowWithTheme(<ChatNotification {...props} />);
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();

    // Because this components uses ChatCard we assert there is one present and that it has the correct props passed
    expect(component.find('ChatCard').length).toBe(1);
    expect(component.find('ChatCard').props().title).toBe(props.title);
    expect(component.find('ChatCard').props().body).toBe(props.body);
    // Because we have showAvatars: false we expect not to see an AvatarGroup Component
    expect(component.find('AvatarGroup').length).toBe(0);
  });

  it('Should not render an AvatarGroup', () => {
    const mockOnClick = jest.fn();
    const mockOnDismiss = jest.fn();

    const props = {
      title: 'Do you want to see more info',
      body: 'If you want more pricing information you can talk with an Agent',
      dismissText: 'Close',
      showAvatars: false,
      onDismiss: mockOnDismiss,
      onClick: mockOnClick,
    };

    const component = mountWithTheme(<ChatNotification {...props} />);
    expect(component.length).toBe(1);

    component.find('StyledDismissButton').simulate('click');
    expect(mockOnDismiss).toHaveBeenCalled();
    expect(mockOnClick).not.toHaveBeenCalled();
    component.find('StyledCardBody').simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });
});
