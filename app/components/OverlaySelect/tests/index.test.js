import React from 'react';
import { shallow } from 'enzyme';

import OverlaySelect from '../index';

describe('<OverlaySelect />', () => {
  it('Expect to have unit tests specified', () => {
    const renderedComponent = shallow(
      <OverlaySelect
        onOptionSelect={jest.fn()}
        opened
        onDismiss={jest.fn()}
      />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
