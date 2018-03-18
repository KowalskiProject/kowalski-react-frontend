import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import format from 'date-fns/format';
import { formValueSelector } from 'redux-form/immutable';
import { DATE_DAY_FORMAT, LOG_HOUR_FORM } from './constants';
import { makeSelectLocation } from '../App/selectors';
import { parseQueryParam } from '../../support/parsers/url';

/**
 * Direct selector to the timesheetPage state domain
 */
const selectTimesheetPageDomain = (state) => state.get('timesheetpage') || Map();

/**
 * New Task Form selectors
 */
const makeNewTaskFormSelectedProjectIdSelector = (state) => {
  const value = formValueSelector(LOG_HOUR_FORM)(state, 'projectId');
  if (value) {
    return parseInt(value, 10);
  }
  return value;
};

const makeSelectSelectedDate = createSelector(
  makeSelectLocation(),
  (location) => {
    const dateFromUrl = parseQueryParam(location.search, 'date');
    return dateFromUrl ? new Date(dateFromUrl) : new Date();
  },
);

const makeSelectSelectedTimeRecordIdForEdition = () => createSelector(
  makeSelectLocation(),
  (location) => {
    const trId = parseQueryParam(location.search, 'trId');
    return trId ? parseInt(trId, 10) : undefined;
  },
);

const makeSelectSelectedTimeRecordForEdition = () => createSelector(
  [makeSelectSelectedTimeRecordIdForEdition(), makeTimeRecordsSelector],
  (trId, timeRecords) => timeRecords.find((timeRecord) => timeRecord.get('trId') === trId),
);

const makeSelectSelectedRange = createSelector(
  makeSelectSelectedDate,
  (selectedDate) => {
    const extractedStartOfWeek = startOfWeek(selectedDate);
    const extractedEndOfWeek = endOfWeek(selectedDate);
    return [extractedStartOfWeek, extractedEndOfWeek];
  }
);

const makeTimeRecordsSelector = createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('timeRecords'),
);

const makeIsTaskOverlaySelectOpened = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('isTaskOverlaySelectOpened'),
);

const makeSelectFormProjects = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('formProjects'),
);

const makeSelectIsTaskDialogOpen = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('isTaskDialogOpen'),
);

const makeSelectActivityIdLoadedIntoTaskDialog = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => {
    const value = substate.get('activityIdLoadedIntoTaskDialog');
    if (value) {
      return parseInt(value.split('-')[0], 10);
    }
    return null;
  },
);

const makeSelectFormActivities = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('formActivities'),
);

const makeSelectFormActivitiesAsOverlaySelectOptions = () => createSelector(
  makeSelectFormActivities(),
  (activities) => activities.map((activity) => ({
    label: activity.get('name'),
    value: activity.get('activityId'),
    options: activity.get('tasks').map((task) => ({
      label: task.get('name'),
      value: task.get('taskId'),
    })),
  })),
);

const makeTimeRecordDayMapSelector = createSelector(
  makeTimeRecordsSelector,
  (timeRecords) => timeRecords.reduce((accumulator, timeRecord) => {
    const dateDayFormat = format(timeRecord.get('reportedDay'), DATE_DAY_FORMAT);
    return accumulator.set(
      dateDayFormat,
      (accumulator.get(dateDayFormat) || List()).push(timeRecord)
    );
  }, Map()),
);

const makeSelectIsLoadingTimeRecords = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('isLoadingTimeRecords'),
);

const makeSelectNewTaskFormSelectedProjectSelector = () => createSelector(
  [makeSelectFormProjects(), makeNewTaskFormSelectedProjectIdSelector],
  (formProjects, selectedProjectId) => formProjects.find(
    (project) => project.get('projectId') === selectedProjectId
  ),
);

const makeSelectNewTaskFormSelectedActivity = () => createSelector(
  [makeSelectFormActivities(), makeSelectActivityIdLoadedIntoTaskDialog()],
  (formActivities, selectedActivityId) => formActivities.find(
    (activity) => activity.get('activityId') === selectedActivityId
  ),
);

const makeSelectCachedSelectedDate = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('cachedSelectedDate'),
);

export {
  selectTimesheetPageDomain,
  makeSelectSelectedDate,
  makeSelectSelectedRange,
  makeTimeRecordsSelector,
  makeTimeRecordDayMapSelector,
  makeIsTaskOverlaySelectOpened,
  makeSelectIsLoadingTimeRecords,
  makeSelectFormProjects,
  makeSelectFormActivities,
  makeSelectFormActivitiesAsOverlaySelectOptions,
  makeSelectIsTaskDialogOpen,
  makeSelectActivityIdLoadedIntoTaskDialog,
  makeNewTaskFormSelectedProjectIdSelector,
  makeSelectNewTaskFormSelectedProjectSelector,
  makeSelectNewTaskFormSelectedActivity,
  makeSelectCachedSelectedDate,
  makeSelectSelectedTimeRecordIdForEdition,
  makeSelectSelectedTimeRecordForEdition,
};
