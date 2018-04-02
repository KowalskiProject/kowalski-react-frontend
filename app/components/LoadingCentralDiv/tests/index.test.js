import React from 'react';
import { shallow } from 'enzyme';

import LoadingCentralDiv from '../index';

describe('<LoadingCentralDiv />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <LoadingCentralDiv />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
