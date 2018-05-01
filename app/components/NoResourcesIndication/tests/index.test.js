import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import NoResourcesIndication from '../index';
import { translationMessages } from '../../../i18n';

describe('<NoResourcesIndication />', () => {
  it('renders', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en" messages={translationMessages.en}>
        <NoResourcesIndication resourceName="users" />
      </IntlProvider>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
