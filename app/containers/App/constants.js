/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const START_LOADING_RESOURCE = 'app/App/START_LOADING_RESOURCE';
export const END_LOADING_RESOURCE = 'app/App/END_LOADING_RESOURCE';
export const NAVIGATE_TO = 'app/App/NAVIGATE_TO';
export const DEFAULT_LOCALE = 'en';
export const EXPIRED_SECTION_DETECTED = 'app/App/EXPIRED_SECTION_DETECTED';
export const UNAUTHORIZED_ACCESS_DETECTED = 'app/App/UNAUTHORIZED_ACCESS_DETECTED';
export const REAUTH_ATTEMPT_DETECTED = 'app/App/REAUTH_ATTEMPT_DETECTED';
export const REQUEST_ERROR_RECEIVED = 'app/App/REQUEST_ERROR_RECEIVED';
export const SAVE_PAGE_BEFORE_AUTH_ERROR = 'app/App/SAVE_PAGE_BEFORE_AUTH_ERROR';
export const LOGOUT = 'app/App/LOGOUT';
