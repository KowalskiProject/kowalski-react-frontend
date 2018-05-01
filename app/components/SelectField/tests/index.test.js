import React from 'react';
import { shallow } from 'enzyme';

import SelectField from '../index';

describe('<SelectField />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <SelectField meta={{ touched: false }} input={{}} />
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
