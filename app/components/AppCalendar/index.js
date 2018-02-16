/**
*
* AppCalendar based on bulma-calendar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isWithinRange from 'date-fns/is_within_range';
import addDays from 'date-fns/add_days';
import getDate from 'date-fns/get_date';
import filter from 'lodash/filter';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';

const extractDaysForCalendar = (date) => {
  const extractedStartOfMonth = startOfMonth(date);
  const weeks = [];

  let currentStartOfWeek = startOfWeek(extractedStartOfMonth);
  do {
    for (let i = 0; i < 7; i += 1) {
      weeks.push(addDays(currentStartOfWeek, i));
    }
    currentStartOfWeek = addDays(currentStartOfWeek, 7);
  } while (isSameMonth(currentStartOfWeek, date));

  return weeks;
};

/*
 * highlightedRanges: An array of pairs, where the first is the start of the range and the second it's end.
 * tooltips: An object mapping from dates to tooltip messages
 * disabledDates: An array containing dates that should appear as disabled despite the fact the they are within the current reference month
 */
const renderCalendarDay = (
  referenceDate, { tooltips = {}, highlightedRanges = [], disabledDates = [] }, dateClickCallback, day
) => {
  const isWithinCurrentMonth = isSameMonth(day, referenceDate);
  const isActive = isSameDay(day, referenceDate);
  const tooltip = filter(tooltips, (k) => isSameDay(k, day))[0];
  const isStartOfRange = highlightedRanges.some((range) => isSameDay(day, range[0]));
  const isEndOfRange = highlightedRanges.some((range) => isSameDay(day, range[1]));
  const withinRange = isStartOfRange || isEndOfRange || highlightedRanges.some((range) => isWithinRange(day, range[0], range[1]));

  const outerClassNameSufixes = [
    isWithinCurrentMonth ? '' : ' is-disabled',
    tooltip ? ' tooltip' : '',
    withinRange ? ' calendar-range' : '',
    isStartOfRange ? ' range-start' : '',
    isEndOfRange ? ' range-end' : '',
  ];

  const innerClassNameSufixes = [
    isActive ? ' is-active' : '',
    isStartOfRange || isEndOfRange ? ' is-active' : '',
  ];

  const outerElementProperties = {
    className: `calendar-date ${outerClassNameSufixes.join('')}`,
    key: day.getTime(),
  };

  const innerElementProperties = {
    className: `date-item ${innerClassNameSufixes.join('')}`,
  };

  if (tooltip) {
    outerElementProperties['data-tooltip'] = tooltip;
  }

  if (dateClickCallback) {
    innerElementProperties.onClick = () => dateClickCallback(day);
  }

  if (disabledDates.some((date) => isSameDay(day, date))) {
    outerElementProperties.disabled = '';
  }

  return (
    <div {...outerElementProperties}>
      <button {...innerElementProperties}>
        {getDate(day)}
      </button>
    </div>
  );
};

const renderCalendarDays = (date, options, dateClickCallback) => extractDaysForCalendar(date)
  .map(renderCalendarDay.bind(this, date, options, dateClickCallback));
const extractMonthAndYearExpression = (day) => format(day, 'MMMM GGGG');

function AppCalendar({ selectedDate, options = {}, onNextMonthClicked, onPreviousMonthClicked, onDateClicked }) {
  return (
    <div className="calendar">
      <div className="calendar-nav">
        <div className="calendar-nav-left">
          <button className="button is-text" onClick={onPreviousMonthClicked}>
            <FaChevronLeft />
          </button>
        </div>
        <div className="yearMonth" >{extractMonthAndYearExpression(selectedDate)}</div>
        <div className="calendar-nav-right">
          <button className="button is-text" onClick={onNextMonthClicked}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="calendar-date">Sun</div>
          <div className="calendar-date">Mon</div>
          <div className="calendar-date">Tue</div>
          <div className="calendar-date">Wed</div>
          <div className="calendar-date">Thu</div>
          <div className="calendar-date">Fri</div>
          <div className="calendar-date">Sat</div>
        </div>
        <div className="calendar-body">
          { renderCalendarDays(selectedDate, options, onDateClicked) }
        </div>
      </div>
    </div>
  );
}

AppCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  options: PropTypes.object,
  onNextMonthClicked: PropTypes.func,
  onPreviousMonthClicked: PropTypes.func,
  onDateClicked: PropTypes.func,
};

export default AppCalendar;
