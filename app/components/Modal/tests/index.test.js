import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../index';

describe('<Modal />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <Modal />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
