import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { List } from 'immutable';
import { newLogSaved, endedLoadingTimeRecords } from './actions';

import {
  SUBMIT_LOG_FORM,
  LOAD_TIME_RECORDS_FOR_WEEK_DATE,
} from './constants';

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
    setTimeout(() => resolve(weekDate), 30000);
  }));

  const timeRecords = List(); // TODO parse it to be in the format of our timeSlotEntries array

  yield put(endedLoadingTimeRecords(timeRecords));
}

export default function* defaultSaga() {
  yield takeEvery(SUBMIT_LOG_FORM, handleSubmitLogForm);
  yield takeEvery(LOAD_TIME_RECORDS_FOR_WEEK_DATE, handleTimeRecordsLoading);
}

// See example in containers/HomePage/saga.js
