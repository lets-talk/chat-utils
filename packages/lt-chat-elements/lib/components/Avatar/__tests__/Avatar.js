import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Avatar from '../index';

describe('Avatar component', () => {
  it('should render without data', () => {
    const component = shallow(<Avatar />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const props = {
      type: 'circle',
      size: 'small',
      withStatus: true,
      status: 'online',
      src: 'http://i46.tinypic.com/sexbb8.png',
      alt: 'An avatar image',
    };

    const component = shallow(<Avatar {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
