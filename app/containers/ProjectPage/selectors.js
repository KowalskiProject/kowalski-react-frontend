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

const makeSelectSelectedProjectId = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('selectedProjectId'),
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

const makeSelectSelectedProjectPeople = () => createSelector(
  makeSelectSelectedProject(),
  (selectedProject) => (
    selectedProject
      ? selectedProject.get('people')
      : List()
  ),
);

const makeSelectUserIdsInProject = () => createSelector(
  makeSelectSelectedProjectPeople(),
  (selectedProjectPeople) => selectedProjectPeople.map((person) => person.get('kUserId')),
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

const makeSelectUpdateProjectAttributesStatus = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('updateProjectAttributesStatus'),
);

const makeSelectUpdateProjectAttributesErrorMsg = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('updateProjectAttributesErrorMsg'),
);

const makeSelectInlineProjectFormFields = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('inlineProjectFormFields'),
);

const makeSelectInlineProjectFormErrorMsg = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('inlineProjectFormErrorMsg'),
);

const makeSelectAccountableOptions = () => createSelector(
  makeSelectSelectedProjectPeople(),
  (people) => people.map((person) => ({ value: person.get('kUserId'), label: person.get('name') })).toJS(),
);

export default makeSelectProjectPage;

export {
  selectProjectPageDomain,
  makeSelectProjectCodes,
  makeSelectSelectedProjectId,
  makeSelectSelectedProject,
  makeSelectSelectedProjectPeople,
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
  makeSelectUpdateProjectAttributesStatus,
  makeSelectUpdateProjectAttributesErrorMsg,
  makeSelectInlineProjectFormFields,
  makeSelectInlineProjectFormErrorMsg,
  makeSelectAccountableOptions,
};

