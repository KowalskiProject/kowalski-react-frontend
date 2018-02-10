/*
 *
 * ProjectPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_SELECTED_PROJECT_CODE,
  LOADED_SELECTED_PROJECT,
  LOADED_PROJECT_CODES,
  SELECTED_TAB_CHANGED,
} from './constants';

const initialState = fromJS({
  projectCodes: [],
  selectedProjectCode: null,
  selectedProject: {},
  selectedTab: 0,
});

function projectPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_PROJECT_CODE:
      return state.set('selectedProjectCode', action.payload);
    case LOADED_SELECTED_PROJECT:
      return state.set('selectedProject', action.payload);
    case LOADED_PROJECT_CODES:
      return state.set('projectCodes', action.payload);
    case SELECTED_TAB_CHANGED:
      return state.set('selectedTab', action.payload);
    default:
      return state;
  }
}

export default projectPageReducer;
