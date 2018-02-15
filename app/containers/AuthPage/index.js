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
import styled from 'styled-components';

import LoginForm from 'containers/AuthPage/LoginForm';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const ColumnsWrapper = styled.div`
  flex-grow: 1;
`;

const H3Wrapper = styled.h3`
  display: block;
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
  font-size:25px;
  font-weight:200;
`;

const RightPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ButtonsArea = styled.div`
  margin-top: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: row-reverse;
  flex-basis: 20%;
  flex-grow: 1;
`;

const FormTitleWrapper = styled.div`
  display: flex;
  flex-basis: 30%;
  flex-grow: 1;
  margin-top: 80px;
  margin-bottom: 20px;
  justify-content: center;
  font-size: 3rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-basis: 50%;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: 15%;
  margin-right: 15%;
`;

const ButtonText = styled.span`
  font-size: 0.9rem;
`;

function AuthPage() {
  return (
    <ColumnsWrapper className="columns">
      <Helmet>
        <title>AuthPage</title>
        <meta name="description" content="Description of AuthPage" />
      </Helmet>
      <div className="column auth-page-left-container">
        <H3Wrapper><FormattedMessage {...messages.friendlyIntroductoryMessage} /></H3Wrapper>

      </div>
      <RightPanelWrapper className="column">
        <ButtonsArea className="buttons has-addons">
          <button className="button is-medium" onClick={() => alert('Not Implemented yet')}>
            <ButtonText><FormattedMessage {...messages.signupButton} /></ButtonText>
          </button>
          <button className="button is-primary is-medium" onClick={() => alert('Not Implemented yet')}>
            <ButtonText><FormattedMessage {...messages.signinButton} /></ButtonText>
          </button>
        </ButtonsArea>
        <FormTitleWrapper>
          <span className="kowalski-primarily-colored"><FormattedMessage {...messages.appTitle} /></span>
        </FormTitleWrapper>
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
      </RightPanelWrapper>
    </ColumnsWrapper>
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
