/*
 *
 * TimesheetPage reducer
 *
 */

import { fromJS } from 'immutable';
import addMonths from 'date-fns/add_months';
import {
  NEW_DATE_SELECTED,
  NEXT_MONTH_CLICKED,
  PREVIOUS_MONTH_CLICKED,
} from './constants';

const initialState = fromJS({
  selectedDate: new Date(),
  timeSlotEntries: [],
});

function timesheetPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case NEW_DATE_SELECTED:
      return state.set('selectedDate', payload);
    case NEXT_MONTH_CLICKED:
      return state.set('selectedDate', addMonths(state.get('selectedDate'), 1));
    case PREVIOUS_MONTH_CLICKED:
      return state.set('selectedDate', addMonths(state.get('selectedDate'), -1));
    default:
      return state;
  }
}

export default timesheetPageReducer;
