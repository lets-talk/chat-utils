import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MessageBox from '../index';
// Constants
import constants from '../../../utils/constants';

describe('MessageBox component', () => {
  const person = {
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    email: '',
    type: 'Client',
  };

  const { messagesTypes } = constants;

  it('should render without issues', () => {
    const component = shallow(<MessageBox status="read" person={person} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a System message', () => {
    const props = {
      type: messagesTypes.SYSTEM,
      status: 'read',
      person,
    };
    const component = shallow(<MessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render without issues', () => {
    const props = {
      type: messagesTypes.TIME,
      status: 'read',
      person,
    };

    const component = shallow(<MessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
