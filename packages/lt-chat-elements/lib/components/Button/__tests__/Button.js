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
    it('Test onClick event without Promise', () => {
      const mockCallBack = jest.fn();

      const props = {
        type: 'button',
        color: '#FEFEFE',
        className: 'my-custom-button-class',
        disabled: false,
        value: 'custom',
      };

      const button = shallow((<Button onClick={mockCallBack} {...props} />));
      button.find('.letstalk-button').simulate('click');
      expect(mockCallBack).toHaveBeenCalled();
    });
  });


  it('should mount with a Theme', () => {
    const component = mountWithTheme(<Button
      type="submit"
      value="submit"
      clickHandler={(e) => e}
    />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });
});
