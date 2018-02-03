import { takeEvery, call, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import {
  newProjectSaved,
  closeNewProjectForm,
} from './actions';

import {
  SUBMIT_NEW_PROJECT_FORM,
  SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT,
  NEW_PROJECT_FORM_ID,
  CLOSE_NEW_PROJECT_FORM,
} from './constants';

export function* submitProjectForm({ payload }) {
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  }));
  yield put(newProjectSaved(payload));
}

export function* handleSubmit({ payload }) {
  yield submitProjectForm({ payload });
  yield clearProjectForm();
}

export function* handleSubmitAndCloseForm({ payload }) {
  yield submitProjectForm({ payload });
  yield put(closeNewProjectForm());
}

export function* clearProjectForm() {
  yield put(reset(NEW_PROJECT_FORM_ID));
}

export default function* defaultSaga() {
  yield takeEvery(SUBMIT_NEW_PROJECT_FORM, handleSubmit);
  yield takeEvery(SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT, handleSubmitAndCloseForm);
  yield takeEvery(CLOSE_NEW_PROJECT_FORM, clearProjectForm);
}
