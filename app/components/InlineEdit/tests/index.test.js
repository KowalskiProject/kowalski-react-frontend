import React from 'react';
import { shallow } from 'enzyme';

import InlineEdit from '../index';

describe('<InlineEdit />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <InlineEdit onCommit={jest.fn()} renderEditComponent={jest.fn()} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
