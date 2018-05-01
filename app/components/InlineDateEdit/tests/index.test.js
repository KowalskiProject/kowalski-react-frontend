import React from 'react';
import { shallow } from 'enzyme';

import InlineDateEdit from '../index';

describe('<InlineDateEdit />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <InlineDateEdit onCommit={jest.fn()} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
