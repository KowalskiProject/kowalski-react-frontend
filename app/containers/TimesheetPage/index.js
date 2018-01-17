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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AppCalendar from 'components/AppCalendar';
import * as actions from './actions';
import { makeSelectSelectedDate, makeSelectSelectedRange } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const CalendarColumn = styled.div`
  border-right: solid 1px #ccc;
  min-width: 333px;
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

function TimesheetPage(props) {
  return (
    <div className="kowalski-react-basic-container">
      <Helmet>
        <title>TimesheetPage</title>
        <meta name="description" content="Description of TimesheetPage" />
      </Helmet>
      <div className="columns">
        {/* Calendar */}
        <CalendarColumn className="column ">
          <TimeSheetLabelWrapper>
            <TimeSheetLabelInsideWrapper>
              <FormattedMessage {... messages.timesheetLabel} />
            </TimeSheetLabelInsideWrapper>
            <span>
              <FormattedDate value={props.selectedRange[0]} /> -
              <FormattedDate value={props.selectedRange[1]} />
            </span>
          </TimeSheetLabelWrapper>
          <AppCalendar
            selectedDate={props.selectedDate}
            onNextMonthClicked={() => props.onNextMonthClicked()}
            onPreviousMonthClicked={() => props.onPreviousMonthClicked()}
            onDateClicked={(day) => props.onDateChanged(day)}
            options={{ highlightedRanges: [props.selectedRange] }}
          />
          <TimeSheetLabelWrapper>
            <TimeSheetLabelInsideWrapper>
              <FormattedMessage {... messages.notifications} />
            </TimeSheetLabelInsideWrapper>
          </TimeSheetLabelWrapper>
        </CalendarColumn>

        {/* Day Columns */}
        <div className="column">
        </div>
      </div>
    </div>
  );
}

TimesheetPage.propTypes = {
  selectedDate: PropTypes.objectOf(Date).isRequired,
  selectedRange: PropTypes.arrayOf(Date).isRequired,
  onNextMonthClicked: PropTypes.func,
  onPreviousMonthClicked: PropTypes.func,
  onDateChanged: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedDate: makeSelectSelectedDate,
  selectedRange: makeSelectSelectedRange,
});

const withConnect = connect(mapStateToProps, { ...actions });

const withReducer = injectReducer({ key: 'timesheetpage', reducer });
const withSaga = injectSaga({ key: 'timesheetpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TimesheetPage);
