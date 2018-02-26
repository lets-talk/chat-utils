import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActionableMessageBox from '../index';

describe('ActionableMessageBox component', () => {
  const data = {
    actions: [
      {
        id: 1,
        name: 'Emergencia Bancaria',
      },
      {
        id: 2,
        name: 'Tarjeta de crédito',
      },
      {
        id: 3,
        name: 'Crédito Personal',
      },
      {
        id: 4,
        name: 'Otro',
      },
    ],
  };

  it('should render without data', () => {
    const component = shallow(<ActionableMessageBox data={data} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with data', () => {
    const component = shallow(<ActionableMessageBox data={data} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
});
