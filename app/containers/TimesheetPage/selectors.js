import { createSelector } from 'reselect';

/**
 * Direct selector to the timesheetPage state domain
 */
const selectTimesheetPageDomain = (state) => state.get('timesheetPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TimesheetPage
 */

const makeSelectTimesheetPage = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectTimesheetPage;
export {
  selectTimesheetPageDomain,
};
