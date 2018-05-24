import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import ChatCard from '../index';
import { mountWithTheme, renderWithTheme } from '../../../test-utils';

describe('ChatCard component', () => {
  it('should render with no props', () => {
    const component = shallow(<ChatCard />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      title: 'Example Card',
      body: 'This is an example card content',
      height: 50,
      width: 50,
      showRenderProp: true,
      render: () => <h1>Render child</h1>,
    };

    const component = shallow(<ChatCard {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();

    expect(component.find('StyledCardTitle').children().text()).toContain('Example Card');
    expect(component.find('StyledCardBody').children().text()).toContain('This is an example card content');
  });

  it('should render with custom props', () => {
    const props = {
      title: 'Example Card',
      body: 'This is an example card content',
      height: 50,
      width: 150,
      showRenderProp: false,
    };

    const component = mountWithTheme(<ChatCard {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();

    expect(component.find('StyledCardTitle').children().text()).toContain('Example Card');
    expect(component.find('StyledCardBody').children().text()).toContain('This is an example card content');
  });

  it('Styled: should have the correct styles (Those that depends on the theme)', () => {
    const props = {
      title: 'Example Card',
      body: 'This is an example card content',
      height: 50,
      width: 150,
      showRenderProp: false,
    };
    const tree = renderWithTheme(<ChatCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
