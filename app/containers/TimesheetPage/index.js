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
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AppCalendar from 'components/AppCalendar';
import makeSelectTimesheetPage from './selectors';
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

function TimesheetPage() {
  const currentDate = new Date();
  const extractedStartOfWeek = startOfWeek(currentDate);
  const extractedEndOfWeek = endOfWeek(currentDate);

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
              <FormattedDate value={extractedStartOfWeek} /> -
              <FormattedDate value={extractedEndOfWeek} />
            </span>
          </TimeSheetLabelWrapper>
          <AppCalendar selectedDate={currentDate} />
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  timesheetpage: makeSelectTimesheetPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'timesheetpage', reducer });
const withSaga = injectSaga({ key: 'timesheetpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TimesheetPage);
