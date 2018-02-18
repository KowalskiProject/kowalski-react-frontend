/*
 *
 * AuthPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGED_PASSWORD,
  CHANGED_USERNAME,
  SUBMITTED_CREDENTIALS,
  SERVER_RESPONDED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changedUsername(username) {
  return {
    type: CHANGED_USERNAME,
    payload: username,
  };
}

export function changedPassword(password) {
  return {
    type: CHANGED_PASSWORD,
    payload: password,
  };
}

export function submitCredentials({ username, password }) {
  return {
    type: SUBMITTED_CREDENTIALS,
    payload: { username, password },
  };
}

export function serverResponded(payload) {
  return {
    type: SERVER_RESPONDED,
    payload,
  };
}
