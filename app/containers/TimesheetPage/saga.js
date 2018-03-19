import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import { stopSubmit, change, startSubmit, reset } from 'redux-form/immutable';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import addMonths from 'date-fns/add_months';
import format from 'date-fns/format';


import {
  newLogSaved,
  endedLoadingTimeRecords,
  endLoadingFormProjects,
  endLoadingFormActivities,
  newTaskCreatedInLogHourForm,
  dismissNewTaskDialog,
  startDeletingTimeRecord,
  endDeletingTimeRecord,
} from './actions';

import {
  SUBMIT_LOG_FORM,
  LOAD_TIME_RECORDS_FOR_WEEK_DATE,
  LOAD_FORM_PROJECTS,
  LOG_HOUR_FORM,
  LOAD_FORM_ACTIVITIES,
  NEW_TASK_CREATED_IN_LOG_HOUR_FORM,
  SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT,
  UPDATE_SELECTED_DATE,
  NEXT_MONTH,
  PREVIOUS_MONTH,
  DELETE_TIME_RECORD,
} from './constants';

import { NEW_TASK_FORM_ID } from '../ProjectPage/constants';

import {
  getProjects, getProjectActivities, createTask, saveTimeRecord, fetchTimeRecords, deleteTimeRecord,
} from '../../support/backend/KowalskiBackendClient';

import { expiredSessionDetected, requestErrorReceived } from '../App/actions';
import { genCommonReqConfig } from '../../support/backend/utils';
import { formatDate } from '../../support/backend/formatters';

export function* handleSubmitLogForm({ payload }) {
  const currentUserId = localStorage.getItem('currentUserId');

  if (!currentUserId) {
    yield put(expiredSessionDetected());
    return;
  }

  const timeRecordData = payload
    .set('userId', parseInt(currentUserId, 10))
    .updateIn(['reportedDay'], (dateObject) => formatDate(dateObject));

  try {
    yield put(startSubmit(LOG_HOUR_FORM));
    const savedTimeRecord = yield call(saveTimeRecord, { timeRecordData, ...genCommonReqConfig() });
    yield put(stopSubmit(LOG_HOUR_FORM));
    yield put(newLogSaved(fromJS(savedTimeRecord)));
    yield put(push('/'));
  } catch (error) {
    yield put(requestErrorReceived({
      error,
      dispatchOnAuthError: [stopSubmit(LOG_HOUR_FORM)],
      dispatchOnOtherErrors: [
        stopSubmit(
          LOG_HOUR_FORM,
          { _error: 'There was an error while trying to communicate with the server =(' },
        ),
      ],
    }));
  }
}

export function* handleTimeRecordsLoading({ payload }) {
  const userId = localStorage.getItem('currentUserId');

  if (!userId) {
    yield put(expiredSessionDetected());
    return;
  }

  const from = formatDate(startOfWeek(payload));
  const to = formatDate(endOfWeek(payload));

  try {
    const timeRecords = yield call(fetchTimeRecords, {
      params: { from, to },
      userId,
      ...genCommonReqConfig(),
    });

    yield put(endedLoadingTimeRecords({ success: true, data: fromJS(timeRecords) }));
  } catch (error) {
    yield put(requestErrorReceived({
      error,
      dispatchOnAuthError: [endedLoadingTimeRecords({ success: false })],
      dispatchOnOtherErrors: [endedLoadingTimeRecords({
        success: false,
        errorMsg: 'There was a server related error while trying to load the form options. Please try again later.',
      })],
    }));
  }
}

export function* handleLoadFormProjects() {
  const userId = localStorage.getItem('currentUserId');

  if (!userId) {
    yield put(expiredSessionDetected());
  }

  try {
    const projectsFromCurrentUser = yield call(
      getProjects,
      {
        params: { userId },
        ...genCommonReqConfig(),
      },
    );
    yield put(endLoadingFormProjects({ success: true, data: fromJS(projectsFromCurrentUser) }));
  } catch (e) {
    yield put(requestErrorReceived({
      error: e,
      dispatchOnOtherErrors: [
        stopSubmit(
          LOG_HOUR_FORM,
          { _error: 'There was a server related error while trying to load the form options. Please try again later.' },
        ),
      ],
      dispatchOnAnyError: [
        endLoadingFormProjects({ success: false }),
      ],
    }));
  }
}

