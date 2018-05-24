import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { renderWithTheme, staticWithTheme, shallowWithTheme } from '../../../test-utils';
import ItemsMenu from '../index';

describe('ItemsMenu component', () => {
  const emptyData = [];

  const items = [
    {
      id: 1,
      name: 'Parent 1',
      greeting: '',
      hidden: false,
      internal: false,
      parent_id: null,
      priority: 1,
    },
    {
      id: 2,
      name: 'Parent 2',
      greeting: '',
      hidden: false,
      internal: false,
      parent_id: null,
      priority: 1,
    },
    {
      id: 3,
      name: 'Child 1.1',
      greeting: '',
      hidden: false,
      internal: false,
      parent_id: 1,
      priority: 1,
    },
    {
      id: 4,
      name: 'Child 1.2',
      greeting: '',
      hidden: false,
      internal: false,
      parent_id: 1,
      priority: 1,
    },
    {
      id: 5,
      name: 'Child 1.2.1',
      greeting: '',
      hidden: false,
      internal: false,
      parent_id: 4,
      priority: 1,
    },
  ];

  const render = (element) => {
    const { name } = element;
    return (
      <div>{name}</div>
    );
  };

  it('should render with empty data', () => {
    const component = shallow(<ItemsMenu items={emptyData} render={render} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const component = shallow(<ItemsMenu items={items} render={render} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have the correct styles (Those that depends on the theme)', () => {
    const tree = renderWithTheme(<ItemsMenu items={items} render={render} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'rgb(255,255,255)');
    expect(tree).toHaveStyleRule('font-size', 'calc(12 * 1px)');
    expect(tree).toHaveStyleRule('line-height', 'calc(16 * 1px)');
    expect(tree).toHaveStyleRule('font-weight', '500');
  });

  it('should render the correct html structure', () => {
    const wrapper = staticWithTheme(<ItemsMenu items={items} render={render} />);
    expect(wrapper.find('li')).toHaveLength(5);
  });

  it('should handle the click event on the items correctly', () => {
    const onItemClick = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };
    // const wrapper = mountWithTheme(<ItemsMenu items={items} onItemClick={onItemClick} />);
    const wrapper = shallowWithTheme(<ItemsMenu items={items} render={render} onItemClick={onItemClick} />);
    wrapper.find('StyledListItem').last().simulate('click');
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onItemClick).toHaveBeenCalledWith(items[4], 4, undefined);

    onItemClick.mockClear();
    wrapper.find('StyledListItem').first().simulate('click');
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onItemClick).toHaveBeenCalledWith(items[0], 0, undefined);

    onItemClick.mockClear();
    wrapper.find('StyledListItem').at(1).simulate('click', fakeEventObject);
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onItemClick).toHaveBeenCalledWith(items[1], 1, fakeEventObject);
  });
});
