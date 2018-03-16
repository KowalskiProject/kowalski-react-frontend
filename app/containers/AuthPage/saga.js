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

const jwtDecode = require('jwt-decode');

export function* handleSubmission({ payload: { username, password, pageBeforeAuthError } }) {
  try {
    const serverResponse = yield call(authenticate, { config: { baseUrl: SERVER_BASE_URL }, username, password });
    const token = serverResponse.headers.get('Authorization').match(/Bearer (.*)/)[1];
    localStorage.setItem('authToken', token);
    const userId = jwtDecode(token).kUserId;
    if (!userId) {
      yield put(serverResponded({ success: false, errorMsg: 'You have not been authorized to use this system. Please contact the Administrator.' }));
      return;
    }
    yield put(serverResponded({ success: true }));
    localStorage.setItem('currentUserId', userId);
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
