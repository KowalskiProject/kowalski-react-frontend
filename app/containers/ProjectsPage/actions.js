/*
 *
 * ProjectsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  OPEN_NEW_PROJECT_FORM,
  CLOSE_NEW_PROJECT_FORM,
  SUBMIT_NEW_PROJECT_FORM,
  NEW_PROJECT_SAVED,
  SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function openNewProjectForm() {
  return {
    type: OPEN_NEW_PROJECT_FORM,
  };
}

export function closeNewProjectForm() {
  return {
    type: CLOSE_NEW_PROJECT_FORM,
  };
}

export function submitNewProjectForm(formData) {
  return {
    type: SUBMIT_NEW_PROJECT_FORM,
    payload: formData,
  };
}

export function submitNewProjectFormAndCloseIt(formData) {
  return {
    type: SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT,
    payload: formData,
  };
}

export function newProjectSaved(newProjectData) {
  return {
    type: NEW_PROJECT_SAVED,
    payload: newProjectData,
  };
}
