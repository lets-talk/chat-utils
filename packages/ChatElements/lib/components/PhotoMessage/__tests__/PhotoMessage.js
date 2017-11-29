import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PhotoMessage from '../index';

describe('PhotoMessage component', () => {
  it('should render a System message', () => {
    const props = {
      text: 'I am a photo message',
      data: {
        width: 50,
        height: 50,
        uri: '',
        alt: 'Image alt',
      },
    };
    const component = shallow(<PhotoMessage {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Test clickHandler event with Promise', () => {
    const mockClickHandler = jest.fn(() => Promise.resolve({}));
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      data: {
        width: 50,
        height: 50,
        uri: '',
        alt: 'Image alt',
        status: {
          loading: 70,
        },
      },
    };

    const button = shallow((<PhotoMessage onOpen={mockClickHandler} {...props} />));
    button.find('.letstalk-mbox-photo--img').simulate('click', fakeEventObject);
    expect(mockClickHandler.mock.calls.length).toEqual(1);
  });

  it('Test clickHandler event with Promise', () => {
    const mockClickHandler = jest.fn(() => Promise.resolve({}));
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      data: {
        width: 50,
        height: 50,
        uri: '',
        alt: 'Image alt',
        status: {
          download: true,
        },
      },
    };

    const button = shallow((<PhotoMessage onDownload={mockClickHandler} {...props} />));
    button.find('.letstalk-mbox-photo--download').simulate('click', fakeEventObject);
    expect(mockClickHandler.mock.calls.length).toEqual(1);
  });
});
