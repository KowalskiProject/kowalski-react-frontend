import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { reduxForm, Field } from 'redux-form/immutable';
import createHistory from 'history/createMemoryHistory';

import CheckboxGroupField from '../index';
import configureStore from '../../../configureStore';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

describe('<CheckboxGroupField />', () => {
  it('render', () => {
    const TestingForm =
      reduxForm({
        form: 'test',
      })(
        () => (
          <form>
            <Field
              name="test"
              id="test"
              label="test"
              component={CheckboxGroupField}
              options={[
                {
                  label: 'A',
                  value: 'A',
                },
              ]}
            />
          </form>
        )
      );
    const renderedComponent = mount(
      <Provider store={store}>
        <TestingForm />
      </Provider>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
