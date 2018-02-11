import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { navigateTo } from './actions';
import { NAVIGATE_TO } from './constants';

export function* handleNavigateTo({ payload }) {
  yield put(push(payload));
}

export default function* defaultSaga() {
  yield takeEvery(NAVIGATE_TO, handleNavigateTo);
}
