/**
 * Testing our Button component
 */

import React from 'react';
import { shallow } from 'enzyme';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

import { AppCalendar } from '../index';
import { dummyIntlObject } from '../../../support/tests/stub';

const renderComponent = (props = {}) => (
  shallow(<AppCalendar {...{ ...props, ...dummyIntlObject }} />)
);

describe('<AppCalendar />', () => {
  it('renders', () => {
    const date = new Date(2014, 1, 1);
    const tooltips = {};
    tooltips[new Date(2014, 1, 2)] = 'Testing tooltip';
    const renderedComponent = renderComponent({
      selectedDate: new Date(2014, 1, 1),
      options: {
        highlightedRanges: [
          [
            startOfWeek(date), endOfWeek(date),
          ],
        ],
        tooltips,
        disabledDates: [new Date(2014, 1, 5)],
      },
    });
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  it('callbacks onDateClicked properly', () => {
    const onDateClicked = jest.fn();

    const renderedComponent = renderComponent({
      selectedDate: new Date(2014, 1, 1),
      onDateClicked,
    });

    const dayElement = renderedComponent.find('button').findWhere((node) => node.text() === '20').first();
    dayElement.simulate('click');
    expect(onDateClicked.mock.calls.length).toBe(1);
    expect(onDateClicked.mock.calls[0][0]).toEqual(new Date(2014, 1, 20));
  });

  it('callbacks onPreviousMonthClicked properly', () => {
    const onPreviousMonthClicked = jest.fn();

    const renderedComponent = renderComponent({
      selectedDate: new Date(2014, 1, 1),
      onPreviousMonthClicked,
    });

    const previousMonthBtn = renderedComponent.find('div.calendar-nav-left').find('button').first();
    previousMonthBtn.simulate('click');
    expect(onPreviousMonthClicked.mock.calls.length).toBe(1);
    expect(onPreviousMonthClicked.mock.calls[0][0]).toEqual(undefined);
  });

  it('callbacks onNextMonthClicked properly', () => {
    const onNextMonthClicked = jest.fn();

    const renderedComponent = renderComponent({
      selectedDate: new Date(2014, 1, 1),
      onNextMonthClicked,
    });

    const previousMonthBtn = renderedComponent.find('div.calendar-nav-right').find('button').first();
    previousMonthBtn.simulate('click');
    expect(onNextMonthClicked.mock.calls.length).toBe(1);
    expect(onNextMonthClicked.mock.calls[0][0]).toEqual(undefined);
  });
});
