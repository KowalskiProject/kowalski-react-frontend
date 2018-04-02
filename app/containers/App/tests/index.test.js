import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import createHistory from 'history/createMemoryHistory';
import LanguageProvider from 'containers/LanguageProvider';
import Header from 'components/Header';
import AuthPage from 'containers/AuthPage/Loadable';
import TimesheetPage from 'containers/TimesheetPage/Loadable';

import App from '../index';
import configureStore from '../../../configureStore';
import { mockLocalStorage, unmockLocalStorage } from '../../../support/tests/stub';
import { translationMessages } from '../../../i18n';
import roles from '../../../support/auth/roles';

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImV4cCI6MTUyNTIxMDk5NH0.hqR_wCwXtdA6VIVVV9S7jZjYWU4vFJURXMhoJ4FpnD-IuqigiIWEG3J4ZhwpUEz0qttFheobH_AgK6xyH4OD4Q';

const mountApp = () => {
  const initialState = {};
  const history = createHistory({ initialEntries: ['auth'] });
  const store = configureStore(initialState, history);
  return mount(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  );
};

describe('<App />', () => {
  beforeEach(mockLocalStorage);
  afterEach(unmockLocalStorage);

  it('should render the AuthPage', () => {
    const renderedComponent = mountApp();
    expect(renderedComponent.find(AuthPage).length).toBe(1);
  });

  describe('when the user is already authenticated', () => {
    beforeEach(() => {
      mockLocalStorage();
      window.localStorage.setItem('authToken', token);
      window.localStorage.setItem('currentUserId', 1);
      window.localStorage.setItem('currentUserAuths', [roles.ADMIN]);
    });

    it('should render the Header and Timesheet components', () => {
      // TODO this test is currently printing these error messages even though it is passing
      // (node:1895) UnhandledPromiseRejectionWarning: TypeError: Cannot read property '_currentElement' of null
      // (node:1895) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
      // (node:1895) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
      // I've already speant a considerable amount of time trying to understand what is going on but I was not able to.
      // I believe it has something to do with the async nature of the components loading in the App component.
      const renderedComponent = mountApp();
      expect(renderedComponent.find(Header).length).toBe(1);
      expect(renderedComponent.find(TimesheetPage).length).toBe(1);
    });
  });
});
