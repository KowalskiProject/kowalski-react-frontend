/*
 *
 * PeoplePage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  OPEN_NEW_PERSON_FORM,
  CLOSE_NEW_PERSON_FORM,
  START_PEOPLE_LOADING,
  END_PEOPLE_LOADING,
  END_FETCHING_NEW_PERSON_FORM_OPTIONS,
  START_FETCHING_NEW_PERSON_FORM_OPTIONS,
} from './constants';

const initialState = fromJS({
  people: [],
  personFormOpen: false,
  isLoadingPeople: false,
  loadingPeopleErrorMsg: '',
  isFetchingNewPersonFormOptions: false,
  roles: [],
});

function peoplePageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case END_FETCHING_NEW_PERSON_FORM_OPTIONS:
      return state
        .set('isFetchingNewPersonFormOptions', false)
        .set('roles', payload.success ? payload.data : List());
    case START_FETCHING_NEW_PERSON_FORM_OPTIONS:
      return state.set('isFetchingNewPersonFormOptions', true);
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
