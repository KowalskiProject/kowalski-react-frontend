/*
 *
 * TimesheetPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
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
  UPDATE_CACHED_SELECT_DATE,
  START_DELETING_TIME_RECORD,
  END_DELETING_TIME_RECORD,
  CHANGE_TIME_RECORD_DELETE_CONFIRM_DIALOG_OPENESS,
} from './constants';
import { OPEN } from '../../utils/constants';

const initialState = fromJS({
  timeRecords: [],
  isLoadingTimeRecords: false,
  loadingTimeRecordsErrorMsg: '',
  isTaskOverlaySelectOpened: false,
  formProjects: [],
  formActivities: [],
  isTaskDialogOpen: false,
  activityIdLoadedIntoTaskDialog: null,
  cachedSelectedDate: null, // The last date for which we have time records
  isDeletingRecord: false,
  deleteTimeRecordConfirmDialogOpened: false,
});

function timesheetPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_TIME_RECORD_DELETE_CONFIRM_DIALOG_OPENESS:
      return state.set('deleteTimeRecordConfirmDialogOpened', payload.operation === OPEN);
    case START_DELETING_TIME_RECORD:
      return state.set('isDeletingRecord', true);
    case END_DELETING_TIME_RECORD:
      return state
        .updateIn(
          ['timeRecords'],
          (timeRecords) => (
            payload.success
              ? timeRecords.delete(timeRecords.findIndex((tr) => tr.get('trId') === payload.trId))
              : timeRecords
          )
        )
        .set('isDeletingRecord', false);
    case UPDATE_CACHED_SELECT_DATE:
      return state.set('cachedSelectedDate', payload);
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
        .set('formActivities', payload.success ? payload.data : List());
    case END_LOADING_FORM_PROJECTS:
      return state
        .set('formProjects', payload.success ? payload.data : List());
    case ENDED_LOADING_TIME_RECORDS:
      return state
        .set('isLoadingTimeRecords', false)
        .set('loadingTimeRecordsErrorMsg', payload.success ? '' : payload.errorMsg)
        .set('timeRecords', payload.success ? payload.data : List());
    case LOAD_TIME_RECORDS_FOR_WEEK_DATE:
      return state.set('isLoadingTimeRecords', true);
    case NEW_LOG_SAVED:
      return state.updateIn(['timeRecords'], (timeRecords) => timeRecords.push(payload));
    case OPEN_TASK_OVERLAY_SELECT:
      return state.set('isTaskOverlaySelectOpened', true);
    case CLOSE_TASK_OVERLAY_SELECT:
      return state.set('isTaskOverlaySelectOpened', false);
    default:
      return state;
  }
}

export default timesheetPageReducer;
