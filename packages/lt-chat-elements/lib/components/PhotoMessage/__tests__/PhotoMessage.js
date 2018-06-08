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
    const mockOnOpen = jest.fn(() => Promise.resolve({}));
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

    const shallowComponent = shallow((<PhotoMessage onOpen={mockOnOpen} {...props} />));
    shallowComponent.find('ImageContainer').simulate('click', fakeEventObject);
    expect(mockOnOpen).toHaveBeenCalled();
  });

  it('Test clickHandler event with Promise', () => {
    const onDownloadMock = jest.fn(() => Promise.resolve({}));
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const props = {
      data: {
        width: 50,
        height: 50,
        uri: '',
        alt: 'Image alt',
        status: {
          download: false,
          click: false,
        },
      },
    };

    const shallowComponent = shallow((<PhotoMessage onDownload={onDownloadMock} {...props} />));
    shallowComponent.find('DownloadButton').simulate('click', fakeEventObject);
    expect(onDownloadMock).toHaveBeenCalled();
  });
});