export function* handleLoadFormActivities({ payload }) {
  const userId = localStorage.getItem('currentUserId');

  if (!userId) {
    yield put(expiredSessionDetected());
  }

  try {
    const activitiesFromProject = yield call(
      getProjectActivities,
      {
        params: { includeTasks: true, tasksAccountableId: userId },
        projectId: payload,
        ...genCommonReqConfig(),
      },
    );
    yield put(endLoadingFormActivities({ success: true, data: fromJS(activitiesFromProject) }));
  } catch (e) {
    yield put(requestErrorReceived({
      error: e,
      dispatchOnOtherErrors: [
        stopSubmit(
          LOG_HOUR_FORM,
          { _error: 'There was a server related error while trying to load the form options. Please try again later.' },
        ),
      ],
      dispatchOnAnyError: [
        endLoadingFormActivities({ success: false }),
      ],
    }));
  }
}

export function* handleSubmitNewTaskForm({ payload }) {
  const activityId = payload.get('activityId');
  yield put(startSubmit(NEW_TASK_FORM_ID));
  try {
    const createTaskResp = yield call(
      createTask, {
        ...genCommonReqConfig(),
        activityId,
        taskData: payload.delete('activityId').delete('project').toJSON(),
      }
    );
    yield put(reset(NEW_TASK_FORM_ID));
    yield put(stopSubmit(NEW_TASK_FORM_ID));

    const newTask = payload.delete('project').set('taskId', createTaskResp.taskId);

    yield put(newTaskCreatedInLogHourForm(newTask));
    return newTask;
  } catch (e) {
    yield put(requestErrorReceived({
      error: e,
      dispatchOnAuthError: [stopSubmit(NEW_TASK_FORM_ID)],
      dispatchOnOtherErrors: [
        stopSubmit(
          NEW_TASK_FORM_ID,
          { _error: 'There was an error while trying to communicate with the server =(' },
        ),
      ],
    }));
  }

  return false;
}

export function* handleSubmitNewTaskFormAndCloseIt({ payload }) {
  const success = yield handleSubmitNewTaskForm({ payload });
  if (success) {
    yield put(dismissNewTaskDialog());
  }
}

export function* handleNewTaskCreatedInLogHourForm({ payload }) {
  yield put(change(LOG_HOUR_FORM, 'taskId', payload.get('taskId')));
}

export function* handleUpdateSelectedDate({ payload: { currentDate, operation, newDate } }) {
  let resolvedNewDate = newDate;

  if (!resolvedNewDate) {
    switch (operation) {
      case NEXT_MONTH:
        resolvedNewDate = addMonths(currentDate, 1);
        break;
      case PREVIOUS_MONTH:
        resolvedNewDate = addMonths(currentDate, -1);
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  }

  yield put(push(`?date=${format(resolvedNewDate)}`));
}

export function* handleDeleteTimeRecord({ payload: { trId } }) {
  yield put(startDeletingTimeRecord());
  try {
    yield call(deleteTimeRecord, { trId, ...genCommonReqConfig() });
    yield put(endDeletingTimeRecord({ success: true, trId }));
  } catch (error) {
    yield put(requestErrorReceived({
      error,
      dispatchOnAnyError: [
        endDeletingTimeRecord({ success: false }),
      ],
      dispatchOnOtherErrors: [
        stopSubmit(
          LOG_HOUR_FORM,
          { _error: 'There was an error in the server while trying to delete this record =(' },
        ),
      ],
    }));
  }
}

export default function* defaultSaga() {
  yield takeEvery(SUBMIT_LOG_FORM, handleSubmitLogForm);
  yield takeEvery(LOAD_TIME_RECORDS_FOR_WEEK_DATE, handleTimeRecordsLoading);
  yield takeEvery(LOAD_FORM_PROJECTS, handleLoadFormProjects);
  yield takeEvery(LOAD_FORM_ACTIVITIES, handleLoadFormActivities);
  yield takeEvery(SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT, handleSubmitNewTaskFormAndCloseIt);
  yield takeEvery(NEW_TASK_CREATED_IN_LOG_HOUR_FORM, handleNewTaskCreatedInLogHourForm);
  yield takeEvery(UPDATE_SELECTED_DATE, handleUpdateSelectedDate);
  yield takeEvery(DELETE_TIME_RECORD, handleDeleteTimeRecord);
}

// See example in containers/HomePage/saga.js
