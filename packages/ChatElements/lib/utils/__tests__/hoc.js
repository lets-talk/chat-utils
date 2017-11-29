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
  const autoScrollOptions = { threshold: 20, direction: 'bottom' };
  const WithAutoScroll = withAutoScroll(autoScrollOptions)(MySimpleComponent);
  const WithLoading = withLoading(MySimpleComponent);
  const WithPaginated = withPaginated(MySimpleComponent);
  const WithScrollWatch = withScrollWatch(MySimpleComponent);
  const WithInfiniteScroll = withInfiniteScroll(MySimpleComponent);

  it('withAutoScroll: should adds autoscroll feature to a wrapper component', () => {

    const wrapper = shallow(<WithAutoScroll />);
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();

    // TODO --> Test behavior
    // const mockCallBack = jest.fn();
    // const fakeEventObject = {
    //   scrollHeight: 100, scrollTop: 10, offsetHeight: 10, preventDefault() {}, stopPropagation() {},
    // };
    // wrapper.simulate('scroll', fakeEventObject);
    // expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('withLoading: should adds loading feature to a wrapper component', () => {
    const wrapper = shallow(<WithLoading loading />);
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPaginated: should adds loading feature to a wrapper component', () => {
    const wrapper = shallow(<WithPaginated />);
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withScrollWatch: should adds loading feature to a wrapper component', () => {
    const wrapper = shallow(<WithScrollWatch />);
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withScrollWatch: should adds loading feature to a wrapper component', () => {
    const wrapper = shallow(<WithInfiniteScroll />);
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
