import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import {
  withInfiniteScroll,
  withScrollWatch,
  withLoading,
  withPaginated,
  withAutoScroll,
} from '../hoc';

describe('utils/hoc', () => {
  const MySimpleComponent = () => <div>Super Simple</div>;
  const autoScrollOptions = { threshold: 300, direction: 'bottom' };
  const WithScroll = withAutoScroll(autoScrollOptions)(MySimpleComponent);

  it('withAutoScroll: should adds autoscroll feature to a wrapper component', () => {
    const mockCallBack = jest.fn();
    const fakeEventObject = {
      scrollHeight: 100, scrollTop: 10, offsetHeight: 10, preventDefault() {}, stopPropagation() {},
    };

    const wrapper = shallow(<WithScroll />);
    wrapper.simulate('scroll', fakeEventObject);
    expect(mockCallBack.mock.calls.length).toEqual(1);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
