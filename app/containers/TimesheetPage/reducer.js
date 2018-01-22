/*
 *
 * TimesheetPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import addMonths from 'date-fns/add_months';
import {
  NEW_DATE_SELECTED,
  NEXT_MONTH_CLICKED,
  PREVIOUS_MONTH_CLICKED,
  SUBMIT_LOG_FORM,
  NEW_LOG_SAVED,
} from './constants';

const initialState = fromJS({
  selectedDate: new Date(),
  timeSlotEntries: [],
  isSubmitting: false,
});

function timesheetPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SUBMIT_LOG_FORM:
      return state.set('isSubmitting', true);
    case NEW_LOG_SAVED:
      return state
        .set('isSubmitting', false)
        .set('timeSlotEntries', (state.get('timeSlotEntries') || List()).push(payload));
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
