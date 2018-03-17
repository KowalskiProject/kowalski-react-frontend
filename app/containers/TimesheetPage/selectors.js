import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import format from 'date-fns/format';
import { formValueSelector } from 'redux-form/immutable';
import { DATE_DAY_FORMAT, LOG_HOUR_FORM } from './constants';

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
    return parseInt(value);
  }
  return value;
}

const makeSelectSelectedDate = createSelector(
  [selectTimesheetPageDomain],
  (substate) => substate.get('selectedDate'),
);

const makeSelectSelectedRange = createSelector(
  [makeSelectSelectedDate],
  (selectedDate) => {
    const extractedStartOfWeek = startOfWeek(selectedDate);
    const extractedEndOfWeek = endOfWeek(selectedDate);
    return [extractedStartOfWeek, extractedEndOfWeek];
  }
);

const makeSelectIsSubmitting = createSelector(
  [selectTimesheetPageDomain],
  (substate) => substate.get('isSubmitting'),
);

const makeTimeSlotEntriesSelector = createSelector(
  [selectTimesheetPageDomain],
  (substate) => substate.get('timeSlotEntries') || List(),
);

const makeIsTaskOverlaySelectOpened = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => {
    return substate.get('isTaskOverlaySelectOpened');
  },
);

const makeSelectFormProjects = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => {
    return substate.get('formProjects')
  },
);

const makeSelectIsTaskDialogOpen = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => substate.get('isTaskDialogOpen'),
);

const makeSelectActivityIdLoadedIntoTaskDialog = () => createSelector(
  selectTimesheetPageDomain,
  (substate) => {
    let value = substate.get('activityIdLoadedIntoTaskDialog');
    if (value) {
      return parseInt(value.split('-')[0]);
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

const makeTimeSlotDayMapSelector = createSelector(
  makeTimeSlotEntriesSelector,
  (timeSlotEntries) => {
    const result = timeSlotEntries.reduce((accumulator, timeSlotEntry) => {
      const dateDayFormat = format(timeSlotEntry.get('day'), DATE_DAY_FORMAT);
      return accumulator.set(
        dateDayFormat,
        (accumulator.get(dateDayFormat) || List()).push(timeSlotEntry)
      );
    }, Map());
    return result;
  },
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
  (formActivities, selectedActivityId) => {
    return formActivities.find(
      (activity) => activity.get('activityId') === selectedActivityId
    );
  },
);

export {
  selectTimesheetPageDomain,
  makeSelectSelectedDate,
  makeSelectSelectedRange,
  makeSelectIsSubmitting,
  makeTimeSlotEntriesSelector,
  makeTimeSlotDayMapSelector,
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
};
