import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  reset,
  stopSubmit,
  startSubmit,
} from 'redux-form';
import { fromJS } from 'immutable';
import {
  startProjectLoading,
  closeNewProjectForm,
  endProjectLoading,
} from './actions';

import {
  expiredSessionDetected,
} from '../App/actions';

import {
  SUBMIT_NEW_PROJECT_FORM,
  SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT,
  NEW_PROJECT_FORM_ID,
  CLOSE_NEW_PROJECT_FORM,
  PROJECT_SELECTED,
  START_PROJECTS_LOADING,
} from './constants';
import { getProjects, createProject } from '../../support/backend/KowalskiBackendClient';
import { SERVER_BASE_URL } from '../../utils/constants';

export function* submitProjectForm({ payload }) {
  yield put(startSubmit(NEW_PROJECT_FORM_ID));
  try {
    yield call(createProject, {
      config: { baseUrl: SERVER_BASE_URL },
      token: localStorage.getItem('authToken'),
      projectData: payload.toJSON(),
    });
    yield put(stopSubmit(NEW_PROJECT_FORM_ID));
    yield put(startProjectLoading());
    return true;
  } catch (e) {
    yield put(stopSubmit(
      NEW_PROJECT_FORM_ID,
      { _error: 'Houve um erro enquanto se tentava comunicar com o servidor =(' },
    ));
  }

  return false;
}

export function* handleSubmit({ payload }) {
  const successful = yield submitProjectForm({ payload });
  if (successful) {
    yield clearProjectForm();
  }
}

export function* handleSubmitAndCloseForm({ payload }) {
  const successful = yield submitProjectForm({ payload });
  if (successful) {
    yield put(closeNewProjectForm());
  }
}

export function* clearProjectForm() {
  yield put(reset(NEW_PROJECT_FORM_ID));
}

export function* handleProjectSelected({ payload }) {
  yield put(push(`/projects/${payload}`));
}

export function* handleProjectLoading() {
  try {
    const projects = yield call(
      getProjects,
      { config: { baseUrl: SERVER_BASE_URL }, token: localStorage.getItem('authToken') },
    );
    yield put(endProjectLoading({ success: true, data: fromJS(projects) }));
  } catch (e) {
    if (e.response && e.response.status) {
      if (e.response.status === 403) {
        yield put(endProjectLoading({ success: false, errorMsg: null }));
        yield put(expiredSessionDetected());
        return;
      }
    }
    yield put(endProjectLoading({ success: false, errorMsg: 'Houve um erro enquanto se tentava comunicar com o servidor =(' }));
  }
}

export default function* defaultSaga() {
  yield takeEvery(SUBMIT_NEW_PROJECT_FORM, handleSubmit);
  yield takeEvery(SUBMIT_NEW_PROJECT_FORM_AND_CLOSE_IT, handleSubmitAndCloseForm);
  yield takeEvery(CLOSE_NEW_PROJECT_FORM, clearProjectForm);
  yield takeEvery(PROJECT_SELECTED, handleProjectSelected);
  yield takeEvery(START_PROJECTS_LOADING, handleProjectLoading);
}
