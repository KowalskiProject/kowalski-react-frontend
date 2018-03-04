import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';

/**

 * Direct selector to the projectPage state domain

 */

const selectProjectPageDomain = (state) => state.get('projectpage') || fromJS({});

/**

 * Other specific selectors

 */

const makeSelectProjectCodes = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('projectCodes')
);


/**

 * Default selector used by ProjectPage

 */

const makeSelectProjectPage = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.toJS()
);

const makeSelectSelectedProjectCode = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('selectedProjectCode'),
);

const makeSelectSelectedProject = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('selectedProject'),
);

const makeSelectSelectedTab = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('selectedTab'),
);

const makeSelectActivityFilteringText = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('activityFilteringText'),
);

const makeSelectExpandedTaskIds = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('expandedActivityIds'),
);

const makeSelectIsNewTaskFormDialogOpened = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('isNewTaskFormDialogOpened'),
);

const makeSelectActivityLoadedIntoNewTaskForm = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('activityLoadedIntoNewTaskForm'),
);

const makeSelectIsNewActivityFormDialogOpened = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('isNewActivityFormDialogOpened'),
);

const makeSelectProjectLoadedIntoNewTaskForm = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('projectLoadedIntoNewTaskForm'),
);

const makeSelectProjectLoadedIntoNewActivityForm = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('projectLoadedIntoNewActivityForm'),
);

const makeSelectIsSubmittingNewActivity = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('isSubmittingNewActivity'),
);

const makeSelectIsSubmittingNewTask = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('isSubmittingNewTask'),
);

const makeSelectLoadingProjectCodesError = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('loadingProjectCodesError'),
);

const makeSelectLoadingProjectError = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('loadingProjectError'),
);

const makeSelectIsAddPeopleFormOpen = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('isAddPeopleFormOpen'),
);

const makeSelectUsers = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('users'),
);

const makeSelectUserIdsInProject = () => createSelector(
  makeSelectSelectedProject(),
  (selectedProject) => (
    selectedProject
       ? selectedProject.get('people').map((person) => person.get('kUserId'))
       : List()
  ),
);

const makeSelectLoadingUsersError = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('loadingUsersError'),
);

const makeSelectUsersInProject = () => createSelector(
  [makeSelectUserIdsInProject(), makeSelectUsers()],
  (userIdsInProject, users) => users.filter((user) => userIdsInProject.includes(user.get('kUserId'))),
);

const makeSelectUsersNotInProject = () => createSelector(
  [makeSelectUserIdsInProject(), makeSelectUsers()],
  (userIdsInProject, users) => users.filter((user) => !userIdsInProject.includes(user.get('kUserId'))),
);

export default makeSelectProjectPage;

export {
  selectProjectPageDomain,
  makeSelectProjectCodes,
  makeSelectSelectedProjectCode,
  makeSelectSelectedProject,
  makeSelectSelectedTab,
  makeSelectActivityFilteringText,
  makeSelectExpandedTaskIds,
  makeSelectIsNewTaskFormDialogOpened,
  makeSelectActivityLoadedIntoNewTaskForm,
  makeSelectIsNewActivityFormDialogOpened,
  makeSelectProjectLoadedIntoNewActivityForm,
  makeSelectIsSubmittingNewActivity,
  makeSelectIsSubmittingNewTask,
  makeSelectProjectLoadedIntoNewTaskForm,
  makeSelectLoadingProjectCodesError,
  makeSelectLoadingProjectError,
  makeSelectIsAddPeopleFormOpen,
  makeSelectUsersInProject,
  makeSelectUsersNotInProject,
  makeSelectLoadingUsersError,
};

