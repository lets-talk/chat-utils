import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../index';

describe('Loading component', () => {
  it('should render without issues when isLoading is false', () => {
    const props = {
      isLoading: false,
      pastDelay: 200,
      error: null,
    };

    const component = shallow(<Loading {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a Loading indicator when isLoading is true', () => {
    const props = {
      isLoading: true,
      pastDelay: 200,
      error: null,
    };
    const component = shallow(<Loading {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render an error when isLoading is true and there is error object', () => {
    const props = {
      isLoading: false,
      pastDelay: 200,
      error: {},
    };

    const component = shallow(<Loading {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
