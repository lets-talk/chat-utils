import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../index';

describe('Button component', () => {
  it('should render with minimal props', () => {
    const component = shallow(<Button type="submit" value="submit" clickHandler={(e) => e} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const props = {
      type: 'button',
      className: 'my-custom-button-class',
      disabled: false,
      value: 'custom',
      clickHandler: () => null,
    };

    const component = shallow(<Button {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
