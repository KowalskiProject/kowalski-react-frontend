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
  CLOSE_ADD_PEOPLE_FORM,
  OPEN_ADD_PEOPLE_FORM,
  ENDED_LOAD_USERS,
  UPDATE_MEMBER_LIST,
  UPDATE_PROJECT_ATTRIBUTE,
  END_UPDATING_PROJECT_ATTRIBUTE,
  UPDATE_LOADED_PROJECT_ATTRIBUTE,
  POP_UPDATE_PROJECT_ERROR_MSG,
  UPDATE_INLINE_PROJECT_FORM_ERROR_MSG,
  UPDATE_FIELD,
  RESET_FIELD_VALUE,
} from './constants';
import { CLEAN_UP_STATE } from '../App/constants';
import { STATE_NORMAL } from '../../components/InlineEdit';

const inlineProjectFormFieldInitState = { state: STATE_NORMAL, value: undefined, originalValue: undefined };

const initialState = fromJS({
  projectCodes: [],
  selectedProjectId: null,
  selectedProject: null,
  users: [],
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
  loadingUsersError: '',
  isAddPeopleFormOpen: false,
  updateProjectAttributesStatus: {},
  updateProjectAttributesErrorMsg: '',
  inlineProjectFormFields: {
    name: inlineProjectFormFieldInitState,
    accountableId: inlineProjectFormFieldInitState,
    startDate: inlineProjectFormFieldInitState,
    endDate: inlineProjectFormFieldInitState,
    description: inlineProjectFormFieldInitState,
    code: inlineProjectFormFieldInitState,
  },
  inlineProjectFormErrorMsg: '',
});

function projectPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_SELECTED_PROJECT_CODE:
      return state
        .set('updateProjectAttributesStatus', initialState.get('updateProjectAttributesStatus'))
        .set('updateProjectAttributesErrorMsg', initialState.get('updateProjectAttributesErrorMsg'))
        .set('loadingProjectError', '')
        .set('selectedProject', null)
        .set('selectedProjectId', payload);
    case LOADED_SELECTED_PROJECT:
      return state
        .set('loadingProjectError', payload.success ? '' : payload.errorMsg)
        .set('selectedProject', payload.success ? payload.data : null)
        .set(
          'inlineProjectFormFields',
          state.get('inlineProjectFormFields').map((value, fieldName) => (
            value
              .set('state', STATE_NORMAL)
              .set('value', payload.data.get(fieldName))
              .set('originalValue', payload.data.get(fieldName))
          ))
        );
    case UPDATE_FIELD:
      return state.updateIn(
        ['inlineProjectFormFields', payload.fieldName],
        (field) => payload.attribute !== 'originalValue'
          ? field.set(payload.attribute, payload.newValue)
          : field,
      );
    case RESET_FIELD_VALUE:
      return state.setIn(
        ['inlineProjectFormFields', payload, 'value'],
        state.getIn(['inlineProjectFormFields', payload, 'originalValue']),
      );
    case END_PROJECT_CODES_LOADING:
      return state
        .set('loadingProjectCodesError', payload.success ? '' : payload.errorMsg)
        .set('projectCodes', payload.success ? payload.data : List());
    case ENDED_LOAD_USERS:
      return state
        .set('loadingUsersError', payload.success ? '' : payload.errorMsg)
        .set('users', payload.success ? payload.data : List());
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
    case CLOSE_ADD_PEOPLE_FORM:
      return state.set('isAddPeopleFormOpen', false);
    case OPEN_ADD_PEOPLE_FORM:
      return state.set('isAddPeopleFormOpen', true);
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
        .set('activityLoadedIntoNewTaskForm', payload.activity);
    case DISMISS_NEW_TASK_DIALOG:
      return state
        .set('isNewTaskFormDialogOpened', false)
        .set('activityLoadedIntoNewTaskForm', null)
        .set('projectLoadedIntoNewTaskForm', null);
    case UPDATE_MEMBER_LIST:
      return state
        .setIn(['selectedProject', 'people'], payload);
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
    case UPDATE_PROJECT_ATTRIBUTE:
      return state.updateIn(
        ['updateProjectAttributesStatus'],
        (updateProjectAttributesStatus) => updateProjectAttributesStatus.merge(payload.map(() => true))
      );
    case END_UPDATING_PROJECT_ATTRIBUTE:
      return state.updateIn(
        ['updateProjectAttributesStatus'],
        (updateProjectAttributesStatus) => updateProjectAttributesStatus.merge(payload.map(() => false))
      );
    case UPDATE_LOADED_PROJECT_ATTRIBUTE:
      return state.updateIn(
        ['selectedProject'],
        (project) => project.merge(payload)
      );
    case POP_UPDATE_PROJECT_ERROR_MSG:
      return state.set('updateProjectAttributesErrorMsg', payload);
    case UPDATE_INLINE_PROJECT_FORM_ERROR_MSG:
      return state.set('inlineProjectFormErrorMsg', payload);
    case CLEAN_UP_STATE:
      return initialState;
    default:
      return state;
  }
}

export default projectPageReducer;
