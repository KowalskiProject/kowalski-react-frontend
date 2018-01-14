/**
 *
 * AuthPage
 *
 */

import React from 'react';
// import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

// import injectSaga from 'utils/injectSaga';
// import injectReducer from 'utils/injectReducer';
// import makeSelectAuthPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from './messages';

const ButtonWrapper = styled.button`
  width: 100%
`;

function AuthPage({ intl }) {
  return (
    <form>
      <div className="field">
        <div className="control">
          <input type="text" className="input" placeholder={intl.formatMessage(messages.username)} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input type="password" className="input" />
        </div>
      </div>
      <div className="control">
        <ButtonWrapper type="submit" className="button is-primary">
          <FormattedMessage {... messages.loginButton} />
        </ButtonWrapper>
      </div>
    </form>
  );
}

AuthPage.propTypes = {
  intl: intlShape.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   authpage: makeSelectAuthPage(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'authpage', reducer });
// const withSaga = injectSaga({ key: 'authpage', saga });

export default compose(
  // withReducer,
  // withSaga,
  // withConnect,
)(injectIntl(AuthPage));
