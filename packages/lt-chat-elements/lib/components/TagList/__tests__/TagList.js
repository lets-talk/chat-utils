import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TagList from '../index';
import { mountWithTheme } from '../../../test-utils';

describe('TagList component', () => {
  const tags = [
    {
      name: 'SPU-LOGIN',
    },
    {
      name: 'SPU-CLAVE',
    },
  ];

  it('should render with empty props', () => {
    const component = shallow(<TagList />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      tags,
      clickItem: null,
    };

    const component = shallow(<TagList {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with no tags the empty state', () => {
    const props = {
      tags: [],
      clickItem: null,
    };

    const component = shallow(<TagList {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should respond to the onClick event', () => {
    const mockOnClickItem = jest.fn();
    const props = {
      tags,
      clickItem: mockOnClickItem,
    };

    const component = mountWithTheme(<TagList {...props} />);
    expect(component.length).toBe(1);
    // Click on the Tag and expect the prop.onClick to have been called
    component.find('StyledTagListContainer').find('Tag').last().simulate('click');
    expect(mockOnClickItem).toHaveBeenLastCalledWith({ name: 'SPU-CLAVE' }, 1, expect.any(Object));
  });

  it('should properly mount when no onClick prop is passed', () => {
    const props = {
      tags,
      clickItem: null,
    };

    const component = mountWithTheme(<TagList {...props} />);
    expect(component.length).toBe(1);
    // Click on the Tag and expect the prop.onClick to have been called
    component.find('StyledTagListContainer').find('Tag').last().simulate('click');
  });
});
