import { takeEvery, call, all, put } from 'redux-saga/effects';
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
  endProjectCodesLoading,
  endedSubmitNewActivity,
  endedSubmitNewTask,
  dismissNewTaskDialog,
  dismissNewActivityDialog,
} from './actions';

import {
  getProjects,
  getProject,
  getProjectAccountable,
  getProjectMembers,
  getProjectActivities,
} from '../../support/backend/KowalskiBackendClient';

import { expiredSectionDetected } from '../App/actions';

import projects from '../../support/development/projects';
import { handleProjectSelected } from '../ProjectsPage/saga';
import { SERVER_BASE_URL } from '../../utils/constants';

export function* handleSelectedProjectCode({ payload }) {
  const commonConfig = {
    config: { baseUrl: SERVER_BASE_URL },
    token: localStorage.getItem('authToken'),
    projectId: payload
  };

  try {
    const [ project, members, activities ] = yield all([
      call(getProject, commonConfig),
      call(getProjectMembers, commonConfig),
      call(getProjectActivities, commonConfig),
    ]);

    console.log(project, members, activities);

    yield put(loadedSelectedProject({
      success: true,
      data: fromJS({ ...project, people: members, activities })
    }));
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status) {
      if (e.response.status === 403) {
        yield put(loadedSelectedProject({ success: false, errorMsg: null }));
        yield put(expiredSectionDetected());
        return;
      }
    }
    yield put(loadedSelectedProject({ success: false, errorMsg: 'There was an error while trying to communicate with the server =(' }));
  }
}

export function* handleLoadProjectCodes() {
  try {
    const projects = yield call(
      getProjects,
      { config: { baseUrl: SERVER_BASE_URL }, token: localStorage.getItem('authToken') },
    );
    const projectCodes = projects.map((project) => project.projectId);
    console.log(projectCodes);
    yield put(endProjectCodesLoading({ success: true, data: fromJS(projectCodes) }));
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status) {
      if (e.response.status === 403) {
        yield put(endProjectCodesLoading({ success: false, errorMsg: null }));
        yield put(expiredSectionDetected());
        return;
      }
    }
    yield put(endProjectCodesLoading({ success: false, errorMsg: 'There was an error while trying to communicate with the server =(' }));
  }
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
