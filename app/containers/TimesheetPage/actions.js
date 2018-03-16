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
  LOAD_FORM_PROJECTS,
  END_LOADING_FORM_PROJECTS,
  LOAD_FORM_ACTIVITIES,
  END_LOADING_FORM_ACTIVITIES,
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

export function loadFormProjects() {
  return {
    type: LOAD_FORM_PROJECTS,
  };
}

export function endLoadingFormProjects(payload) {
  return {
    type: END_LOADING_FORM_PROJECTS,
    payload,
  };
}

export function loadFormActivities(projectId) {
  return {
    type: LOAD_FORM_ACTIVITIES,
    payload: projectId,
  };
}

export function endLoadingFormActivities(payload) {
  return {
    type: END_LOADING_FORM_ACTIVITIES,
    payload,
  };
}
