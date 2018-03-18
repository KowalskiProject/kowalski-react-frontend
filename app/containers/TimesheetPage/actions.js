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
  LAUNCH_NEW_TASK_DIALOG,
  DISMISS_NEW_TASK_DIALOG,
  SUBMIT_NEW_TASK_FORM,
  SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT,
  NEW_TASK_CREATED_IN_LOG_HOUR_FORM,
  UPDATE_SELECTED_DATE,
  UPDATE_CACHED_SELECT_DATE,
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

export function endedLoadingTimeRecords(timeRecords) {
  return {
    type: ENDED_LOADING_TIME_RECORDS,
    payload: timeRecords,
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

export function launchNewTaskDialog(activityId) {
  return {
    type: LAUNCH_NEW_TASK_DIALOG,
    payload: activityId,
  };
}

export function dismissNewTaskDialog() {
  return {
    type: DISMISS_NEW_TASK_DIALOG,
  };
}

export function submitNewTaskFormAndCloseIt(payload) {
  return {
    type: SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT,
    payload,
  };
}

export function submitNewTaskForm(payload) {
  return {
    type: SUBMIT_NEW_TASK_FORM,
    payload,
  };
}

export function newTaskCreatedInLogHourForm(newTask) {
  return {
    type: NEW_TASK_CREATED_IN_LOG_HOUR_FORM,
    payload: newTask,
  };
}

export function updateSelectedDate(payload) {
  return {
    type: UPDATE_SELECTED_DATE,
    payload,
  };
}

export function updateCachedSelectDate(newDate) {
  return {
    type: UPDATE_CACHED_SELECT_DATE,
    payload: newDate,
  };
}
