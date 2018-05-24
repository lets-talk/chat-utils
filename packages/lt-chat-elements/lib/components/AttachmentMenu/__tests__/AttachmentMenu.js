import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import { renderWithTheme, staticWithTheme, shallowWithTheme } from '../../../test-utils';
import AttachmentMenu from '../index';

describe('AttachmentMenu component', () => {
  const emptyData = {
    items: [],
  };

  const data = {
    items: [
      {
        id: 1,
        name: 'Imagen',
        type: 'image',
      },
      {
        id: 2,
        name: 'Video',
        type: 'video',
      },
      {
        id: 3,
        name: 'Audio',
        type: 'audio',
      },
      {
        id: 4,
        name: 'Documento',
        type: 'document',
      },
      {
        id: 5,
        name: 'Link de verificación',
        type: 'link',
      },
    ],
  };

  it('should render with empty data', () => {
    const component = shallow(<AttachmentMenu data={emptyData} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const component = shallow(<AttachmentMenu data={data} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have the correct styles (Those that depends on the theme)', () => {
    const tree = renderWithTheme(<AttachmentMenu data={data} />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background-color', 'rgb(255,255,255)');
    expect(tree).toHaveStyleRule('font-size', 'calc(12 * 1px)');
    expect(tree).toHaveStyleRule('line-height', 'calc(16 * 1px)');
    expect(tree).toHaveStyleRule('font-weight', '500');
  });

  it('should render the correct html structure', () => {
    const wrapper = staticWithTheme(<AttachmentMenu data={data} />);
    expect(wrapper.find('li')).toHaveLength(5);
  });

  it('should handle the click event on the items correctly', () => {
    const onItemClick = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };
    // const wrapper = mountWithTheme(<AttachmentMenu data={data} onItemClick={onItemClick} />);
    const wrapper = shallowWithTheme(<AttachmentMenu data={data} onItemClick={onItemClick} />);
    wrapper.find('li').last().find('div').first().simulate('click');
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onItemClick).toHaveBeenCalledWith(data.items[4], 4, undefined);

    onItemClick.mockClear();
    wrapper.find('li').first().find('div').first().simulate('click');
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onItemClick).toHaveBeenCalledWith(data.items[0], 0, undefined);

    onItemClick.mockClear();
    wrapper.find('li').at(1).find('div').first().simulate('click', fakeEventObject);
    // The function is called with the item clicked, the index and the event (item, index, e)
    expect(onItemClick).toHaveBeenCalledWith(data.items[1], 1, fakeEventObject);
  });

  it('should render ok with default icons', () => {
    const defaultIconData = {
      items: [
        {
          id: 1,
          name: 'Imagen',
          type: 'NOT_EXISTENT_TYPE',
        },
      ],
    };
    const component = shallow(<AttachmentMenu data={defaultIconData} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
