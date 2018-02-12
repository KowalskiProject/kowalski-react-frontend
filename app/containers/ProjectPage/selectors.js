import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

/**

 * Direct selector to the projectPage state domain

 */

const selectProjectPageDomain = (state) => state.get('projectpage') || fromJS({});

/**

 * Other specific selectors

 */

const makeSelectProjectCodes = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('projectCodes')
);


/**

 * Default selector used by ProjectPage

 */

const makeSelectProjectPage = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.toJS()
);

const makeSelectSelectedProjectCode = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('selectedProjectCode'),
);

const makeSelectSelectedProject = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('selectedProject'),
);

const makeSelectSelectedTab = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('selectedTab'),
);

const makeSelectActivityFilteringText = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('activityFilteringText'),
);

const makeSelectExpandedTaskIds = () => createSelector(
  selectProjectPageDomain,
  (substate) => substate.get('expandedTaskIds'),
);

export default makeSelectProjectPage;

export {
  selectProjectPageDomain,
  makeSelectProjectCodes,
  makeSelectSelectedProjectCode,
  makeSelectSelectedProject,
  makeSelectSelectedTab,
  makeSelectActivityFilteringText,
  makeSelectExpandedTaskIds,
};

