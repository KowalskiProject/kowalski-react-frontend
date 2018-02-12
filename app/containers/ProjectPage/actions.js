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
  LOADED_PROJECT_CODES,
  SELECTED_TAB_CHANGED,
  OTHER_PROJECT_CLICKED,
  CHANGED_ACTIVITIES_TEXT_FILTER,
  EXPAND_TASK_LIST_ITEM,
  COLLAPSE_TASK_LIST_ITEM,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateSelectedProjectCode(projectCode) {
  return {
    type: UPDATE_SELECTED_PROJECT_CODE,
    payload: projectCode,
  };
}

export function otherProjectClicked(projectCode) {
  return {
    type: OTHER_PROJECT_CLICKED,
    payload: projectCode,
  }
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

export function loadedProjectCodes(projectCodes) {
  return {
    type: LOADED_PROJECT_CODES,
    payload: projectCodes,
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

export function expandTaskListItem(taskId) {
  return {
    type: EXPAND_TASK_LIST_ITEM,
    payload: taskId,
  };
}

export function collapseTaskListItem(taskId) {
  return {
    type: COLLAPSE_TASK_LIST_ITEM,
    payload: taskId,
  };
}
