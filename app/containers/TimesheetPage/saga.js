import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { List, fromJS } from 'immutable';
import { stopSubmit } from 'redux-form';
import { newLogSaved, endedLoadingTimeRecords, endLoadingFormProjects, endLoadingFormActivities } from './actions';

import {
  SUBMIT_LOG_FORM,
  LOAD_TIME_RECORDS_FOR_WEEK_DATE,
  LOAD_FORM_PROJECTS,
  LOG_HOUR_FORM,
  LOAD_FORM_ACTIVITIES,
} from './constants';

import {
  getProjects, getProjectActivities,
} from '../../support/backend/KowalskiBackendClient';

import { expiredSessionDetected, requestErrorReceived } from '../App/actions';
import { genCommonReqConfig } from '../../support/backend/utils';

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

export default function* defaultSaga() {
  yield takeEvery(SUBMIT_LOG_FORM, handleSubmitLogForm);
  yield takeEvery(LOAD_TIME_RECORDS_FOR_WEEK_DATE, handleTimeRecordsLoading);
  yield takeEvery(LOAD_FORM_PROJECTS, handleLoadFormProjects);
  yield takeEvery(LOAD_FORM_ACTIVITIES, handleLoadFormActivities);
}

// See example in containers/HomePage/saga.js
