/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  NAVIGATE_TO,
  EXPIRED_SECTION_DETECTED,
  UNAUTHORIZED_ACCESS_DETECTED,
  REAUTH_ATTEMPT_DETECTED,
  REQUEST_ERROR_RECEIVED,
  SAVE_PAGE_BEFORE_AUTH_ERROR,
  LOGOUT,
  CLEAN_UP_STATE,
} from './constants';

export function navigateTo(path) {
  return {
    type: NAVIGATE_TO,
    payload: path,
  };
}

export function expiredSessionDetected() {
  return {
    type: EXPIRED_SECTION_DETECTED,
  };
}

export function unauthorizedAccessDetected() {
  return {
    type: UNAUTHORIZED_ACCESS_DETECTED,
  };
}

export function reauthenticationAttemptDetected() {
  return {
    type: REAUTH_ATTEMPT_DETECTED,
  };
}

export function requestErrorReceived(payload) {
  return {
    type: REQUEST_ERROR_RECEIVED,
    payload,
  };
}

export function savePageBeforeAuthError(payload) {
  return {
    type: SAVE_PAGE_BEFORE_AUTH_ERROR,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function cleanUpState() {
  return {
    type: CLEAN_UP_STATE,
  };
}
