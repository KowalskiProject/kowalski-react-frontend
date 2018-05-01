import React from 'react';
import { shallow } from 'enzyme';

import OverlaySelectGroup from '../index';

describe('<OverlaySelectGroup />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <OverlaySelectGroup />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
