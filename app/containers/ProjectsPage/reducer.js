/*
 *
 * ProjectsPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  OPEN_NEW_PROJECT_FORM,
  CLOSE_NEW_PROJECT_FORM,
  START_PROJECTS_LOADING,
  END_PROJECTS_LOADING,
} from './constants';

const initialState = fromJS({
  projects: [],
  projectFormOpen: false,
  isLoadingProjects: false,
  loadingProjectsErrorMsg: '',
});

function projectsPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', true);
    case CLOSE_NEW_PROJECT_FORM:
      return state.set('projectFormOpen', false);
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
