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
