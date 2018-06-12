import React from 'react';
import { shallow } from 'enzyme';

import ScrollableList from '../index';

describe('<ScrollableList /> component', () => {
  it('matches snapshot', () => {
    const list = shallow(<ScrollableList><div>Child 1</div><div>Child 2</div></ScrollableList>);
    expect(list).toMatchSnapshot();
  });

  it('renders children inside', () => {
    const list = shallow(<ScrollableList><div>Child 1</div><div>Child 2</div></ScrollableList>);
    expect(list.find('div').length).toBe(2);
  });
});
