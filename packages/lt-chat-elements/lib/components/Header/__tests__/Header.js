import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
import Header from '../index';

import { mountWithTheme } from '../../../test-utils';

describe('Header component', () => {
  const person = {
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    email: '',
    type: 'Client',
  };

  it('should render with minimal props', () => {
    const component = shallow(<Header />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const props = {
      title: 'Header Title',
      subtitle: 'Header subtitle',
      person: {},
      toggleChat: () => null,
      openMenu: () => null,
      showMinimizeButton: true,
      showMenuButton: true,
    };

    const component = shallow(<Header {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with a person and display an avatar', () => {
    const props = {
      title: 'Header Title',
      subtitle: 'Header subtitle',
      person,
      toggleChat: () => null,
      openMenu: () => null,
      showMinimizeButton: true,
      showMenuButton: true,
    };

    const component = shallow(<Header {...props} />);

    expect(component.length).toBe(1);
    // Expect component to display an <Avatar> component
    expect(component.find('Avatar').length).toBe(1);
  });

  describe('Header with openMenu and toggleChat functions handlers', () => {
    it('Test toggleChat function handler is called when click on proper button', () => {
      const mockToggleChat = jest.fn();
      const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

      const props = {
        title: 'Header Title',
        subtitle: 'Header subtitle',
        person: {},
        toggleChat: mockToggleChat,
        showMinimizeButton: true,
        showMenuButton: true,
      };

      const wrapper = mountWithTheme(<Header toggleChat={mockToggleChat} {...props} />);
      wrapper.find('button').last().simulate('click', fakeEventObject);
      expect(mockToggleChat).toHaveBeenCalled();
    });

    it('Test openMenu function handler is being called when clicked on proper button', () => {
      const mockOpenMenu = jest.fn();
      const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

      const props = {
        title: 'Header Title',
        subtitle: 'Header subtitle',
        person: {},
        openMenu: mockOpenMenu,
        showMinimizeButton: true,
        showMenuButton: true,
      };

      const wrapper = mountWithTheme(<Header openMenu={mockOpenMenu} {...props} />);
      wrapper.find('button').first().simulate('click', fakeEventObject);
      expect(mockOpenMenu).toHaveBeenCalled();
    });

    it('Test custom leftButtons and rightButtons. Check functions handlers are being called when clicked on proper buttons', () => {
      const fakeEventObject = { preventDefault() {}, stopPropagation() {} };
      const mockLeftButtonClick = jest.fn();
      const mockRightButtonClick = jest.fn();

      const props = {
        title: 'Header Title',
        subtitle: 'Header subtitle',
        person: {},
        showMinimizeButton: false,
        showMenuButton: false,
        leftButtons: [
          {
            id: 'leftButton',
            icon: '<i>Left Button</i>',
            onClick: mockLeftButtonClick,
          },
        ],
        rightButtons: [
          {
            id: 'rightButton',
            icon: '<i>Right Button</i>',
            onClick: mockRightButtonClick,
          },
        ],
      };

      const wrapper = mountWithTheme(<Header {...props} />);
      wrapper.find('button').first().simulate('click', fakeEventObject);
      expect(mockLeftButtonClick).toHaveBeenCalled();
      expect(mockRightButtonClick).not.toHaveBeenCalled();
      wrapper.find('button').last().simulate('click', fakeEventObject);
      expect(mockRightButtonClick).toHaveBeenCalled();
    });
  });
});
