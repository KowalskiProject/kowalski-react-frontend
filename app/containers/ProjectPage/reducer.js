/*
 *
 * ProjectPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  UPDATE_SELECTED_PROJECT_CODE,
  LOADED_SELECTED_PROJECT,
  END_PROJECT_CODES_LOADING,
  SELECTED_TAB_CHANGED,
  CHANGED_ACTIVITIES_TEXT_FILTER,
  EXPAND_TASK_LIST_ITEM,
  COLLAPSE_TASK_LIST_ITEM,
  LAUNCH_NEW_ACTIVITY_DIALOG,
  DISMISS_NEW_ACTIVITY_DIALOG,
  LAUNCH_NEW_TASK_DIALOG,
  DISMISS_NEW_TASK_DIALOG,
  TASKS_LOADED,
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
  loadingProjectCodesError: '',
  loadingProjectError: '',
});

function projectPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_SELECTED_PROJECT_CODE:
      return state.set('selectedProjectCode', payload);
    case LOADED_SELECTED_PROJECT:
      return state
        .set('loadingProjectError', payload.success ? '' : payload.errorMsg)
        .set('selectedProject', payload.success ? payload.data : null)
        .set('expandedActivityIds', List());
    case END_PROJECT_CODES_LOADING:
      return state
        .set('loadingProjectCodesError', payload.success ? '' : payload.errorMsg)
        .set('projectCodes', payload.success ? payload.data : List());
    case SELECTED_TAB_CHANGED:
      return state.set('selectedTab', payload);
    case CHANGED_ACTIVITIES_TEXT_FILTER:
      return state.set('activityFilteringText', payload);
    case EXPAND_TASK_LIST_ITEM:
      return state.set('expandedActivityIds', state.get('expandedActivityIds').push(payload.activityId));
    case COLLAPSE_TASK_LIST_ITEM:
      return state.set(
        'expandedActivityIds',
        state.get('expandedActivityIds').filter((taskId) => taskId !== payload)
      );
    case LAUNCH_NEW_ACTIVITY_DIALOG:
      return state
        .set('isNewActivityFormDialogOpened', true)
        .set('projectLoadedIntoNewActivityForm', payload);
    case DISMISS_NEW_ACTIVITY_DIALOG:
      return state
        .set('isNewActivityFormDialogOpened', false)
        .set('projectLoadedIntoNewActivityForm', null);
    case LAUNCH_NEW_TASK_DIALOG:
      return state
        .set('isNewTaskFormDialogOpened', true)
        .set('activityLoadedIntoNewTaskForm', payload.activity)
        .set('projectLoadedIntoNewTaskForm', payload.project);
    case DISMISS_NEW_TASK_DIALOG:
      return state
        .set('isNewTaskFormDialogOpened', false)
        .set('activityLoadedIntoNewTaskForm', null)
        .set('projectLoadedIntoNewTaskForm', null);
    case TASKS_LOADED:
      return state.setIn([
        'selectedProject', 'activities',
        state.get('selectedProject').get('activities').findIndex((activity) => (
          activity.get('activityId') === payload.activityId
        )),
        'tasks',
      ],
      payload.taskList
    );
    default:
      return state;
  }
}

export default projectPageReducer;
