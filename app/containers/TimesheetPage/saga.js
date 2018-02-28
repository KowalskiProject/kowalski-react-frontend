import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { newLogSaved } from './actions';

import {
  SUBMIT_LOG_FORM,
} from './constants';

export function* handleSubmitLogForm({ payload }) {
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  }));
  yield put(newLogSaved(payload));
  yield put(push('/'));
}

export default function* defaultSaga() {
  yield takeEvery(SUBMIT_LOG_FORM, handleSubmitLogForm);
}

// See example in containers/HomePage/saga.js
