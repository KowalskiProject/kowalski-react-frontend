import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**
 * Direct selector to the projectsPage state domain
 */
const selectProjectsPageDomain = (state) => state.get('projectspage') || fromJS({});

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProjectsPage
 */

const makeSelectProjectsPage = () => createSelector(
  selectProjectsPageDomain,
  (substate) => substate.toJS()
);

const makeSelectProjects = () => createSelector(
  selectProjectsPageDomain,
  (substate) => substate.get('projects') || fromJS([])
);

const makeSelectProjectCodes = () => createSelector(
  makeSelectProjects(),
  (projects) => projects.map((project) => project.get('code'))
);

const makeSelectIsNewProjectFormOpen = () => createSelector(
  selectProjectsPageDomain,
  (substate) => substate.get('projectFormOpen'),
);

const makeSelectIsSubmittingNewProject = () => createSelector(
  selectProjectsPageDomain,
  (substate) => substate.get('isSubmittingNewProjectForm'),
);

const makeSelectIsLoadingProjects = () => createSelector(
  selectProjectsPageDomain,
  (substate) => substate.get('isLoadingProjects'),
);

const makeSelectLoadingProjectsErrorMsg = () => createSelector(
  selectProjectsPageDomain,
  (substate) => substate.get('makeSelectIsLoadingProjects'),
);

export default makeSelectProjectsPage;
export {
  selectProjectsPageDomain,
  makeSelectProjects,
  makeSelectIsNewProjectFormOpen,
  makeSelectIsSubmittingNewProject,
  makeSelectProjectCodes,
  makeSelectIsLoadingProjects,
  makeSelectLoadingProjectsErrorMsg,
};
