import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**
 * Direct selector to the timesheetPage state domain
 */
const selectTimesheetPageDomain = (state) => state.get('timesheetPage') || fromJS({});

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
