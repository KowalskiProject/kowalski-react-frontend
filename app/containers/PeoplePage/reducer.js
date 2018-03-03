/*
 *
 * PeoplePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  OPEN_NEW_PERSON_FORM,
  CLOSE_NEW_PERSON_FORM,
  START_PEOPLE_LOADING,
  END_PEOPLE_LOADING,
} from './constants';

const initialState = fromJS({
  people: [],
  personFormOpen: false,
  isLoadingPeople: false,
  loadingPeopleErrorMsg: '',
});

function peoplePageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_NEW_PERSON_FORM:
      return state.set('personFormOpen', true);
    case CLOSE_NEW_PERSON_FORM:
      return state.set('personFormOpen', false);
    case START_PEOPLE_LOADING:
      return state.set('isLoadingPeople', true);
    case END_PEOPLE_LOADING:
      return state
        .set('isLoadingPeople', false)
        .set('loadingPeopleErrorMsg', payload.success ? '' : payload.errorMsg)
        .set('people', payload.success ? payload.data : state.get('people'));
    default:
      return state;
  }
}

export default peoplePageReducer;
