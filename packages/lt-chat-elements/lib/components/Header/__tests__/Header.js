import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../index';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('Header component', () => {
  it('should render with minimal props', () => {
    const component = shallow(<Header  />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const props = {
      title: 'Header Title',
      subtitle: 'Header subtitle',
      avatar: '',
      avatarStatus: 'online',
      toggleChat: () => null,
      openMenu: () => null,
      showMinimizeButton: true,
      showMenuButton: true,
    };

    const component = shallow(<Header {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  describe('Header with openMenu and toggleChat functions handlers', () => {
    it('Test toggleChat function handler is called when click on proper button', () => {
      const mockToggleChat = jest.fn();
      const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

      const props = {
        title: 'Header Title',
        subtitle: 'Header subtitle',
        avatar: '',
        avatarStatus: 'online',
        openMenu: () => null,
        showMinimizeButton: true,
        showMenuButton: true,
      };

      const button = shallow((<Header toggleChat={mockToggleChat} {...props} />));
      button.find('.letstalk-minimize-button').simulate('click', fakeEventObject);
      expect(mockToggleChat.mock.calls.length).toEqual(1);
    });
  });

  it('Test openMenu function handler is being called when clicked on proper button', () => {
    const mockOpenMenu = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      title: 'Header Title',
      subtitle: 'Header subtitle',
      avatar: '',
      avatarStatus: 'online',
      toggleChat: () => null,
      showMinimizeButton: true,
      showMenuButton: true,
    };

    const button = shallow((<Header openMenu={mockOpenMenu} {...props} />));
    button.find('.letstalk-menu-button').simulate('click', fakeEventObject);
    expect(mockOpenMenu.mock.calls.length).toEqual(1);
  });
});
