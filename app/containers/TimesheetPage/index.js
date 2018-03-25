/**
 * TimesheetPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import isSameWeek from 'date-fns/is_same_week';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Modal from 'components/Modal/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Switch, Route } from 'react-router-dom';
import AppCalendar from 'components/AppCalendar';
import DayColumn from 'components/DayColumn/Loadable';
import * as actions from './actions';
import {
  makeSelectSelectedDate,
  makeSelectSelectedRange,
  makeTimeRecordDayMapSelector,
  makeIsTaskOverlaySelectOpened,
  makeSelectIsLoadingTimeRecords,
  makeSelectFormProjects,
  makeSelectFormActivitiesAsOverlaySelectOptions,
  makeSelectIsTaskDialogOpen,
  makeSelectNewTaskFormSelectedProjectSelector,
  makeSelectNewTaskFormSelectedActivity,
  makeSelectCachedSelectedDate,
  makeSelectSelectedTimeRecordForEdition,
  makeSelectDeleteTimeRecordConfirmDialogOpened,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import LogHourForm from './LogHourForm';
import { DATE_DAY_FORMAT, NEXT_MONTH, PREVIOUS_MONTH } from './constants';
import { unauthorizedAccessDetected, navigateTo } from '../App/actions';
import LoadingCentralDiv from '../../components/LoadingCentralDiv';
import NewTaskForm from '../ProjectPage/NewTaskForm';

const MainContainerWrapper = styled.div`
  display: flex;
`;

const ColumnsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
`;

const CalendarColumn = styled.div`
  border-right: solid 1px #ccc;
  width: 333px;
  flex-grow: 0 !important;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TimeSheetLabelWrapper = styled.div`
  padding: 10px;
`;

const TimeSheetLabelInsideWrapper = styled.div`
  font-size: 1.3rem;
`;

const DayColumnsWrapper = styled.div`
  display: flex !important;
  flex-grow: 1 !important;
  flex-direction: column !important;
  padding-left:0px !important;
  border-left:none;
`;

const AboveDaysArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 15px;
  flex-grow: 0;
`;

const DaysArea = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;

function renderDays(
  [rangeStart, rangeEnd],
  timeRecordDayMap,
  isLoadingTimeRecords,
  onFreeSlotSelect,
  onSelectTimeRecordForEdition,
) {
  const dayColumns = [];
  let currentDate = rangeStart;

  if (isLoadingTimeRecords) {
    return <LoadingCentralDiv />;
  }

  const goToHourForm = (date) => () => onFreeSlotSelect(date);

  while (isBefore(currentDate, rangeEnd)) {
    const formattedDate = format(currentDate, DATE_DAY_FORMAT);
    dayColumns.push(<DayColumn
      key={formattedDate}
      day={currentDate}
      onFreeSlotClick={goToHourForm(currentDate)}
      onSlotClicked={onSelectTimeRecordForEdition}
      timeRecords={timeRecordDayMap.get(formattedDate) || List()}
    />);
    currentDate = addDays(currentDate, 1);
  }
  return dayColumns;
}

class TimesheetPage extends React.Component {
  constructor(props) {
    super(props);
    this.forwardOneMonth = this.forwardOneMonth.bind(this);
    this.backwardOneMonth = this.backwardOneMonth.bind(this);
    this.selectNewDate = this.selectNewDate.bind(this);
    this.dismissLogHourForm = this.dismissLogHourForm.bind(this);
    this.selectFreeTimeSlot = this.selectFreeTimeSlot.bind(this);
    this.selectTimeRecordForEdition = this.selectTimeRecordForEdition.bind(this);
  }

  componentWillMount() {
    if (!isSameWeek(this.props.selectedDate, this.props.cachedSelectedDate)) {
      this.props.loadTimeRecordsForWeekDate(this.props.selectedDate);
      this.props.updateCachedSelectDate(this.props.selectedDate);
    }
  }

  forwardOneMonth() {
    this.props.updateSelectedDate({
      currentDate: this.props.selectedDate,
      operation: NEXT_MONTH,
    });
  }

  selectNewDate(newDate) {
    this.props.updateSelectedDate({
      currentDate: this.props.selectedDate,
      newDate,
    });
  }

  backwardOneMonth() {
    this.props.updateSelectedDate({
      currentDate: this.props.selectedDate,
      operation: PREVIOUS_MONTH,
    });
  }

  dismissLogHourForm() {
    this.props.navigateTo(`/?date=${format(this.props.selectedDate)}`);
  }

  selectTimeRecordForEdition(trId, date) {
    this.props.navigateTo(`/log?date=${format(date)}&trId=${trId}`);
  }

  selectFreeTimeSlot(date) {
    this.props.updateSelectedDate({
      currentDate: this.props.selectedDate,
      newDate: date,
    });
    this.props.navigateTo(`/log?date=${format(date)}`);
  }

  renderNewTaskModal() {
    return (
      <Modal active={this.props.isTaskDialogOpen} onDismiss={this.props.dismissNewTaskDialog}>
        {
          this.props.isTaskDialogOpen &&
            <NewTaskForm
              project={this.props.newTaskFormSelectedProject}
              activity={this.props.newTaskFormSelectedActivity}
              predefinedAccountableId={parseInt(localStorage.getItem('currentUserId'), 10)}
              onAdd={this.props.submitNewTaskFormAndCloseIt}
              onAddText={this.props.intl.formatMessage(messages.newTaskButtonAdd)}
              onCancel={this.props.dismissNewTaskDialog}
            />
        }
      </Modal>
    );
  }

  render() {
    return (
      <MainContainerWrapper className="kowalski-react-basic-container">
        <Helmet>
          <title>TimesheetPage</title>
          <meta name="description" content="Description of TimesheetPage" />
        </Helmet>
        { this.renderNewTaskModal() }
        <Switch>
          <Route
            path={`${this.props.match.url}log`}
            render={(myProps) => (
              <LogHourForm
                {...myProps}
                date={this.props.selectedDate}
                loadFormProjects={this.props.loadFormProjects}
                onSubmit={this.props.submitLogForm}
                isTaskOverlaySelectOpened={this.props.isTaskOverlaySelectOpened}
                onDismissTaskOverlaySelect={this.props.closeTaskOverlaySelect}
                onSelectTaskClicked={this.props.openTaskOverlaySelect}
                formProjects={this.props.formProjects}
                taskOverlaySelectOptions={this.props.formActivitiesAsOverlaySelectOptions}
                loadFormActivities={this.props.loadFormActivities}
                onNewTaskSelected={this.props.launchNewTaskDialog}
                onDismissForm={this.dismissLogHourForm}
                initialValues={this.props.timeRecordOnEdition}
                onDeleteRecord={this.props.deleteTimeRecord}
                isDeleteConfirmationDialogOpened={this.props.deleteTimeRecordConfirmDialogOpened}
                deleteConfirmationDialogCallback={this.props.changeTimeRecordDeleteConfirmDialogOpeness}
              />
            )}
          />
          <ColumnsWrapper className="columns">
            {/* Calendar */}
            <CalendarColumn className="column">
              <TimeSheetLabelWrapper>
                <TimeSheetLabelInsideWrapper>
                  <FormattedMessage {... messages.timesheetLabel} />
                </TimeSheetLabelInsideWrapper>
                <span>
                  <FormattedDate value={this.props.selectedRange[0]} /> -
                  <FormattedDate value={this.props.selectedRange[1]} />
                </span>
              </TimeSheetLabelWrapper>
              <AppCalendar
                selectedDate={this.props.selectedDate}
                onNextMonthClicked={this.forwardOneMonth}
                onPreviousMonthClicked={this.backwardOneMonth}
                onDateClicked={this.selectNewDate}
                options={{ highlightedRanges: [this.props.selectedRange] }}
              />
              <TimeSheetLabelWrapper>
                <TimeSheetLabelInsideWrapper>
                  <FormattedMessage {... messages.notifications} />
                </TimeSheetLabelInsideWrapper>
              </TimeSheetLabelWrapper>
            </CalendarColumn>
            <DayColumnsWrapper className="column">
              <AboveDaysArea>
              </AboveDaysArea>
              <DaysArea>
                {
                  renderDays(
                    this.props.selectedRange,
                    this.props.timeRecordDayMap,
                    this.props.isLoadingTimeRecords,
                    this.selectFreeTimeSlot,
                    this.selectTimeRecordForEdition,
                  )
                }
              </DaysArea>
            </DayColumnsWrapper>
          </ColumnsWrapper>
        </Switch>
      </MainContainerWrapper>
    );
  }
}

