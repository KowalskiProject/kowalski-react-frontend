/**
 *
 * TimesheetPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
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
  makeSelectIsSubmitting,
  makeTimeSlotDayMapSelector,
  makeIsTaskOverlaySelectOpened,
  makeSelectIsLoadingTimeRecords,
  makeSelectFormProjects,
  makeSelectFormActivitiesAsOverlaySelectOptions,
  makeSelectIsTaskDialogOpen,
  makeSelectNewTaskFormSelectedProjectSelector,
  makeSelectNewTaskFormSelectedActivity,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import LogHourForm from './LogHourForm';
import { DATE_DAY_FORMAT } from './constants';
import { unauthorizedAccessDetected } from '../App/actions';
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

const renderDays = ([rangeStart, rangeEnd], history, timeSlotDayMap, isLoadingTimeRecords) => {
  const dayColumns = [];
  let currentDate = rangeStart;

  if (isLoadingTimeRecords) {
    return <LoadingCentralDiv />;
  }

  const goToHourForm = (date) => () => {
    history.push({
      pathname: '/log',
      search: `?date=${format(date)}`,
    });
  };

  while (isBefore(currentDate, rangeEnd)) {
    const formattedDate = format(currentDate, DATE_DAY_FORMAT);
    dayColumns.push(<DayColumn
      key={formattedDate}
      day={currentDate}
      onFreeSlotClick={goToHourForm(currentDate)}
      timeSlots={timeSlotDayMap.get(formattedDate) || List()}
    />);
    currentDate = addDays(currentDate, 1);
  }
  return dayColumns;
};

class TimesheetPage extends React.Component {
  componentWillMount() {
    this.props.loadTimeRecordsForWeekDate(new Date());
  }

  renderNewTaskModal() {
    return (
      <Modal active={this.props.isTaskDialogOpen} onDismiss={this.props.dismissNewTaskDialog}>
        {
          this.props.isTaskDialogOpen &&
            <NewTaskForm
              project={this.props.newTaskFormSelectedProject}
              activity={this.props.newTaskFormSelectedActivity}
              predefinedAccountableId={parseInt(localStorage.getItem('currentUserId'))}
              onAdd={this.props.submitNewTaskFormAndCloseIt}
              onAddText="Create and Select"
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
              onNextMonthClicked={this.props.onNextMonthClicked}
              onPreviousMonthClicked={this.props.onPreviousMonthClicked}
              onDateClicked={this.props.onDateChanged}
              options={{ highlightedRanges: [this.props.selectedRange] }}
            />
            <TimeSheetLabelWrapper>
              <TimeSheetLabelInsideWrapper>
                <FormattedMessage {... messages.notifications} />
              </TimeSheetLabelInsideWrapper>
            </TimeSheetLabelWrapper>
          </CalendarColumn>

          { this.renderNewTaskModal() }

          <Switch>
            <Route
              path={`${this.props.match.url}log`}
              render={(myProps) => (
                <LogHourForm
                  {...myProps}
                  loadFormProjects={this.props.loadFormProjects}
                  onSubmit={this.props.submitLogForm}
                  isSubmitting={this.props.isSubmitting}
                  isTaskOverlaySelectOpened={this.props.isTaskOverlaySelectOpened}
                  onDismissTaskOverlaySelect={this.props.closeTaskOverlaySelect}
                  onSelectTaskClicked={this.props.openTaskOverlaySelect}
                  formProjects={this.props.formProjects}
                  taskOverlaySelectOptions={this.props.formActivitiesAsOverlaySelectOptions}
                  loadFormActivities={this.props.loadFormActivities}
                  onNewTaskSelected={this.props.launchNewTaskDialog}
                />
              )}
            />
            <DayColumnsWrapper className="column">
              <AboveDaysArea>
              </AboveDaysArea>
              <DaysArea>
                { renderDays(this.props.selectedRange, this.props.history, this.props.timeSlotDayMap, this.props.isLoadingTimeRecords) }
              </DaysArea>
            </DayColumnsWrapper>
          </Switch>
        </ColumnsWrapper>
      </MainContainerWrapper>
    );
  }
}

TimesheetPage.propTypes = {
  selectedDate: PropTypes.objectOf(Date).isRequired,
  selectedRange: PropTypes.arrayOf(Date).isRequired,
  onNextMonthClicked: PropTypes.func,
  onPreviousMonthClicked: PropTypes.func,
  onDateChanged: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.any,
  submitLogForm: PropTypes.func,
  isSubmitting: PropTypes.bool,
  timeSlotDayMap: PropTypes.object,
  isTaskOverlaySelectOpened: PropTypes.bool,
  closeTaskOverlaySelect: PropTypes.func.isRequired,
  openTaskOverlaySelect: PropTypes.func.isRequired,
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
  submitNewTaskForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedDate: makeSelectSelectedDate,
  selectedRange: makeSelectSelectedRange,
  isSubmitting: makeSelectIsSubmitting,
  timeSlotDayMap: makeTimeSlotDayMapSelector,
  isTaskOverlaySelectOpened: makeIsTaskOverlaySelectOpened(),
  isLoadingTimeRecords: makeSelectIsLoadingTimeRecords(),
  formProjects: makeSelectFormProjects(),
  formActivitiesAsOverlaySelectOptions: makeSelectFormActivitiesAsOverlaySelectOptions(),
  isTaskDialogOpen: makeSelectIsTaskDialogOpen(),
  newTaskFormSelectedActivity: makeSelectNewTaskFormSelectedActivity(),
  newTaskFormSelectedProject: makeSelectNewTaskFormSelectedProjectSelector(),
});

const withConnect = connect(mapStateToProps, { ...actions, unauthorizedAccessDetected });

const withReducer = injectReducer({ key: 'timesheetpage', reducer });
const withSaga = injectSaga({ key: 'timesheetpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TimesheetPage);
