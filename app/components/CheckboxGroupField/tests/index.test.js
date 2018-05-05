import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { reduxForm, Field } from 'redux-form/immutable';
import createHistory from 'history/createMemoryHistory';
import { fromJS } from 'immutable';

import CheckboxGroupField from '../index';
import configureStore from '../../../configureStore';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

const renderComponent = () => {
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
              { label: 'A', value: 'A' },
              { label: 'B', value: 'B' },
            ]}
          />
        </form>
      )
    );
  return mount(
    <Provider store={store}>
      <TestingForm />
    </Provider>
  );
};

describe('<CheckboxGroupField />', () => {
  it('render', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  it('updates the state accordingly', () => {
    const renderedComponent = renderComponent();
    const getStoreValue = () => (store.getState().get('form').get('test').get('values') || fromJS({})).get('test');
    expect(getStoreValue()).toBeFalsy();
    renderedComponent.find('input[type="checkbox"][value="A"]').first().simulate('change', { target: { checked: true } });
    expect(getStoreValue()).toEqual(fromJS(['A']));
    renderedComponent.find('input[type="checkbox"][value="B"]').first().simulate('change', { target: { checked: true } });
    expect(getStoreValue()).toEqual(fromJS(['A', 'B']));
    renderedComponent.find('input[type="checkbox"][value="B"]').first().simulate('change', { target: { checked: false } });
    expect(getStoreValue()).toEqual(fromJS(['A']));
    renderedComponent.find('input[type="checkbox"][value="A"]').first().simulate('change', { target: { checked: false } });
    expect(getStoreValue()).toEqual(fromJS([]));
  });
});
