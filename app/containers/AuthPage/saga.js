import { takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { authenticate } from '../../support/backend/KowalskiBackendClient';

import {
  SUBMITTED_CREDENTIALS,
} from './constants';

import {
  serverResponded,
} from './actions';

import {
  savePageBeforeAuthError,
} from '../App/actions';

import { SERVER_BASE_URL } from '../../utils/constants';

export function* handleSubmission({ payload: { username, password, pageBeforeAuthError } }) {
  try {
    const serverResponse = yield call(authenticate, { config: { baseUrl: SERVER_BASE_URL }, username, password });
    const token = serverResponse.headers.get('Authorization').match(/Bearer (.*)/)[1];
    localStorage.setItem('authToken', token);
    yield put(serverResponded({ success: true }));
    if (pageBeforeAuthError) {
      yield put(savePageBeforeAuthError(null));
      yield put(push(pageBeforeAuthError));
    } else {
      yield put(push('/'));
    }
  } catch (error) {
    yield put(serverResponded({ success: false, errorMsg: 'Invalid credentials' }));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(SUBMITTED_CREDENTIALS, handleSubmission);
}
