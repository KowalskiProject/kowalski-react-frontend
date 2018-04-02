import React from 'react';
import { shallow } from 'enzyme';

import CentralDiv from '../index';

describe('<CentralDiv />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <CentralDiv />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
