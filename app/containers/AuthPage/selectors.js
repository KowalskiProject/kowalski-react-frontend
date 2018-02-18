import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**
 * Direct selector to the authPage state domain
 */
const selectAuthPageDomain = (state) => state.get('authpage') || fromJS({});

/**
 * Other specific selectors
 */


/**
 * Default selector used by AuthPage
 */

const makeSelectAuthPage = () => createSelector(
  selectAuthPageDomain,
  (substate) => substate.toJS()
);

const makeSelectUsername = () => createSelector(
  selectAuthPageDomain,
  (substate) => substate.get('username'),
);

const makeSelectPassword = () => createSelector(
  selectAuthPageDomain,
  (substate) => substate.get('password'),
);

const makeSelectIsSubmitting = () => createSelector(
  selectAuthPageDomain,
  (substate) => substate.get('isSubmitting'),
);

const makeSelectServerErrorMsg = () => createSelector(
  selectAuthPageDomain,
  (substate) => substate.get('serverErrorMsg'),
);

export default makeSelectAuthPage;
export {
  selectAuthPageDomain,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectIsSubmitting,
  makeSelectServerErrorMsg,
};
