/*
 *
 * ProjectsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  OPEN_NEW_PROJECT_FORM,
  CLOSE_NEW_PROJECT_FORM,
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
