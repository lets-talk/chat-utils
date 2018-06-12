import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mountWithTheme } from '../../../test-utils';
// Constants
import constants from '../../../utils/constants';
import MessageBox from '../index';

describe('MessageBox component', () => {
  const { messagesTypes } = constants;

  const person = {
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    email: '',
    type: 'Client',
  };

  it('should render a System message', () => {
    const props = {
      message: {
        type: messagesTypes.SYSTEM,
        position: 'left',
        status: 'read',
        person,
      },
    };
    const component = shallow(<MessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
    // Expect to render a <SystemMessage>
    expect(component.find('SystemMessage').length).toBe(1);
  });

  it('should render a Time message', () => {
    const props = {
      message: {
        type: messagesTypes.TIME,
        position: 'right',
        status: 'read',
        person,
      },
    };

    const component = shallow(<MessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
    // Expect to render a <TimeMarkMessage>
    expect(component.find('TimeMarkMessage').length).toBe(1);
  });

  it('should render a Normal message', () => {
    const props = {
      message: {
        type: messagesTypes.TEXT,
        position: 'left',
        status: 'read',
        person,
      },
    };

    const component = shallow(<MessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
    // Expect to render a <TimeMarkMessage>
    expect(component.find('NormalMessageBox').length).toBe(1);
  });

  it('should Mount a Normal message on the left', () => {
    const props = {
      message: {
        type: messagesTypes.TEXT,
        position: 'left',
        status: 'read',
        person,
      },
    };

    const component = mountWithTheme(<MessageBox {...props} />);

    expect(component.length).toBe(1);
    // Expect to render a <TimeMarkMessage>
    expect(component.find('NormalMessageBox').length).toBe(1);
    expect(component.find('StyledMessageBoxAvatarContainer').props().position).toBe('left');
  });

  it('should Mount a Normal message on the right', () => {
    const props = {
      message: {
        type: messagesTypes.TEXT,
        position: 'right',
        status: 'sent',
        person,
      },
    };

    const component = mountWithTheme(<MessageBox {...props} />);

    expect(component.length).toBe(1);
    // Expect to render a <TimeMarkMessage>
    expect(component.find('NormalMessageBox').length).toBe(1);
    expect(component.find('StyledMessageBoxAvatarContainer').props().position).toBe('right');
  });
});
