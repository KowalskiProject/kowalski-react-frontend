import { createSelector } from 'reselect';
import { fromJS, Map } from 'immutable';

/**
 * Direct selector to the peoplePage state domain
 */
const selectPeoplePageDomain = (state) => state.get('peoplePage') || Map();

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
  (substate) => substate.get('people') || fromJS([])
);

const makeSelectIsNewPersonFormOpen = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('personFormOpen'),
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
  (substate) => substate.get('loadingPeopleErrorMsg'),
);

const makeSelectNewPersonFormSubmissionError = () => createSelector(
  selectPeoplePageDomain,
  (substate) => substate.get('newPersonFormSubmissionError'),
);

export {
  selectPeoplePageDomain,
  makeSelectPeople,
  makeSelectIsNewPersonFormOpen,
  makeSelectIsSubmittingNewPerson,
  makeSelectIsLoadingPeople,
  makeSelectLoadingPeopleErrorMsg,
  makeSelectNewPersonFormSubmissionError,
};

export default makeSelectPeoplePage;
