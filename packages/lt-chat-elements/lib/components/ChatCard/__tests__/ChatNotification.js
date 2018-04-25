import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChatNotification from '../index';

describe('ChatNotification component', () => {
  it('should render with no props', () => {
    const component = shallow(<ChatNotification />);

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

    const component = shallow(<ChatNotification {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
