import React from 'react';
import { shallow } from 'enzyme';

import InlineTextEdit from '../index';

describe('<InlineTextEdit />', () => {
  it('render', () => {
    const renderedComponent = shallow(
      <InlineTextEdit onCommit={jest.fn()} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
