import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import SystemMessage from '../index';
import { renderWithTheme } from '../../../test-utils';

describe('SystemMessage component', () => {
  it('should render without issues', () => {
    const message = { text: 'Someone jointed the conversation' };
    const component = shallow(<SystemMessage message={message} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('Styled: Should Render expected Styles', () => {
    const message = { text: 'Someone jointed the conversation' };
    const tree = renderWithTheme(<SystemMessage message={message} />).toJSON();
    expect(tree).toMatchSnapshot();
    // expect(tree).toHaveStyleRule('background-color', 'rgba(94,124,139,0.1)');
  });
});
