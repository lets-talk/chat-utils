import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loader from '../index';

describe('Loader component', () => {
  it('should render with no props', () => {
    const component = shallow(<Loader />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a Loader indicator when active is true', () => {
    const props = {
      active: true,
      fullScreen: false,
      type: 'ball-pulse',
      color: false,
      className: undefined,
    };

    const component = shallow(<Loader {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render correctly with fullScreen', () => {
    const props = {
      active: true,
      fullScreen: true,
      type: 'ball-pulse',
      color: false,
      className: undefined,
    };

    const component = shallow(<Loader {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render correctly with fullScreen', () => {
    const props = {
      active: true,
      fullScreen: true,
      type: 'ball-pulse',
      color: '#FEFEFE',
      className: 'customClassName',
    };

    const component = shallow(<Loader {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render only one div when type is ball-clip-rotate', () => {
    const props = {
      active: true,
      fullScreen: true,
      type: 'ball-clip-rotate',
      color: false,
      className: undefined,
    };

    const component = shallow(<Loader {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();

    expect(component.find('.letstalk-ball-div').length).toEqual(1);
  });
});
