import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  NAVIGATE_TO,
  EXPIRED_SECTION_DETECTED,
  UNAUTHORIZED_ACCESS_DETECTED,
  REAUTH_ATTEMPT_DETECTED,
} from './constants';

export function* handleNavigateTo({ payload }) {
  yield put(push(payload));
}

export function* handleExpiredSection() {
  localStorage.removeItem('authToken');
  yield put(push('/auth'));
}

export function* handleUnauthorizedAccess() {
  yield put(push('/auth'));
}

export function* handleReauthAtemptDetected() {
  yield put(push('/'));
}

export default function* defaultSaga() {
  yield takeEvery(NAVIGATE_TO, handleNavigateTo);
  yield takeEvery(EXPIRED_SECTION_DETECTED, handleExpiredSection);
  yield takeEvery(UNAUTHORIZED_ACCESS_DETECTED, handleUnauthorizedAccess);
  yield takeEvery(REAUTH_ATTEMPT_DETECTED, handleReauthAtemptDetected);
}
