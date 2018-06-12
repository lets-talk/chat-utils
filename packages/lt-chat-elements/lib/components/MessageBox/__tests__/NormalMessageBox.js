import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import NormalMessageBox from '../NormalMessageBox';
// Constants
import constants from '../../../utils/constants';
import { renderWithTheme, mountWithTheme } from '../../../test-utils';

describe('NormalMessageBox component', () => {
  const { messagesTypes } = constants;

  const person = {
    avatar: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
    email: '',
    type: 'Client',
  };

  it('should render a Text Message and contain the Text and status', () => {
    const message = {
      type: messagesTypes.TEXT,
      text: 'Buenas Tardes',
      person,
      position: 'left',
      status: 'sent',
    };
    const props = {
      message,
    };
    const component = shallow(<NormalMessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
    expect(component.find('StyledTextMessage').childAt(0).text()).toContain('Buenas Tardes');
    expect(component.find('MessageTimeBox').length).toBe(1);
    expect(component.find('MessageTimeBox').props().status).toBe('sent');
  });

  it('should render a Typing message', () => {
    const props = {
      message: {
        type: messagesTypes.TYPING,
        person,
      },
    };
    const component = shallow(<NormalMessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a Actionable message', () => {
    const props = {
      message: {
        type: messagesTypes.ACTIONABLE,
        data: { actions: [] },
        person,
      },
    };
    const component = shallow(<NormalMessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a File message', () => {
    const props = {
      message: {
        type: messagesTypes.FILE,
        person,
      },
    };
    const component = shallow(<NormalMessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a Photo message', () => {
    const props = {
      message: {
        type: messagesTypes.PHOTO,
        person,
      },
    };
    const component = shallow(<NormalMessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a Text message', () => {
    const props = {
      message: {
        type: messagesTypes.TEXT,
        text: 'Buenas Tardes',
        status: 'read',
        person,
      },
    };

    const component = shallow(<NormalMessageBox {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });


  it('should mount a Text message. With a title and forwarded', () => {
    const props = {
      message: {
        type: messagesTypes.TEXT,
        title: 'Agent 1',
        forwarded: true,
        text: 'Buenas Tardes',
        status: 'read',
        person,
      },
    };

    const component = mountWithTheme(<NormalMessageBox {...props} />);
    expect(component.length).toBe(1);

    // Expect to have Title and Forward div
    expect(component.find('StyledMessageTitle').length).toBe(1);
    expect(component.find('StyledForwardDiv').length).toBe(1);
  });

  /* TODO -> This component has lot of Styles depending of the Type of the message
  * We SHOULD Test the computed styles inside StyledNormalMessageContainer
  */

  test('Styled: Should Render expected Styles', () => {
    const props = {
      message: {
        type: messagesTypes.TEXT,
        text: 'Buenas Tardes',
        status: 'read',
        person,
      },
    };
    const tree = renderWithTheme(<NormalMessageBox {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
    // background-color: ${(localProps) => rgba(themeColor(localProps.theme, 'foreground', 'base'), 0.1)};
    expect(tree).toHaveStyleRule('background-color', 'rgba(94,124,139,0.1)');

    // TODO -> ADD MANY MANY MORE OF THISSS
    // expect(tree).toHaveStyleRule('background-color', 'rgba(94,124,139,0.1)', {
    //   modifier: 'div',
    // });
  });
});
