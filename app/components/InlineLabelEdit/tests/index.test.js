import React from 'react';
import { shallow } from 'enzyme';

import InlineLabelEdit from '../index';

describe('<InlineLabelEdit />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <InlineLabelEdit onCommit={jest.fn()} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
