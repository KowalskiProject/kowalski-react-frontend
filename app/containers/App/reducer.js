/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  SAVE_PAGE_BEFORE_AUTH_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  currentUser: false,
  pageBeforeAuthError: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PAGE_BEFORE_AUTH_ERROR:
      return state
        .set('pageBeforeAuthError', action.payload);
    default:
      return state;
  }
}

export default appReducer;
