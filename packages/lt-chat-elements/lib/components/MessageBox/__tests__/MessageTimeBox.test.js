import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import MessageTimeBox from '../MessageTimeBox';
// Constants
import { renderWithTheme } from '../../../test-utils';

describe('MessageTimeBox component', () => {
  it('should render a Text Message and contain the Text and status', () => {
    const props = {
      type: 'text',
      status: 'waiting',
      date: new Date('2018-06-10 22:22:02'),
    };

    const component = shallow(<MessageTimeBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
    expect(component.find('StyledMessageTimeBoxContainer').length).toBe(1);
  });


  it('should render a Text Message and contain the Text and status', () => {
    const props = {
      type: 'text',
      status: 'received',
      date: new Date('2018-06-10 22:22:02'),
    };

    const component = shallow(<MessageTimeBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
    expect(component.find('StyledMessageTimeBoxContainer').length).toBe(1);
  });

  test('Styled: Should Render expected Styles when position is left', () => {
    const props = {
      type: 'text',
      position: 'left',
      status: 'received',
      date: new Date('2018-06-10 22:22:02'),
    };
    const tree = renderWithTheme(<MessageTimeBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
