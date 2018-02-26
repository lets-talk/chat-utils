import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimeMarkMessage from '../index';

describe('TimeMarkMessage component', () => {
  it('should render without data', () => {
    const component = shallow(<TimeMarkMessage />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const props = {
      text: '28/11/2017',
    };
    const component = shallow(<TimeMarkMessage {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
