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
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import LogHourForm from './LogHourForm';
import { DATE_DAY_FORMAT } from './constants';
import { unauthorizedAccessDetected } from '../App/actions';

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

const renderDays = ([rangeStart, rangeEnd], history, timeSlotDayMap) => {
  const dayColumns = [];
  let currentDate = rangeStart;

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
    if (!localStorage.getItem('authToken')) {
      this.props.unauthorizedAccessDetected();
    }
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

          <Switch>
            <Route
              path={`${this.props.match.url}log`}
              render={(myProps) => (
                <LogHourForm
                  {...myProps}
                  onSubmit={this.props.submitLogForm}
                  isSubmitting={this.props.isSubmitting}
                  isTaskOverlaySelectOpened={this.props.isTaskOverlaySelectOpened}
                  onDismissTaskOverlaySelect={this.props.closeTaskOverlaySelect}
                  onSelectTaskClicked={this.props.openTaskOverlaySelect}
                />
              )}
            />
            <DayColumnsWrapper className="column">
              <AboveDaysArea>
              </AboveDaysArea>
              <DaysArea>
                { renderDays(this.props.selectedRange, this.props.history, this.props.timeSlotDayMap) }
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
  unauthorizedAccessDetected: PropTypes.func,
  isTaskOverlaySelectOpened: PropTypes.bool,
  closeTaskOverlaySelect: PropTypes.func.isRequired,
  openTaskOverlaySelect: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedDate: makeSelectSelectedDate,
  selectedRange: makeSelectSelectedRange,
  isSubmitting: makeSelectIsSubmitting,
  timeSlotDayMap: makeTimeSlotDayMapSelector,
  isTaskOverlaySelectOpened: makeIsTaskOverlaySelectOpened(),
});

const withConnect = connect(mapStateToProps, { ...actions, unauthorizedAccessDetected });

const withReducer = injectReducer({ key: 'timesheetpage', reducer });
const withSaga = injectSaga({ key: 'timesheetpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TimesheetPage);
