/**
 *
 * TimesheetPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTimesheetPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const CalendarColumn = styled.div`
  border-right: solid 1px #ccc;
  min-width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function TimesheetPage() {
  return (
    <div className="kowalski-react-basic-container">
      <Helmet>
        <title>TimesheetPage</title>
        <meta name="description" content="Description of TimesheetPage" />
      </Helmet>
      <div className="columns ">
        {/* Calendar */}
        <CalendarColumn className="column ">
          <br />
          <br />
          <br />
          <p>Finally at here</p>
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
