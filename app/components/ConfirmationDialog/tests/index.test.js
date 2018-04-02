import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationDialog from '../index';

describe('<ConfirmationDialog />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <ConfirmationDialog
        message="something"
        onCancel={jest.fn()}
        onConfirm={jest.fn()}
        isActive
      />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
