import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChatIcon from '../index';

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
});
