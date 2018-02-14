/*
 *
 * ProjectPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  UPDATE_SELECTED_PROJECT_CODE,
  LOADED_SELECTED_PROJECT,
  LOADED_PROJECT_CODES,
  SELECTED_TAB_CHANGED,
  CHANGED_ACTIVITIES_TEXT_FILTER,
  EXPAND_TASK_LIST_ITEM,
  COLLAPSE_TASK_LIST_ITEM,
  LAUNCH_NEW_ACTIVITY_DIALOG,
  DISMISS_NEW_ACTIVITY_DIALOG,
  ENDED_SUBMIT_NEW_ACTIVITY,
  LAUNCH_NEW_TASK_DIALOG,
  DISMISS_NEW_TASK_DIALOG,
} from './constants';

const initialState = fromJS({
  projectCodes: [],
  selectedProjectCode: null,
  selectedProject: null,
  selectedTab: 0,
  activityFilteringText: '',
  expandedActivityIds: [],
  isNewTaskFormDialogOpened: false,
  activityLoadedIntoNewTaskForm: null,
  projectLoadedIntoNewTaskForm: null,
  isSubmittingNewTask: false,
  isNewActivityFormDialogOpened: false,
  projectLoadedIntoNewActivityForm: null,
  isSubmittingNewActivity: false,
});

function projectPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_PROJECT_CODE:
      return state.set('selectedProjectCode', action.payload);
    case LOADED_SELECTED_PROJECT:
      return state
        .set('selectedProject', action.payload)
        .set('expandedActivityIds', List());
    case LOADED_PROJECT_CODES:
      return state.set('projectCodes', action.payload);
    case SELECTED_TAB_CHANGED:
      return state.set('selectedTab', action.payload);
    case CHANGED_ACTIVITIES_TEXT_FILTER:
      return state.set('activityFilteringText', action.payload);
    case EXPAND_TASK_LIST_ITEM:
      return state.set('expandedActivityIds', state.get('expandedActivityIds').push(action.payload));
    case COLLAPSE_TASK_LIST_ITEM:
      return state.set(
        'expandedActivityIds',
        state.get('expandedActivityIds').filter((taskId) => taskId !== action.payload)
      );
    case LAUNCH_NEW_ACTIVITY_DIALOG:
      return state
        .set('isNewActivityFormDialogOpened', true)
        .set('projectLoadedIntoNewActivityForm', action.payload);
    case DISMISS_NEW_ACTIVITY_DIALOG:
      return state
        .set('isNewActivityFormDialogOpened', false)
        .set('projectLoadedIntoNewActivityForm', null);
    case LAUNCH_NEW_TASK_DIALOG:
      return state
        .set('isNewTaskFormDialogOpened', true)
        .set('activityLoadedIntoNewTaskForm', action.payload.activity)
        .set('projectLoadedIntoNewTaskForm', action.payload.project);
    case DISMISS_NEW_TASK_DIALOG:
      return state
        .set('isNewTaskFormDialogOpened', false)
        .set('activityLoadedIntoNewTaskForm', null)
        .set('projectLoadedIntoNewTaskForm', null);
    case ENDED_SUBMIT_NEW_ACTIVITY:
      return state;
        // .set(
        //   'selectedProject',
        //   state.get('selectedProject').get('activities'),
        // );
    default:
      return state;
  }
}

export default projectPageReducer;
