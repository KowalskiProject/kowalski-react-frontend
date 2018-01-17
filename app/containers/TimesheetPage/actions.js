/*
 *
 * TimesheetPage actions
 *
 */

import {
  DEFAULT_ACTION,
  NEW_DATE_SELECTED,
  NEXT_MONTH_CLICKED,
  PREVIOUS_MONTH_CLICKED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function onDateChanged(newDate) {
  return {
    type: NEW_DATE_SELECTED,
    payload: newDate,
  };
}

export function onNextMonthClicked() {
  return {
    type: NEXT_MONTH_CLICKED,
    payload: null,
  };
}

export function onPreviousMonthClicked() {
  return {
    type: PREVIOUS_MONTH_CLICKED,
    payload: null,
  };
}
