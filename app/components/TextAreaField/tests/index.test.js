import React from 'react';
import { shallow } from 'enzyme';

import TextAreaInput from '../index';

describe('<TextAreaInput />', () => {
  it('renders', () => {
    const renderedComponent = shallow(
      <TextAreaInput
        input={{ id: 'test' }}
        meta={{ touched: false }}
      />
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
