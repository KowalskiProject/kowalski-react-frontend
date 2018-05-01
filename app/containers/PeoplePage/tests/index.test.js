import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { IntlProvider } from 'react-intl';
import createHistory from 'history/createMemoryHistory';

import PeoplePage from '../index';
import { mockLocalStorage, unmockLocalStorage } from '../../../support/tests/stub';
import { translationMessages } from '../../../i18n';
import configureStore from '../../../configureStore';

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

describe('<PeoplePage />', () => {
  beforeEach(mockLocalStorage);
  afterEach(unmockLocalStorage);

  it('renders', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={translationMessages.en}>
          <PeoplePage
            openNewPersonForm={jest.fn()}
            closeNewPersonForm={jest.fn()}
            isNewPersonFormOpen={false}
            submitNewPersonFormAndCloseIt={jest.fn()}
            submitNewPersonForm={jest.fn()}
            startPeopleLoading={jest.fn()}
            people={fromJS([])}
            isLoadingPeople={false}
            personSelected={jest.fn()}
            loadingPeopleErrorMsg=""
            intl={{ formatMessage: (v) => v.toString() }}
          />
        </IntlProvider>
      </Provider>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
