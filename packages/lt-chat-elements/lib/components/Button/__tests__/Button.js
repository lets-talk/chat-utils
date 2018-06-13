import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mountWithTheme } from '../../../test-utils';
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
      color: '#FEFEFE',
      className: 'my-custom-button-class',
      disabled: true,
      value: 'custom',
      clickHandler: () => null,
    };

    const component = shallow(<Button {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  describe('Button with and without clickHandler', () => {
    it('Test clickHandler event without Promise', () => {
      const mockCallBack = jest.fn();
      const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

      const props = {
        type: 'button',
        color: '#FEFEFE',
        className: 'my-custom-button-class',
        disabled: false,
        value: 'custom',
      };

      const button = shallow((<Button clickHandler={mockCallBack} {...props} />));
      button.find('.letstalk-button').simulate('click', fakeEventObject);
      expect(mockCallBack).toHaveBeenCalled();
    });
  });

  it('Test clickHandler event with Promise', () => {
    const mockClickHandler = jest.fn(() => Promise.resolve({}));
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      type: 'button',
      color: '#FEFEFE',
      className: 'my-custom-button-class',
      disabled: false,
      value: 'custom',
    };

    const button = shallow((<Button clickHandler={mockClickHandler} {...props} />));
    button.find('.letstalk-button').simulate('click', fakeEventObject);
    expect(mockClickHandler).toHaveBeenCalled();
  });

  it('should mouth with a Theme', () => {
    const component = mountWithTheme(<Button
      type="submit"
      value="submit"
      clickHandler={(e) => e}
    />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });
});
