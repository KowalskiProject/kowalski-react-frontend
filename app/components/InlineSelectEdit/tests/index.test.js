import React from 'react';
import { shallow } from 'enzyme';

import InlineSelectEdit from '../index';

describe('<InlineSelectEdit />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <InlineSelectEdit options={[]} onCommit={jest.fn()} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
