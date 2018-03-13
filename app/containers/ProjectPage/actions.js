/*
 *
 * ProjectPage actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_SELECTED_PROJECT_CODE,
  LOADED_SELECTED_PROJECT,
  LOAD_PROJECT_CODES,
  END_PROJECT_CODES_LOADING,
  SELECTED_TAB_CHANGED,
  OTHER_PROJECT_CLICKED,
  CHANGED_ACTIVITIES_TEXT_FILTER,
  EXPAND_TASK_LIST_ITEM,
  COLLAPSE_TASK_LIST_ITEM,
  LAUNCH_NEW_TASK_DIALOG,
  DISMISS_NEW_TASK_DIALOG,
  SUBMIT_NEW_TASK_FORM,
  LAUNCH_NEW_ACTIVITY_DIALOG,
  DISMISS_NEW_ACTIVITY_DIALOG,
  SUBMIT_NEW_ACTIVITY_FORM,
  SUBMIT_NEW_ACTIVITY_FORM_AND_CLOSE_IT,
  SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT,
  ENDED_SUBMIT_NEW_TASK,
  ENDED_SUBMIT_NEW_ACTIVITY,
  TASKS_LOADED,
  CLOSE_ADD_PEOPLE_FORM,
  OPEN_ADD_PEOPLE_FORM,
  SUBMIT_ADD_PEOPLE_FORM_AND_CLOSE_IT,
  LOAD_USERS,
  ENDED_LOAD_USERS,
  UPDATE_MEMBER_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateSelectedProjectId(projectCode) {
  return {
    type: UPDATE_SELECTED_PROJECT_CODE,
    payload: projectCode,
  };
}

export function otherProjectClicked(projectCode) {
  return {
    type: OTHER_PROJECT_CLICKED,
    payload: projectCode,
  };
}

export function loadedSelectedProject(projectData) {
  return {
    type: LOADED_SELECTED_PROJECT,
    payload: projectData,
  };
}

export function loadProjectCodes() {
  return {
    type: LOAD_PROJECT_CODES,
  };
}

export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

export function endProjectCodesLoading(payload) {
  return {
    type: END_PROJECT_CODES_LOADING,
    payload,
  };
}

export function selectedTabChanged(index) {
  return {
    type: SELECTED_TAB_CHANGED,
    payload: index,
  };
}

export function changedActivitiesTextFilter(newText) {
  return {
    type: CHANGED_ACTIVITIES_TEXT_FILTER,
    payload: newText,
  };
}

export function expandTaskListItem(activityId, projectId, people) {
  return {
    type: EXPAND_TASK_LIST_ITEM,
    payload: { activityId, projectId, people },
  };
}

export function collapseTaskListItem(taskId) {
  return {
    type: COLLAPSE_TASK_LIST_ITEM,
    payload: taskId,
  };
}

export function launchNewTaskDialog(activity) {
  return {
    type: LAUNCH_NEW_TASK_DIALOG,
    payload: { activity },
  };
}

export function dismissNewTaskDialog() {
  return {
    type: DISMISS_NEW_TASK_DIALOG,
  };
}

export function submitNewTaskForm(payload) {
  return {
    type: SUBMIT_NEW_TASK_FORM,
    payload,
  };
}

export function submitNewTaskFormAndCloseIt(payload) {
  return {
    type: SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT,
    payload,
  };
}

export function endedSubmitNewTask({ activityData, activity, project }) {
  return {
    type: ENDED_SUBMIT_NEW_TASK,
    payload: { activityData, activity, project },
  };
}

export function launchNewActivityDialog(project) {
  return {
    type: LAUNCH_NEW_ACTIVITY_DIALOG,
    payload: project,
  };
}

export function dismissNewActivityDialog() {
  return {
    type: DISMISS_NEW_ACTIVITY_DIALOG,
  };
}

export function submitNewActivityForm(payload) {
  return {
    type: SUBMIT_NEW_ACTIVITY_FORM,
    payload,
  };
}

export function submitNewActivityFormAndCloseIt(payload) {
  return {
    type: SUBMIT_NEW_ACTIVITY_FORM_AND_CLOSE_IT,
    payload,
  };
}

export function endedSubmitNewActivity({ activityData, project }) {
  return {
    type: ENDED_SUBMIT_NEW_ACTIVITY,
    payload: { activityData, project },
  };
}

export function tasksLoaded({ activityId, taskList }) {
  return {
    type: TASKS_LOADED,
    payload: { activityId, taskList },
  };
}

export function closeAddPeopleForm() {
  return {
    type: CLOSE_ADD_PEOPLE_FORM,
  };
}

export function openAddPeopleForm() {
  return {
    type: OPEN_ADD_PEOPLE_FORM,
  };
}

export function submitAddPeopleFormAndCloseIt(payload) {
  return {
    type: SUBMIT_ADD_PEOPLE_FORM_AND_CLOSE_IT,
    payload,
  };
}

export function endedUsersLoading(payload) {
  return {
    type: ENDED_LOAD_USERS,
    payload,
  };
}

export function updateMemberList(payload) {
  return {
    type: UPDATE_MEMBER_LIST,
    payload,
  };
}
