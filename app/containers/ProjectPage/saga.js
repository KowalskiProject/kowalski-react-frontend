import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import {
  UPDATE_SELECTED_PROJECT_CODE,
  LOAD_PROJECT_CODES,
  OTHER_PROJECT_CLICKED,
} from './constants';
import { loadedSelectedProject, loadedProjectCodes } from './actions';
import { startLoadingResource, endLoadingResource } from '../App/actions';
import { makeSelectProjectCodes } from '../ProjectsPage/selectors';
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
    console.log('Project Not found');
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

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(UPDATE_SELECTED_PROJECT_CODE, handleSelectedProjectCode);
  yield takeEvery(LOAD_PROJECT_CODES, handleLoadProjectCodes);
  yield takeEvery(OTHER_PROJECT_CLICKED, handleProjectSelected);
}
