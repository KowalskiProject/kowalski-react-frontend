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
} from './constants';

const initialState = fromJS({
  selectedDate: new Date(),
  timeSlotEntries: [],
  isSubmitting: false,
  isLoadingTimeRecords: false,
  isTaskOverlaySelectOpened: false,
  formProjects: [],
  formActivities: [],
});

function timesheetPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case END_LOADING_FORM_ACTIVITIES:
      return state
        .set('formActivities', payload.success ? payload.data : null);
    case END_LOADING_FORM_PROJECTS:
      return state
        .set('formProjects', payload.success ? payload.data : null);
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
