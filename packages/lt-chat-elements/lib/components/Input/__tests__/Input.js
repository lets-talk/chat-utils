import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mountWithTheme } from '../../../test-utils';
import Input from '../index';

describe('Input component', () => {
  it('should render a text Input', () => {
    const component = shallow(<Input
      type="text"
      label="USERNAME"
      name="username"
      value=""
      width={150}
      placeholder="Your username"
    />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should render a password input', () => {
    const component = shallow(<Input
      type="password"
      label=""
      name="password"
      value=""
      width={150}
      placeholder=""
    />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should mouth with a Theme', () => {
    const component = mountWithTheme(<Input
      type="password"
      label=""
      name="password"
      value=""
      width={150}
      placeholder=""
    />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });
});
