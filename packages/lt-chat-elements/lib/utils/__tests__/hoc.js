import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { withAutoScroll } from '../hoc';

const SimpleItemsList = (props) => {
  const { items, cmpRef } = props;
  return (
    <ul ref={cmpRef} id="super-simple-list">
      {
        items.map((item) => (<li key={item.name}>{item.name}</li>))
      }
    </ul>
  );
};

SimpleItemsList.propTypes = {
  items: PropTypes.array,
  cmpRef: PropTypes.func,
};

describe('utils/hoc', () => {
  const autoScrollOptions = { threshold: 10, direction: 'bottom' };

  const props = {
    items: [
      { name: 'Item1' },
      { name: 'Item2' },
      { name: 'Item3' },
      { name: 'Item4' },
      { name: 'Item5' },
      { name: 'Item6' },
    ],
  };

  it('withAutoScroll: calls getBottom(). Direction top call it when bottom above threshold', () => {
    const SimpleItemsListHOC = withAutoScroll(autoScrollOptions)(SimpleItemsList);
    // Mock getBottom to return 20 -> should trigger a calculation
    SimpleItemsListHOC.prototype.getBottom = jest.fn(() => 20);

    // Mount our component
    const wrapper = mount(<SimpleItemsListHOC {...props} />);
    wrapper.setProps({
      items: [...props.items, { name: 'Item7' }, { name: 'Item8' }, { name: 'Item9' }],
    });
    // Call the scroll event
    wrapper.simulate('scroll');
    // Check if event is called !!
    expect(SimpleItemsListHOC.prototype.getBottom).toHaveBeenCalled();
    expect(wrapper.getDOMNode().scrollTop).toBe(wrapper.getDOMNode().scrollHeight);
  });

  it('withAutoScroll: calls getBottom(). Direction bottom call it when bottom bellow threshold', () => {
    const SimpleItemsListHOC = withAutoScroll({ threshold: 10, direction: 'top' })(SimpleItemsList);
    // Mock getBottom to return 5 -> should trigger a calculation
    SimpleItemsListHOC.prototype.getBottom = jest.fn(() => 5);

    // Mount our component
    const wrapper = mount(<SimpleItemsListHOC {...props} />);

    wrapper.setProps({
      items: [...props.items, { name: 'Item7' }, { name: 'Item8' }, { name: 'Item9' }],
    });
    // Call the scroll event
    wrapper.simulate('scroll');
    // Check if event is called !!
    expect(SimpleItemsListHOC.prototype.getBottom).toHaveBeenCalled();
    expect(wrapper.getDOMNode().scrollTop).toBe(0);
  });


  it('withAutoScroll: calls getBottom(). Expect Lockable prop to work', () => {
    const SimpleItemsListHOC = withAutoScroll({ threshold: 10, direction: 'top', lockable: true })(SimpleItemsList);
    // Mock getBottom to return 5 -> should NOT trigger a calculation
    SimpleItemsListHOC.prototype.getBottom = jest.fn(() => 50);

    // Mount our component
    const wrapper = mount(<SimpleItemsListHOC {...props} />);
    wrapper.setProps({
      items: [...props.items, { name: 'Item7' }, { name: 'Item8' }, { name: 'Item9' }],
    });
    // Call the scroll event
    wrapper.simulate('scroll');
    // Check if event is called !!
    expect(SimpleItemsListHOC.prototype.getBottom).toHaveBeenCalled();
    expect(wrapper.getDOMNode().scrollTop).toBe(wrapper.getDOMNode().scrollHeight - wrapper.getDOMNode().offsetHeight - 50);
  });


  it('withAutoScroll: calls getBottom(). Not mocking getBottom', () => {
    const SimpleItemsListHOC = withAutoScroll({ threshold: 10, direction: 'top' })(SimpleItemsList);
    // Mount our component
    const wrapper = mount(<SimpleItemsListHOC {...props} />);
    wrapper.setProps({
      items: [...props.items, { name: 'Item7' }, { name: 'Item8' }, { name: 'Item9' }],
    });
    // Call the scroll event
    wrapper.simulate('scroll');
    // Check if event is called !!
    expect(wrapper.getDOMNode().scrollTop).toBe(0);
  });
});
