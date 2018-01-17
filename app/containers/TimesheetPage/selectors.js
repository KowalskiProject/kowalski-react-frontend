import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

/**
 * Direct selector to the timesheetPage state domain
 */
const selectTimesheetPageDomain = (state) => state.get('timesheetpage') || fromJS({});

const makeSelectSelectedDate = createSelector(
  [selectTimesheetPageDomain],
  (substate) => substate.get('selectedDate'),
);

const makeSelectSelectedRange = createSelector(
  [makeSelectSelectedDate],
  (selectedDate) => {
    const extractedStartOfWeek = startOfWeek(selectedDate);
    const extractedEndOfWeek = endOfWeek(selectedDate);
    return [extractedStartOfWeek, extractedEndOfWeek];
  }
);

export {
  selectTimesheetPageDomain,
  makeSelectSelectedDate,
  makeSelectSelectedRange,
};
