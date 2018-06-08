import React from 'react';
import { shallow } from 'enzyme';

import MessageList from '../index';

describe('<MessageList /> component', () => {
  it('matches snapshot', () => {
    const list = shallow(<MessageList><div>Child 1</div><div>Child 2</div></MessageList>);
    expect(list).toMatchSnapshot();
  });

  it('renders children inside', () => {
    const list = shallow(<MessageList><div>Child 1</div><div>Child 2</div></MessageList>);
    expect(list.find('div').length).toBe(2);
  });
});
