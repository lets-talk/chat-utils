import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { shallowWithTheme, mountWithTheme } from '../../../test-utils';
import Avatar from '../index';

describe('Avatar component', () => {
  it('should render without data', () => {
    const component = shallow(<Avatar />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data and circle case', () => {
    const props = {
      type: 'circle',
      size: 'small',
      withStatus: true,
      status: 'online',
      src: 'http://i46.tinypic.com/sexbb8.png',
      alt: 'An avatar image',
    };

    const component = shallow(<Avatar {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data and children case (String children)', () => {
    const props = {
      type: 'circle',
      size: 'xsmall',
      withStatus: true,
      status: 'live',
      src: 'http://i46.tinypic.com/sexbb8.png',
      alt: 'An avatar image',
      color: '#FEFEFE',
    };

    const component = shallowWithTheme(<Avatar {...props}>S</Avatar>);
    expect(toJson(component)).toMatchSnapshot();

    expect(component.length).toBe(1);
    expect(component.find('StyledChildrenContainer').childAt(0).text()).toBe('S');
    expect(component.find('StyledAvatarStatus').props().size).toBe('xsmall');
    expect(component.find('StyledAvatarStatus').props().status).toBe('live');
  });

  it('should render with data and children case (Component children)', () => {
    const props = {
      type: 'circle',
      size: 'medium',
      withStatus: true,
      status: 'online',
      src: 'http://i46.tinypic.com/sexbb8.png',
      alt: 'An avatar image',
      color: '#FEFEFE',
    };

    const SimpleComponent = () => <h1>Simple component</h1>;

    const component = shallowWithTheme(<Avatar {...props}><SimpleComponent /></Avatar>);
    expect(toJson(component)).toMatchSnapshot();

    expect(component.length).toBe(1);
    // Expect the component to render the <SimpleComponent>
    expect(component.find('StyledChildrenContainer').find('SimpleComponent').length).toBe(1);
    // Expect the component have the proper props()
    expect(component.find('StyledAvatarStatus').props().size).toBe('medium');
    expect(component.find('StyledAvatarStatus').props().status).toBe('online');
  });

  it('should mount with data and children case (Component children)', () => {
    let newProps;
    let component;
    const props = {
      type: 'default', // Test using default case
      size: 'xlarge',
      withStatus: false,
      status: 'online',
      src: 'http://i46.tinypic.com/sexbb8.png',
      alt: 'An avatar image',
      color: '#FEFEFE',
    };

    const SimpleComponent = () => <h1>Simple component</h1>;

    component = mountWithTheme(<Avatar {...props}><SimpleComponent /></Avatar>);
    expect(component.length).toBe(1);
    // Expect the component to render the <SimpleComponent> and have the content we passed
    expect(component.find('StyledChildrenContainer').find('SimpleComponent').length).toBe(1);
    expect(component.find('StyledChildrenContainer').text()).toContain('Simple component');

    // Now the same but rounded
    newProps = { ...props, type: 'rounded' };
    component = mountWithTheme(<Avatar {...newProps}><SimpleComponent /></Avatar>);
    expect(component.length).toBe(1);
    // TODO -> Assert something specific here

    // Now the same but circle
    newProps = { ...props, type: 'circle' };
    component = mountWithTheme(<Avatar {...newProps}><SimpleComponent /></Avatar>);
    expect(component.length).toBe(1);
    // TODO -> Assert something specific here
  });

  it('Should render proper status and size', () => {
    let component;
    let newProps;

    const props = {
      type: 'circle',
      size: 'xsmall',
      withStatus: true,
      status: 'live',
      src: 'http://i46.tinypic.com/sexbb8.png',
      alt: 'An avatar image',
    };

    component = mountWithTheme(<Avatar {...props}></Avatar>);

    expect(component.length).toBe(1);
    expect(component.find('StyledAvatarStatus').props().size).toBe('xsmall');
    expect(component.find('StyledAvatarStatus').props().status).toBe('live');

    newProps = { ...props, status: 'offline', size: 'small' };
    component = mountWithTheme(<Avatar {...newProps}></Avatar>);

    expect(component.length).toBe(1);
    expect(component.find('StyledAvatarStatus').props().size).toBe('small');
    expect(component.find('StyledAvatarStatus').props().status).toBe('offline');

    newProps = { ...props, status: 'online', size: 'medium' };
    component = mountWithTheme(<Avatar {...newProps}></Avatar>);

    expect(component.length).toBe(1);
    expect(component.find('StyledAvatarStatus').props().size).toBe('medium');
    expect(component.find('StyledAvatarStatus').props().status).toBe('online');

    newProps = {
      ...props, status: 'sleeping', size: 'large', type: 'rounded',
    };
    component = mountWithTheme(<Avatar {...newProps}></Avatar>);

    expect(component.length).toBe(1);
    expect(component.find('StyledAvatarStatus').props().size).toBe('large');
    expect(component.find('StyledAvatarStatus').props().status).toBe('sleeping');
  });
});
