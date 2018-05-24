import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import MessageForwardBox from '../MessageForwardBox';
// Constants
import { renderWithTheme } from '../../../test-utils';

describe('MessageForwardBox component', () => {
  const mockOnForwardClick = jest.fn();
  const message = {
    position: 'left',
  };
  const props = {
    message,
    onForwardClick: mockOnForwardClick,
  };

  it('should render a Text Message and contain the Text and status', () => {
    const component = shallow(<MessageForwardBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
    expect(component.find('StyledMessageForwardBox').length).toBe(1);
  });

  test('Styled: Should Render expected Styles when position is left', () => {
    const tree = renderWithTheme(<MessageForwardBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
    // background-color: ${(localProps) => rgba(themeColor(localProps.theme, 'foreground', 'base'), 0.1)};
    expect(tree).toHaveStyleRule('right', '-50px');
  });

  test('Styled: Should Render expected Styles when position is right', () => {
    const newProps = {
      message: {
        position: 'right',
      },
      onForwardClick: mockOnForwardClick,
    };
    const tree = renderWithTheme(<MessageForwardBox {...newProps} />).toJSON();
    expect(tree).toMatchSnapshot();
    // background-color: ${(localProps) => rgba(themeColor(localProps.theme, 'foreground', 'base'), 0.1)};
    expect(tree).toHaveStyleRule('left', '-50px');
  });
});
