import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

const willMount = sinon.spy();
const didMount = sinon.spy();
const willUnmount = sinon.spy();

import {
  withInfiniteScroll,
  withScrollWatch,
  withLoading,
  withPaginated,
  withAutoScroll,
} from '../hoc';

class SimpleListComponent extends Component {
  render() {
    return (
      <div ref={this.props.cmpRef} id="super-simple-list">
        Super Simple
      </div>
    )
  }
};

describe('utils/hoc', () => {
  const MySimpleComponent = () => <div>Super Simple</div>;
  const autoScrollOptions = { threshold: 10, direction: 'bottom' };
  const WithAutoScroll = withAutoScroll(autoScrollOptions)(SimpleListComponent);
  const WithLoading = withLoading(MySimpleComponent);
  const WithPaginated = withPaginated(MySimpleComponent);
  const WithScrollWatch = withScrollWatch(MySimpleComponent);
  const WithInfiniteScroll = withInfiniteScroll(MySimpleComponent);

  //   // TODO --> Test behavior
  // it('WithInfiniteScroll: calls componentDidMount() lifecycle method', () => {
  //     // Fake windows events
  //     const map = {};
  //     window.addEventListener = jest.fn((event, cb) => {
  //       map[event] = cb;
  //     });
  //     // Mount our component
  //     const wrapper = mount(<WithInfiniteScroll />);
  //     // Call the scroll event
  //     map.scroll(fakeEventObject);
  //     // Check if everything
  //     assert.ok(WithInfiniteScroll.prototype.onScroll.calledOnce);
  // });
  //
  // it('withAutoScroll: should adds autoscroll feature to a wrapper component', () => {
  //
  //   const wrapper = shallow(<WithAutoScroll />);
  //   console.log('Wrapper is: ', wrapper.debug());
  //   expect(wrapper.length).toBe(1);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  //
  //   const mockCallBack = jest.fn();
  //   const fakeEventObject = {
  //     scrollHeight: 100, scrollTop: 10, offsetHeight: 10, preventDefault() {}, stopPropagation() {},
  //   };
  //   wrapper.simulate('scroll', fakeEventObject);
  //
  //   expect(mockCallBack.mock.calls.length).toEqual(1);
  // });

  it("Component should call componentWillReceiveProps on update", () => {
    const spy = sinon.spy(WithAutoScroll.prototype, "componentWillReceiveProps");

    const props = {
      conversations: [],
      cmpRef: null,
    };
    const wrapper = mount(<WithAutoScroll {...props} />);

    expect(spy.calledOnce).toEqual(false);
    wrapper.setProps({ prop: 2 });
    expect(spy.calledOnce).toEqual(true);
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

  it('WithInfiniteScroll: should adds loading feature to a wrapper component', () => {
    const wrapper = shallow(<WithInfiniteScroll />);
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
