import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { List, fromJS } from 'immutable';
import { stopSubmit, change, startSubmit, reset } from 'redux-form/immutable';
import {
  newLogSaved,
  endedLoadingTimeRecords,
  endLoadingFormProjects,
  endLoadingFormActivities,
  newTaskCreatedInLogHourForm,
  dismissNewTaskDialog,
} from './actions';

import {
  SUBMIT_LOG_FORM,
  LOAD_TIME_RECORDS_FOR_WEEK_DATE,
  LOAD_FORM_PROJECTS,
  LOG_HOUR_FORM,
  LOAD_FORM_ACTIVITIES,
  NEW_TASK_CREATED_IN_LOG_HOUR_FORM,
  SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT,
} from './constants';

import { NEW_TASK_FORM_ID } from '../ProjectPage/constants';

import {
  getProjects, getProjectActivities, createTask,
} from '../../support/backend/KowalskiBackendClient';

import { expiredSessionDetected, requestErrorReceived } from '../App/actions';
import { genCommonReqConfig } from '../../support/backend/utils';
import { makeSelectFormActivities } from './selectors';

export function* handleSubmitLogForm({ payload }) {
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  }));
  yield put(newLogSaved(payload));
  yield put(push('/'));
}

export function* handleTimeRecordsLoading({ payload }) {
  const weekDate = payload;

  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(weekDate), 300);
  }));

  const timeRecords = List(); // TODO parse it to be in the format of our timeSlotEntries array

  yield put(endedLoadingTimeRecords(timeRecords));
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
  const project = payload.get('project');
  const projectId = project.get('projectId');
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
    debugger;
    yield put(reset(NEW_TASK_FORM_ID));
    yield put(stopSubmit(NEW_TASK_FORM_ID));

    const newTask = payload.delete('project').set('taskId', createTaskResp.taskId);

    yield put(newTaskCreatedInLogHourForm(newTask));
    return newTask;
  } catch (e) {
    console.log(e);
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

export default function* defaultSaga() {
  yield takeEvery(SUBMIT_LOG_FORM, handleSubmitLogForm);
  yield takeEvery(LOAD_TIME_RECORDS_FOR_WEEK_DATE, handleTimeRecordsLoading);
  yield takeEvery(LOAD_FORM_PROJECTS, handleLoadFormProjects);
  yield takeEvery(LOAD_FORM_ACTIVITIES, handleLoadFormActivities);
  yield takeEvery(SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT, handleSubmitNewTaskFormAndCloseIt);
  yield takeEvery(NEW_TASK_CREATED_IN_LOG_HOUR_FORM, handleNewTaskCreatedInLogHourForm);
}

// See example in containers/HomePage/saga.js
