import React from 'react';
import { shallow } from 'enzyme';

import InputField from '../index';

describe('<InputField />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <InputField
        input={{}}
        meta={{ touched: false }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
