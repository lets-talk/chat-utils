import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PhotoMessage from '../index';

describe('PhotoMessage component', () => {
  it('should render without issues', () => {
    const component = shallow(<PhotoMessage />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
