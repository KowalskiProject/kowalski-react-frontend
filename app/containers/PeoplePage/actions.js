/*
 *
 * PeoplePage actions
 *
 */

import {
  OPEN_NEW_PERSON_FORM,
  CLOSE_NEW_PERSON_FORM,
  SUBMIT_NEW_PERSON_FORM,
  NEW_PERSON_SAVED,
  SUBMIT_NEW_PERSON_FORM_AND_CLOSE_IT,
  PERSON_SELECTED,
  START_PEOPLE_LOADING,
  END_PEOPLE_LOADING,
  START_FETCHING_NEW_PERSON_FORM_OPTIONS,
  END_FETCHING_NEW_PERSON_FORM_OPTIONS,
} from './constants';

export function openNewPersonForm() {
  return {
    type: OPEN_NEW_PERSON_FORM,
  };
}

export function closeNewPersonForm() {
  return {
    type: CLOSE_NEW_PERSON_FORM,
  };
}

export function submitNewPersonForm(formData) {
  return {
    type: SUBMIT_NEW_PERSON_FORM,
    payload: formData,
  };
}

export function submitNewPersonFormAndCloseIt(formData) {
  return {
    type: SUBMIT_NEW_PERSON_FORM_AND_CLOSE_IT,
    payload: formData,
  };
}

export function newPersonSaved(newPersonData) {
  return {
    type: NEW_PERSON_SAVED,
    payload: newPersonData,
  };
}

export function personSelected(projectCode) {
  return {
    type: PERSON_SELECTED,
    payload: projectCode,
  };
}

export function startPeopleLoading() {
  return {
    type: START_PEOPLE_LOADING,
  };
}

export function endPeopleLoading(payload) {
  return {
    type: END_PEOPLE_LOADING,
    payload,
  };
}

export function startFetchingNewPersonFormOptions() {
  return {
    type: START_FETCHING_NEW_PERSON_FORM_OPTIONS,
  };
}

export function endFetchingNewPersonFormOptions(payload) {
  return {
    type: END_FETCHING_NEW_PERSON_FORM_OPTIONS,
    payload,
  };
}
