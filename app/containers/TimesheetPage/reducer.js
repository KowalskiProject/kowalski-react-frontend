/*
 *
 * TimesheetPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import addMonths from 'date-fns/add_months';
import {
  NEW_DATE_SELECTED,
  NEXT_MONTH_CLICKED,
  PREVIOUS_MONTH_CLICKED,
  SUBMIT_LOG_FORM,
  NEW_LOG_SAVED,
  OPEN_TASK_OVERLAY_SELECT,
  CLOSE_TASK_OVERLAY_SELECT,
  LOAD_TIME_RECORDS_FOR_WEEK_DATE,
  ENDED_LOADING_TIME_RECORDS,
  END_LOADING_FORM_PROJECTS,
  END_LOADING_FORM_ACTIVITIES,
  LAUNCH_NEW_TASK_DIALOG,
  DISMISS_NEW_TASK_DIALOG,
  NEW_TASK_CREATED_IN_LOG_HOUR_FORM,
} from './constants';

const initialState = fromJS({
  selectedDate: new Date(),
  timeSlotEntries: [],
  isSubmitting: false,
  isLoadingTimeRecords: false,
  isTaskOverlaySelectOpened: false,
  formProjects: [],
  formActivities: [],
  isTaskDialogOpen: false,
  activityIdLoadedIntoTaskDialog: null,
});

function timesheetPageReducer(state, { type, payload }) {
  // Very weird bug in my local env if I do state = initialState in function signature
  if (!state) {
    state = initialState;
  }

  switch (type) {
    case NEW_TASK_CREATED_IN_LOG_HOUR_FORM:
      return state.set('isTaskOverlaySelectOpened', false).updateIn(
        [
          'formActivities',
          state.get('formActivities').findIndex((activity) => activity.get('activityId') === payload.get('activityId')),
          'tasks',
        ],
        (list) => list.push(payload),
      );
    case LAUNCH_NEW_TASK_DIALOG:
      return state
        .set('isTaskDialogOpen', true)
        .set('activityIdLoadedIntoTaskDialog', payload);
    case DISMISS_NEW_TASK_DIALOG:
      return state
        .set('isTaskDialogOpen', false)
        .set('activityIdLoadedIntoTaskDialog', null);
    case END_LOADING_FORM_ACTIVITIES:
      return state
        .set('formActivities', payload.success ? payload.data : []);
    case END_LOADING_FORM_PROJECTS:
      return state
        .set('formProjects', payload.success ? payload.data : []);
    case ENDED_LOADING_TIME_RECORDS:
      return state
        .set('isLoadingTimeRecords', false)
        .set('timeSlotEntries', payload);
    case LOAD_TIME_RECORDS_FOR_WEEK_DATE:
      return state.set('isLoadingTimeRecords', true);
    case SUBMIT_LOG_FORM:
      return state.set('isSubmitting', true);
    case NEW_LOG_SAVED:
      return state
        .set('isSubmitting', false)
        .set('timeSlotEntries', (state.get('timeSlotEntries') || List()).push(payload));
    case NEW_DATE_SELECTED:
      return state.set('selectedDate', payload);
    case NEXT_MONTH_CLICKED:
      return state.set('selectedDate', addMonths(state.get('selectedDate'), 1));
    case PREVIOUS_MONTH_CLICKED:
      return state.set('selectedDate', addMonths(state.get('selectedDate'), -1));
    case OPEN_TASK_OVERLAY_SELECT:
      return state.set('isTaskOverlaySelectOpened', true);
    case CLOSE_TASK_OVERLAY_SELECT:
      return state.set('isTaskOverlaySelectOpened', false);
    default:
      return state;
  }
}

export default timesheetPageReducer;