TimesheetPage.propTypes = {
  selectedDate: PropTypes.objectOf(Date).isRequired,
  cachedSelectedDate: PropTypes.objectOf(Date),
  selectedRange: PropTypes.arrayOf(Date).isRequired,
  match: PropTypes.object,
  submitLogForm: PropTypes.func,
  timeRecordDayMap: PropTypes.object,
  isTaskOverlaySelectOpened: PropTypes.bool,
  closeTaskOverlaySelect: PropTypes.func.isRequired,
  openTaskOverlaySelect: PropTypes.func.isRequired,
  updateCachedSelectDate: PropTypes.func.isRequired,
  loadTimeRecordsForWeekDate: PropTypes.func.isRequired,
  isLoadingTimeRecords: PropTypes.bool.isRequired,
  loadFormProjects: PropTypes.func.isRequired,
  formProjects: PropTypes.object.isRequired,
  formActivitiesAsOverlaySelectOptions: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    options: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })),
  })),
  loadFormActivities: PropTypes.func.isRequired,
  launchNewTaskDialog: PropTypes.func.isRequired,
  dismissNewTaskDialog: PropTypes.func.isRequired,
  isTaskDialogOpen: PropTypes.bool.isRequired,
  newTaskFormSelectedActivity: PropTypes.object,
  newTaskFormSelectedProject: PropTypes.object,
  submitNewTaskFormAndCloseIt: PropTypes.func.isRequired,
  updateSelectedDate: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  timeRecordOnEdition: PropTypes.object,
  deleteTimeRecord: PropTypes.func.isRequired,
  deleteTimeRecordConfirmDialogOpened: PropTypes.bool.isRequired,
  changeTimeRecordDeleteConfirmDialogOpeness: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedDate: makeSelectSelectedDate,
  cachedSelectedDate: makeSelectCachedSelectedDate(),
  selectedRange: makeSelectSelectedRange,
  timeRecordDayMap: makeTimeRecordDayMapSelector,
  isTaskOverlaySelectOpened: makeIsTaskOverlaySelectOpened(),
  isLoadingTimeRecords: makeSelectIsLoadingTimeRecords(),
  formProjects: makeSelectFormProjects(),
  formActivitiesAsOverlaySelectOptions: makeSelectFormActivitiesAsOverlaySelectOptions(),
  isTaskDialogOpen: makeSelectIsTaskDialogOpen(),
  newTaskFormSelectedActivity: makeSelectNewTaskFormSelectedActivity(),
  newTaskFormSelectedProject: makeSelectNewTaskFormSelectedProjectSelector(),
  timeRecordOnEdition: makeSelectSelectedTimeRecordForEdition(),
  deleteTimeRecordConfirmDialogOpened: makeSelectDeleteTimeRecordConfirmDialogOpened(),
});

const withConnect = connect(mapStateToProps, { ...actions, unauthorizedAccessDetected, navigateTo });

const withReducer = injectReducer({ key: 'timesheetpage', reducer });
const withSaga = injectSaga({ key: 'timesheetpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(TimesheetPage));
