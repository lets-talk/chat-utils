import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileMessage from '../index';

describe('FileMessage component', () => {
  const props = {
    data: {
      uri: 'https://pbs.twimg.com/profile_images/718588760003383296/2AG8omMO_400x400.jpg',
      status: {
        click: true,
        loading: 70,
        download: false,
      },
      width: 300,
      height: 300,
      size: '2Mb',
    },
  };

  it('should render without issues', () => {
    const component = shallow(<FileMessage />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data props', () => {
    const component = shallow(<FileMessage {...props} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should call the onDownload action', () => {
    const mockOnDownload = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };

    const component = shallow(<FileMessage onDownload={mockOnDownload} {...props} />);

    component.find('StyledFileDownloadButton').simulate('click', fakeEventObject);
    expect(mockOnDownload).toHaveBeenCalledTimes(1);
  });

  it('should call the onOpen action', () => {
    const mockOnOpen = jest.fn();
    const fakeEventObject = { preventDefault() {}, stopPropagation() {} };
    const customProps = {
      ...props,
      data: {
        ...props.data,
        status:
          {
            ...props.data.status,
            download: true,
          },
      },
    };

    const component = shallow(<FileMessage onOpen={mockOnOpen} {...customProps} />);
    component.find('StyledFileDownloadButton').simulate('click', fakeEventObject);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });
});
