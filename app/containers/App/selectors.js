/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectPageBeforeAuthError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('pageBeforeAuthError'),
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLocation,
  makeSelectPageBeforeAuthError,
};
