import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import format from 'date-fns/format';
import { DATE_DAY_FORMAT } from './constants';

/**
 * Direct selector to the timesheetPage state domain
 */
const selectTimesheetPageDomain = (state) => state.get('timesheetpage') || Map();

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

const makeSelectIsSubmitting = createSelector(
  [selectTimesheetPageDomain],
  (substate) => substate.get('isSubmitting'),
);

const makeTimeSlotEntriesSelector = createSelector(
  [selectTimesheetPageDomain],
  (substate) => substate.get('timeSlotEntries') || List(),
);

const makeTimeSlotDayMapSelector = createSelector(
  makeTimeSlotEntriesSelector,
  (timeSlotEntries) => {
    const result = timeSlotEntries.reduce((accumulator, timeSlotEntry) => {
      const dateDayFormat = format(timeSlotEntry.get('day'), DATE_DAY_FORMAT);
      return accumulator.set(
        dateDayFormat,
        (accumulator.get(dateDayFormat) || List()).push(timeSlotEntry)
      );
    }, Map());
    return result;
  },
);

export {
  selectTimesheetPageDomain,
  makeSelectSelectedDate,
  makeSelectSelectedRange,
  makeSelectIsSubmitting,
  makeTimeSlotEntriesSelector,
  makeTimeSlotDayMapSelector,
};
