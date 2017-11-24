import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MessageBox from '../index';

describe('MessageBox component', () => {
  it('should render without issues', () => {
    const component = shallow(<MessageBox status="read" />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
