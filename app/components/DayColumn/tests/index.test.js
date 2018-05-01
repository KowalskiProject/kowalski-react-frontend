import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider, injectIntl } from 'react-intl';
import { fromJS } from 'immutable';

import { DayColumn } from '../index';
import { translationMessages } from '../../../i18n';

describe('<DayColumn />', () => {
  it('renders', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en" messages={translationMessages.en}>
        {
          React.createElement(injectIntl(DayColumn), {
            day: new Date(),
            onFreeSlotClick: jest.fn(),
            onSlotClicked: jest.fn(),
            timeRecords: fromJS([]),
          })
        }
      </IntlProvider>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
