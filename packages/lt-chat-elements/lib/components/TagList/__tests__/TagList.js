import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TagList from '../index';

describe('TagList component', () => {
  const tags = [
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
});
