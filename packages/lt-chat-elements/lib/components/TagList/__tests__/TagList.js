import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('Test onClick event ', () => {
    const mockCallBack = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      tags,
      cmpRef: null,
    };

    // Need to call mount because the click is triggered in the child ConversationBox item element
    const component = mount(<TagList {...props} clickItem={() => mockCallBack()} />);
    component.find('.letstalk-conversation-container').simulate('click', fakeEventObject);
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
