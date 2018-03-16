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
  SUBMIT_LOG_FORM,
  NEW_LOG_SAVED,
  CLOSE_TASK_OVERLAY_SELECT,
  OPEN_TASK_OVERLAY_SELECT,
  LOAD_TIME_RECORDS_FOR_WEEK_DATE,
  ENDED_LOADING_TIME_RECORDS,
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

export function submitLogForm(formData) {
  return {
    type: SUBMIT_LOG_FORM,
    payload: formData,
  };
}

export function newLogSaved(newLogForm) {
  return {
    type: NEW_LOG_SAVED,
    payload: newLogForm,
  };
}

export function closeTaskOverlaySelect() {
  return {
    type: CLOSE_TASK_OVERLAY_SELECT,
  };
}

export function loadTimeRecordsForWeekDate(date) {
  return {
    type: LOAD_TIME_RECORDS_FOR_WEEK_DATE,
    payload: date,
  };
}

export function openTaskOverlaySelect() {
  return {
    type: OPEN_TASK_OVERLAY_SELECT,
  };
}

export function endedLoadingTimeRecords(timeSlots) {
  return {
    type: ENDED_LOADING_TIME_RECORDS,
    payload: timeSlots,
  };
}
