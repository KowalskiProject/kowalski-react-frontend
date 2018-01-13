/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function AuthPage() {
  return (
    <div>
      <Helmet>
        <title>AuthPage</title>
        <meta name="description" content="Description of AuthPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AuthPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authpage: makeSelectAuthPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'authpage', reducer });
const withSaga = injectSaga({ key: 'authpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPage);
