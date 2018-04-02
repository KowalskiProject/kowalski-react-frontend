import React from 'react';
import { shallow, mount } from 'enzyme';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import ConnectedLanguageProvider, { LanguageProvider } from '../index';
import configureStore from '../../../configureStore';

import { translationMessages } from '../../../i18n';

const messages = defineMessages({
  someMessage: {
    id: 'app.title',
  },
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <LanguageProvider messages={messages} locale="pt-BR">
        {children}
      </LanguageProvider>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render the default language messages', () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>
    );
    expect(renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)).toBe(true);
  });
});
