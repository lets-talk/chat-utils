import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import WidgetBox from '../index';
import { mountWithTheme } from '../../../test-utils';

describe('WidgetBox component', () => {
  it('should render with no props', () => {
    const component = shallow(<WidgetBox />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with custom props', () => {
    const props = {
      title: 'Emergencia Bancaria',
      subtitle: 'Enque te podemos ayudar',
      toggleChat: jest.fn(),
      openMenu: jest.fn(),
      showMenuButton: true,
      showMinimizeButton: true,
      height: 50,
      person: {},
    };

    /* eslint-disable react/jsx-closing-tag-location */
    const component = shallow(<WidgetBox>
      <WidgetBox.Header
        title={props.title}
        subtitle={props.subtitle}
        toggleChat={props.toggleChat}
        openMenu={props.openMenu}
        showMenuButton={props.showMenuButton}
        showMinimizeButton={props.showMinimizeButton}
        height={props.height}
        person={props.person}
      />
      <WidgetBox.Body><span>Child WidgetBox Body</span></WidgetBox.Body>
    </WidgetBox>);
    /* eslint-disable react/jsx-closing-tag-location */

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();

    expect(component.find('Header').length).toBe(1);
    expect(component.find('Body').length).toBe(1);
    expect(component.find('Body').children().text()).toBe('Child WidgetBox Body');
  });

  it('should mount the component. The component must include Header, Body and Footer', () => {
    const props = {
      title: 'Emergencia Bancaria',
      subtitle: 'Enque te podemos ayudar',
      toggleChat: jest.fn(),
      openMenu: jest.fn(),
      showMenuButton: true,
      showMinimizeButton: true,
      height: 50,
      person: {},
    };

    const component = mountWithTheme(<WidgetBox>
      <WidgetBox.Header
        title={props.title}
        subtitle={props.subtitle}
        toggleChat={props.toggleChat}
        openMenu={props.openMenu}
        showMenuButton={props.showMenuButton}
        showMinimizeButton={props.showMinimizeButton}
        height={props.height}
        person={props.person}
      />
      <WidgetBox.Body>
        <span>Child WidgetBox Body</span>
      </WidgetBox.Body>
      <WidgetBox.Footer>
        <span>I am a footer</span>
      </WidgetBox.Footer>
    </WidgetBox>);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();

    expect(component.find('Header').length).toBe(1);
    expect(component.find('Footer').length).toBe(1);
    expect(component.find('Body').length).toBe(1);
    expect(component.find('Body').children().text()).toBe('Child WidgetBox Body');
  });
});
