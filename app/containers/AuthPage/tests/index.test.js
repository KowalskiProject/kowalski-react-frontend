import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import createHistory from 'history/createMemoryHistory';

import AuthPage from '../index';
import { translationMessages } from '../../../i18n';
import configureStore from '../../../configureStore';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

describe('<AuthPage />', () => {
  it('renders', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translationMessages.en}>
          <AuthPage />
        </IntlProvider>
      </Provider>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
