import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import TimeMarkMessage from '../index';
import { mountWithTheme, renderWithTheme } from '../../../test-utils';


describe('TimeMarkMessage component', () => {
  it('should render without data', () => {
    const component = shallow(<TimeMarkMessage />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const props = {
      text: '28/11/2017',
    };
    const component = shallow(<TimeMarkMessage {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should mount with data and proper styles', () => {
    const props = {
      text: '28/11/2017',
    };
    const component = mountWithTheme(<TimeMarkMessage {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('Styled: Should Render expected Styles', () => {
    const props = {
      text: '28/11/2017',
    };
    const tree = renderWithTheme(<TimeMarkMessage {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
    // background-color: ${(props) => rgba(themeColor(props.theme, 'foreground', 'base'), 0.1)};
    expect(tree).toHaveStyleRule('background-color', 'rgba(94,124,139,0.1)', {
      modifier: 'div',
    });
    // color: ${(props) => textColor(props.theme, 'light', 'secondary')};
    expect(tree).toHaveStyleRule('color', 'rgba(0,0,0,0.54)', {
      modifier: 'div > span',
    });
  });
});
