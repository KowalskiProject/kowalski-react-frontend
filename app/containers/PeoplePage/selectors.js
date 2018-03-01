import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**
 * Direct selector to the peoplePage state domain
 */
const selectPeoplePageDomain = (state) => state.get('peoplePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PeoplePage
 */

const makeSelectPeoplePage = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.toJS()
);

const makeSelectPeople = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('projects') || fromJS([])
);

const makeSelectIsNewPersonFormOpen = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('projectFormOpen'),
);

const makeSelectIsSubmittingNewPerson = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('isSubmittingNewPersonForm'),
);

const makeSelectIsLoadingPeople = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('isLoadingPeople'),
);

const makeSelectLoadingPeopleErrorMsg = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('makeSelectIsLoadingPeople'),
);

const makeSelectNewPersonFormSubmissionError = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('newPersonFormSubmissionError'),
);

export default makeSelectPeoplePage;
export {
  selectPeoplePageDomain,
  makeSelectPeople,
  makeSelectIsNewPersonFormOpen,
  makeSelectIsSubmittingNewPerson,
  makeSelectIsLoadingPeople,
  makeSelectLoadingPeopleErrorMsg,
  makeSelectNewPersonFormSubmissionError,
};
