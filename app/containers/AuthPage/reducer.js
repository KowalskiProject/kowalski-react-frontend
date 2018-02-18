/*
 *
 * AuthPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGED_USERNAME,
  CHANGED_PASSWORD,
  SUBMITTED_CREDENTIALS,
  SERVER_RESPONDED,
} from './constants';

const initialState = fromJS({
  username: '',
  password: '',
  isSubmitting: false,
  serverErrorMsg: '',
});

function authPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGED_USERNAME:
      return state.set('username', action.payload);
    case CHANGED_PASSWORD:
      return state.set('password', action.payload);
    case SUBMITTED_CREDENTIALS:
      return state
      .set('isSubmitting', true);
    case SERVER_RESPONDED:
      return state
        .set('isSubmitting', false)
        .set('serverErrorMsg', action.payload.success ? '' : action.payload.errorMsg);
    default:
      return state;
  }
}

export default authPageReducer;
