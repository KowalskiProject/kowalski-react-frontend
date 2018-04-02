import React from 'react';
import { mount } from 'enzyme';
import { Field, reduxForm } from 'redux-form/immutable';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import configureStore from '../../../configureStore';
import TaskSelectionField from '../index';
import { translationMessages } from '../../../i18n';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

describe('<TaskSelectionField />', () => {
  it('renders', () => {
    const TestingForm =
      reduxForm({
        form: 'test',
      })(
        () => (
          <form>
            <Field
              name="taskId"
              id="taskId"
              label="task"
              component={TaskSelectionField}
              isTaskOverlaySelectOpened={false}
              onDismissTaskOverlaySelect={jest.fn()}
              onSelectTaskClicked={jest.fn()}
              onNewTaskSelected={jest.fn()}
              disabled={false}
              optionGroups={[
                {
                  label: 'test',
                  value: 'test',
                  options: [{
                    label: 'Test',
                    value: 'Test',
                  }],
                },
              ]}
            />
          </form>
        )
      );
    const renderedComponent = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translationMessages.en}>
          <TestingForm />
        </IntlProvider>
      </Provider>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
