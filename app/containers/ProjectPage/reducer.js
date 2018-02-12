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
  CHANGED_ACTIVITIES_TEXT_FILTER,
  EXPAND_TASK_LIST_ITEM,
  COLLAPSE_TASK_LIST_ITEM,
} from './constants';

const initialState = fromJS({
  projectCodes: [],
  selectedProjectCode: null,
  selectedProject: null,
  selectedTab: 0,
  activityFilteringText: '',
  expandedTaskIds: [],
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
    case CHANGED_ACTIVITIES_TEXT_FILTER:
      return state.set('activityFilteringText', action.payload);
    case EXPAND_TASK_LIST_ITEM:
      return state.set('expandedTaskIds', state.get('expandedTaskIds').push(action.payload));
    case COLLAPSE_TASK_LIST_ITEM:
      return state.set(
        'expandedTaskIds',
        state.get('expandedTaskIds').filter((taskId) => taskId !== action.payload)
      );
    default:
      return state;
  }
}

export default projectPageReducer;
