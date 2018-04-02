import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import PeopleFlexGrid from '../index';

describe('<PeopleFlexGrid />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <PeopleFlexGrid people={fromJS([{ kUserId: 1, name: 'Test' }])} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
