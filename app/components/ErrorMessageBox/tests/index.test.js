import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessageBox from '../index';

describe('<ErrorMessageBox />', () => {
  it('renders', () => {
    const renderedComponent = shallow(<ErrorMessageBox />);
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
