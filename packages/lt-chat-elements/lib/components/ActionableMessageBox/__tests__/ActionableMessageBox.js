import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import ActionableMessageBox from '../index';
import { renderWithTheme, staticWithTheme, shallowWithTheme } from '../../../test-utils';

describe('ActionableMessageBox component', () => {
  const data = {
    actions: [
      {
        id: 1,
        name: 'Emergencia Bancaria',
      },
      {
        id: 2,
        name: 'Tarjeta de crédito',
      },
      {
        id: 3,
        name: 'Crédito Personal',
      },
      {
        id: 4,
        name: 'Otro',
      },
    ],
  };

  it('should render without data', () => {
    const component = shallow(<ActionableMessageBox data={data} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const component = shallow(<ActionableMessageBox data={data} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have the correct styles (Those that depends on the theme)', () => {
    const tree = renderWithTheme(<ActionableMessageBox data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'rgb(255,255,255)');
    expect(tree).toHaveStyleRule('font-size', 'calc(12 * 1px)');
    expect(tree).toHaveStyleRule('line-height', 'calc(16 * 1px)');
    expect(tree).toHaveStyleRule('font-weight', '500');
  });

  it('should render the correct html structure', () => {
    const wrapper = staticWithTheme(<ActionableMessageBox data={data} />);
    expect(wrapper.find('li')).toHaveLength(4);
  });

  it('should handle the click event on the items correctly', () => {
    const onClickAction = jest.fn();
    const wrapper = shallowWithTheme(<ActionableMessageBox data={data} onClickAction={onClickAction} />);

    wrapper.find('li').last().simulate('click');
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onClickAction).toHaveBeenCalledWith(data.actions[3], 3, undefined);

    onClickAction.mockClear();
    wrapper.find('li').first().simulate('click');
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onClickAction).toHaveBeenCalledWith(data.actions[0], 0, undefined);
  });
});
