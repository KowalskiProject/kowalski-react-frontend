import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import createHistory from 'history/createMemoryHistory';

import ProjectsPage from '../index';
import configureStore from '../../../configureStore';
import { translationMessages } from '../../../i18n';
import { mockLocalStorage, unmockLocalStorage } from '../../../support/tests/stub';

const history = createHistory();
const store = configureStore({}, history);

describe('<ProjectsPage />', () => {
  beforeEach(mockLocalStorage);
  afterEach(unmockLocalStorage);

  it('renders', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translationMessages.en}>
          { React.createElement(ProjectsPage) }
        </IntlProvider>
      </Provider>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
