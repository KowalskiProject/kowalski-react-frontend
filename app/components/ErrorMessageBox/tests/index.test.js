import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessageBox from '../index';

describe('<ErrorMessageBox />', () => {
  it('renders properly when there are no messages', () => {
    const renderedComponent = shallow(<ErrorMessageBox />);
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  it('renders properly when there is a message', () => {
    const renderedComponent = shallow(<ErrorMessageBox errorMsg="test" />);
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
