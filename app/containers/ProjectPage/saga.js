import { takeEvery, call, all, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { reset, startSubmit, stopSubmit } from 'redux-form';
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
  updateSelectedProjectCode,
} from './actions';

import {
  getProjects,
  getProject,
  getProjectAccountable,
  getProjectMembers,
  getProjectActivities,
  createActivity,
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

export function* handleSubmitNewTaskForm({ payload }) {
  yield put(startSubmit(NEW_TASK_FORM_ID));
  try {
    yield call(createActivity, {
      config: { baseUrl: SERVER_BASE_URL },
      token: localStorage.getItem('authToken'),
      activityData: payload.toJSON(),
    });
    yield put(stopSubmit(NEW_TASK_FORM_ID));
    yield put(startProjectLoading());
    return true;
  } catch (e) {
    console.log('Error while trying to submit form: ', e);
    yield put(stopSubmit(
      NEW_TASK_FORM_ID,
      { _error: 'There was an error while trying to communicate with the server =(' },
    ));
  }

  return false;
}

export function* handleSubmitNewTaskFormAndCloseIt({ payload: { taskData, activity, project } }) {
  yield handleSubmitNewTaskForm({ payload: { taskData, activity, project } });
  yield put(dismissNewTaskDialog());
}

export function* handleSubmitNewActivityForm({ payload }) {
  yield put(startSubmit(NEW_ACTIVITY_FORM_ID));
  try {
    yield call(createActivity, {
      config: { baseUrl: SERVER_BASE_URL },
      token: localStorage.getItem('authToken'),
      projectId: payload.get('projectId'),
      activityData: payload.toJSON(),
    });
    yield put(stopSubmit(NEW_ACTIVITY_FORM_ID));
    yield put(updateSelectedProjectCode(payload.get('projectId')));
    return true;
  } catch (e) {
    console.log('Error while trying to submit form: ', e);
    yield put(stopSubmit(
      NEW_ACTIVITY_FORM_ID,
      { _error: 'There was an error while trying to communicate with the server =(' },
    ));
  }

  return false;
}

export function* handleSubmitNewActivityFormAndCloseIt({ payload }) {
  const successful = yield handleSubmitNewActivityForm({ payload });
  if (successful) {
    yield put(dismissNewActivityDialog());
  }
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
