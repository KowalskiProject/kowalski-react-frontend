import { takeEvery, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { reset } from 'redux-form';
import {
  UPDATE_SELECTED_PROJECT_CODE,
  LOAD_PROJECT_CODES,
  OTHER_PROJECT_CLICKED,
  SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT,
  SUBMIT_NEW_ACTIVITY_FORM_AND_CLOSE_IT,
  SUBMIT_NEW_TASK_FORM,
  SUBMIT_NEW_ACTIVITY_FORM,
  DISMISS_NEW_ACTIVITY_DIALOG,
  DISMISS_NEW_TASK_DIALOG,
  NEW_TASK_FORM_ID,
  NEW_ACTIVITY_FORM_ID,
} from './constants';
import {
  loadedSelectedProject,
  loadedProjectCodes,
  endedSubmitNewActivity,
  endedSubmitNewTask,
  dismissNewTaskDialog,
  dismissNewActivityDialog,
} from './actions';
import { startLoadingResource, endLoadingResource } from '../App/actions';
import projects from '../../support/development/projects';
import { handleProjectSelected } from '../ProjectsPage/saga';

export function* handleSelectedProjectCode({ payload }) {
  yield put(startLoadingResource());
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  }));
  yield put(endLoadingResource());

  // Temporary Solution - must request to the server
  const foundProject = projects.find((project) => project.code === payload);
  if (foundProject !== null) {
    yield put(loadedSelectedProject(foundProject));
  } else {
    // TODO present an error on the page
  }
}

export function* handleLoadProjectCodes() {
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  }));
  // TEMPORARY SOLUTION -> should request from server
  const projectCodesFromAlreadyLoadedProjects = fromJS(projects.map((project) => project.code));

  yield put(loadedProjectCodes(projectCodesFromAlreadyLoadedProjects));
}

export function* handleSubmitNewTaskForm({ payload: { taskData, activity, project } }) {
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  }));

  yield put(endedSubmitNewTask({ taskData, activity, project }));
}

export function* handleSubmitNewTaskFormAndCloseIt({ payload: { taskData, activity, project } }) {
  yield handleSubmitNewTaskForm({ payload: { taskData, activity, project } });
  yield put(dismissNewTaskDialog());
}

export function* handleSubmitNewActivityForm({ payload: { taskData, project } }) {
  yield call(() => new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  }));

  yield put(endedSubmitNewActivity({ payload: { taskData, project } }));
}

export function* handleSubmitNewActivityFormAndCloseIt({ payload: { taskData, project } }) {
  yield handleSubmitNewActivityForm({ payload: { taskData, project } });
  yield put(dismissNewActivityDialog());
}

export function* clearTaskForm() {
  yield put(reset(NEW_TASK_FORM_ID));
}

export function* clearActivityForm() {
  yield put(reset(NEW_ACTIVITY_FORM_ID));
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(UPDATE_SELECTED_PROJECT_CODE, handleSelectedProjectCode);
  yield takeEvery(LOAD_PROJECT_CODES, handleLoadProjectCodes);
  yield takeEvery(OTHER_PROJECT_CLICKED, handleProjectSelected);
  yield takeEvery(SUBMIT_NEW_TASK_FORM, handleSubmitNewTaskForm);
  yield takeEvery(SUBMIT_NEW_TASK_FORM_AND_CLOSE_IT, handleSubmitNewTaskFormAndCloseIt);
  yield takeEvery(SUBMIT_NEW_ACTIVITY_FORM, handleSubmitNewActivityForm);
  yield takeEvery(SUBMIT_NEW_ACTIVITY_FORM_AND_CLOSE_IT, handleSubmitNewActivityFormAndCloseIt);
  yield takeEvery(DISMISS_NEW_ACTIVITY_DIALOG, clearActivityForm);
  yield takeEvery(DISMISS_NEW_TASK_DIALOG, clearTaskForm);
}
