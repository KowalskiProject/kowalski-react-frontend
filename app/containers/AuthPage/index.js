/**
 *
 * AuthPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import SaturnoLogo from 'images/saturno-logo.svg';
import Calendar from 'images/calendar_illustration.png';

import LoginForm from 'containers/AuthPage/LoginForm';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
  padding-bottom:7%;
  font-size:25px;
  font-weight:200;
  color:white;
`;

const RightPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top:90px;
`;

const FormTitleWrapper = styled.div`
  display: flex;
  flex-basis: 30%;
  flex-grow: 1;
  margin-top: 10%;
  padding-bottom:5%;
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

const VersionContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
`;

export function AuthPage({ intl: { formatMessage } }) { // eslint-disable-line react/prefer-stateless-function
  return (
    <ColumnsWrapper className="columns">
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
        <meta name="description" content={formatMessage(messages.pageDescription)} />
      </Helmet>
      <div className="column has-text-centered auth-page-left-container">
        <H3Wrapper><FormattedMessage {...messages.friendlyIntroductoryMessage} /></H3Wrapper>
        <img src={Calendar} alt="Illustration of a calendar" />
        <VersionContainer>
          <FormattedMessage {...messages.version} />
        </VersionContainer>
      </div>
      <RightPanelWrapper className="column auth-page-right-container">
        <FormTitleWrapper>
          <span className="kowalski-primarily-colored"> <img src={SaturnoLogo} alt="Saturno - Logo" /></span>
        </FormTitleWrapper>
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
      </RightPanelWrapper>
    </ColumnsWrapper>
  );
}

const withReducer = injectReducer({ key: 'authpage', reducer });
const withSaga = injectSaga({ key: 'authpage', saga });

AuthPage.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default compose(
  withReducer,
  withSaga,
)(injectIntl(AuthPage));
