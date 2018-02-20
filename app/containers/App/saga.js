import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  NAVIGATE_TO,
  EXPIRED_SECTION_DETECTED,
  UNAUTHORIZED_ACCESS_DETECTED,
  REAUTH_ATTEMPT_DETECTED,
  REQUEST_ERROR_RECEIVED,
} from './constants';

import {
  expiredSectionDetected,
} from './actions';
import { isAuthError } from '../../support/backend/utils';

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

export function* handleRequestErrorReceived({ payload: { error, dispatchOnAuthError, dispatchOnOtherErrors } }) {
  if (isAuthError(error)) {
    yield put(expiredSectionDetected());
    for (let i = 0; i < dispatchOnAuthError.length; i += 1) {
      yield put(dispatchOnAuthError[i]);
    }
  } else {
    for (let i = 0; i < dispatchOnOtherErrors.length; i += 1) {
      yield put(dispatchOnOtherErrors[i]);
    }
  }
}

export default function* defaultSaga() {
  yield takeEvery(NAVIGATE_TO, handleNavigateTo);
  yield takeEvery(EXPIRED_SECTION_DETECTED, handleExpiredSection);
  yield takeEvery(UNAUTHORIZED_ACCESS_DETECTED, handleUnauthorizedAccess);
  yield takeEvery(REAUTH_ATTEMPT_DETECTED, handleReauthAtemptDetected);
  yield takeEvery(REQUEST_ERROR_RECEIVED, handleRequestErrorReceived);
}
