/*
 *
 * ProjectsPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  DEFAULT_ACTION,
  OPEN_NEW_PROJECT_FORM,
  CLOSE_NEW_PROJECT_FORM,
  NEW_PROJECT_SAVED,
  SUBMIT_NEW_PROJECT_FORM,
  SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT,
  START_PROJECTS_LOADING,
  END_PROJECTS_LOADING,
} from './constants';
// import projects from '../../support/development/projects';

const initialState = fromJS({
  projects: [],
  projectFormOpen: false,
  isSubmittingNewProjectForm: false,
  isLoadingProjects: false,
  loadingProjectsErrorMsg: '',
});

function projectsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    case OPEN_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', true);
    case CLOSE_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', false);
    case SUBMIT_NEW_PROJECT_FORM:
    case SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT:
      return state.set('isSubmittingNewProjectForm', true);
    case NEW_PROJECT_SAVED:
      return state
        .set('isSubmittingNewProjectForm', false)
        .set('projects', (state.get('projects') || List()).push(payload));
    case START_PROJECTS_LOADING:
      return state.set('isLoadingProjects', true);
    case END_PROJECTS_LOADING:
      return state
        .set('isLoadingProjects', false)
        .set('loadingProjectsErrorMsg', payload.success ? '' : payload.errorMsg)
        .set('projects', payload.success ? payload.data : state.get('projects'));
    default:
      return state;
  }
}

export default projectsPageReducer;
