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
  START_LOADING_RESOURCE,
  END_LOADING_RESOURCE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loadingResource: false,
  currentUser: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_RESOURCE:
      return state
        .set('loadingResource', true);
    case END_LOADING_RESOURCE:
      return state
        .set('loadingResource', false);
    default:
      return state;
  }
}

export default appReducer;
