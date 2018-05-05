import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider, injectIntl } from 'react-intl';
import { fromJS } from 'immutable';

import { DayColumn } from '../index';
import { translationMessages } from '../../../i18n';

const renderComponent = ({ onSlotClicked, onFreeSlotClick } = {}) => mount(
  <IntlProvider locale="en" messages={translationMessages.en}>
    {
      React.createElement(injectIntl(DayColumn), {
        day: new Date(2014, 1, 1),
        onFreeSlotClick: onFreeSlotClick || jest.fn(),
        onSlotClicked: onSlotClicked || jest.fn(),
        timeRecords: fromJS([
          {
            projectCode: '[PROJ]',
            activityName: 'AN',
            taskName: 'TN',
            reportedTime: '0:30',
            trId: 1,
          },
          {
            reportedTime: '0:45',
            trId: 2,
          },
        ]),
      })
    }
  </IntlProvider>
);

describe('<DayColumn />', () => {
  it('renders', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  it('callbacks onSlotClick and onFreeSlotClick properly', () => {
    const onSlotClicked = jest.fn();
    const onFreeSlotClick = jest.fn();
    const renderedComponent = renderComponent({ onSlotClicked, onFreeSlotClick });

    renderedComponent.find('a').findWhere((node) => node.text() === '0:30').simulate('click');
    expect(onSlotClicked.mock.calls.length).toBe(1);
    expect(onSlotClicked.mock.calls[0][0]).toEqual(1);
    expect(onSlotClicked.mock.calls[0][1]).toEqual(new Date(2014, 1, 1));

    renderedComponent.find('a').findWhere((node) => node.text() === '+').simulate('click');
    expect(onFreeSlotClick.mock.calls.length).toBe(1);
  });
});
