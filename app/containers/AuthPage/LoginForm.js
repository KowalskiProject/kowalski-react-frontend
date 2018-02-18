/**
 *
 * AuthPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectIsSubmitting,
  makeSelectServerErrorMsg,
} from './selectors';
import messages from './messages';
import * as actions from './actions';

const ButtonWrapper = styled.button`
  width: 100%;
  height:60px !important;
`;

function LoginForm({ intl, username, password, changedUsername, changedPassword, submitCredentials, isSubmitting, serverErrorMsg }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submitCredentials({ username, password });
  };

  console.log(serverErrorMsg);

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder={intl.formatMessage(messages.username)}
            value={username}
            onChange={(evt) => changedUsername(evt.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(evt) => changedPassword(evt.target.value)}
          />
        </div>
      </div>
      <div className="control">
        <ButtonWrapper type="submit" className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}>
          <FormattedMessage {... messages.loginButton} />
        </ButtonWrapper>
      </div>
      {
        serverErrorMsg &&
          <div className="control" style={{ marginTop: '1rem' }}>
            <article className="message is-danger">
              <div className="message-body">
                { serverErrorMsg }
              </div>
            </article>
          </div>
      }
    </form>
  );
}

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  changedUsername: PropTypes.func,
  changedPassword: PropTypes.func,
  submitCredentials: PropTypes.func,
  isSubmitting: PropTypes.bool,
  serverErrorMsg: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  isSubmitting: makeSelectIsSubmitting(),
  serverErrorMsg: makeSelectServerErrorMsg(),
});

const withConnect = connect(mapStateToProps, actions);

export default compose(
  withConnect,
)(injectIntl(LoginForm));
