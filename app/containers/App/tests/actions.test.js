import {
  NAVIGATE_TO,
  EXPIRED_SECTION_DETECTED,
  REAUTH_ATTEMPT_DETECTED,
  UNAUTHORIZED_ACCESS_DETECTED,
  REQUEST_ERROR_RECEIVED,
  SAVE_PAGE_BEFORE_AUTH_ERROR,
  LOGOUT,
  CLEAN_UP_STATE,
} from '../constants';

import {
  navigateTo,
  expiredSessionDetected,
  unauthorizedAccessDetected,
  reauthenticationAttemptDetected,
  requestErrorReceived,
  savePageBeforeAuthError,
  logout,
  cleanUpState,
} from '../actions';

describe('App Actions', () => {
  describe('navigateTo', () => {
    it('should return the correct object', () => {
      const action = navigateTo('/path');
      expect(action.type).toEqual(NAVIGATE_TO);
      expect(action.payload).toEqual('/path');
    });
  });

  describe('expiredSessionDetected', () => {
    it('should return the correct object', () => {
      const action = expiredSessionDetected();
      expect(action.type).toEqual(EXPIRED_SECTION_DETECTED);
      expect(action.payload).toBeUndefined();
    });
  });

  describe('unauthorizedAccessDetected', () => {
    it('should return the correct object', () => {
      const action = unauthorizedAccessDetected();
      expect(action.type).toEqual(UNAUTHORIZED_ACCESS_DETECTED);
      expect(action.payload).toBeUndefined();
    });
  });

  describe('reauthenticationAttemptDetected', () => {
    it('should return the correct object', () => {
      const action = reauthenticationAttemptDetected();
      expect(action.type).toEqual(REAUTH_ATTEMPT_DETECTED);
      expect(action.payload).toBeUndefined();
    });
  });

  describe('requestErrorReceived', () => {
    it('should return the correct object', () => {
      const payload = new Error();
      const action = requestErrorReceived(payload);
      expect(action.type).toEqual(REQUEST_ERROR_RECEIVED);
      expect(action.payload).toEqual(payload);
    });
  });

  describe('savePageBeforeAuthError', () => {
    it('should return the correct object', () => {
      const payload = '/page/path';
      const action = savePageBeforeAuthError(payload);
      expect(action.type).toEqual(SAVE_PAGE_BEFORE_AUTH_ERROR);
      expect(action.payload).toEqual(payload);
    });
  });

  describe('logout', () => {
    it('should return the correct object', () => {
      const action = logout();
      expect(action.type).toEqual(LOGOUT);
      expect(action.payload).toBeUndefined();
    });
  });

  describe('cleanUpState', () => {
    it('should return the correct object', () => {
      const action = cleanUpState();
      expect(action.type).toEqual(CLEAN_UP_STATE);
      expect(action.paylaod).toBeUndefined();
    });
  });
});
