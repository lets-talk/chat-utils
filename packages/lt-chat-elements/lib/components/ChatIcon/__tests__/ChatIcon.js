import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChatIcon from '../index';
import { mountWithTheme } from '../../../test-utils';

describe('ChatIcon component', () => {
  it('should render with no props', () => {
    const component = shallow(<ChatIcon />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      type: 'circle',
      text: '',
      showIcon: true,
      height: 50,
      width: 50,
      margin: '0px 10px 0px 0px',
      chat_icon_pic: '',
      display: 'minimized',
    };

    const component = shallow(<ChatIcon {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render Icon component', () => {
    const props = {
      type: 'circle',
      text: '',
      showIcon: true,
      height: 50,
      width: 50,
      margin: '0px 10px 0px 0px',
      chat_icon_pic: {},
      display: 'minimized',
    };

    const component = mountWithTheme(<ChatIcon {...props} />);

    expect(component.length).toBe(1);
    expect(component.find('StyledButton').length).toBe(1);
    expect(component.find('StyledImageIconContainer').length).toBe(0);
  });

  it('should render with Image', () => {
    const props = {
      type: 'circle',
      text: '',
      showIcon: true,
      height: 50,
      width: 50,
      margin: '0px 10px 0px 0px',
      imageUrl: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      display: 'minimized',
    };

    const component = mountWithTheme(<ChatIcon {...props} />);

    expect(component.length).toBe(1);
    expect(component.find('StyledButton').length).toBe(0);
    expect(component.find('StyledImageIconContainer').length).toBe(1);
  });
});
