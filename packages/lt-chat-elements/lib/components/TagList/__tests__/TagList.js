import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TagList from '../index';
import { mountWithTheme } from '../../../test-utils';

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

  it('Test onClick event ', () => {
    const mockCallBack = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      tags,
      cmpRef: null,
    };

    // Need to call mount because the click is triggered in the child ConversationBox item element
    const component = mountWithTheme(<TagList {...props} clickItem={() => mockCallBack()} />);

    component.find('.LT-TagList-Container').simulate('click', fakeEventObject);
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
