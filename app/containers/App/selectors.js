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

const makeSelectActivePage = () => createSelector(
  makeSelectLocation(),
  (location) => {
    const path = location.pathname;
    if (path.match(/projects/gi)) {
      return 'projects';
    } else if (path.match(/people/gi)) {
      return 'people';
    } else if (path.match(/timesheet/gi)) {
      return 'timesheet';
    }
    throw new Error(`Unmachable path: ${path}`);
  }
);

export {
  selectGlobal,
  selectRoute,
  makeSelectCurrentUser,
  makeSelectLocation,
  makeSelectPageBeforeAuthError,
  makeSelectActivePage,
};
