import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Tag from '../index';

describe('Tag component', () => {
  const tagData = {
    name: 'SPU-CLAVE',
  };

  it('should render with empty props', () => {
    const component = shallow(<Tag />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      data: tagData,
    };

    const component = shallow(<Tag {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
