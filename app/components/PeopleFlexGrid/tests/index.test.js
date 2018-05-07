import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';

import PeopleFlexGrid from '../index';

describe('<PeopleFlexGrid />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <PeopleFlexGrid people={fromJS([{ kUserId: 1, name: 'Test' }])} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  it('callbacks personSelected properly', () => {
    const personSelect = jest.fn();
    const renderedComponent = mount(
      <PeopleFlexGrid
        personSelected={personSelect}
        people={fromJS([{ kUserId: 1, name: 'Test' }])}
      />
    );
    renderedComponent.find('div[role="button"]').simulate('click');
    expect(personSelect).toHaveBeenCalledWith(1);
  });
});
