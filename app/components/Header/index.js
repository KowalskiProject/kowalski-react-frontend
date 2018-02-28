import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SaturnoLogo from 'images/saturno-logo.svg';
import NavBar from './NavBar';
import messages from './messages';
const jwtDecode = require('jwt-decode');

const AppNameWrapper = styled.span`
  font-size: 1.5rem;
`;

const NavBarMenuWrapper = styled.span`
  margin-left: 2rem;
`;

const NavMenu = styled.a`
  color: inherit;
`;

function Header({ children, onTimesheetClicked, onProjectsClicked }) {
  const authToken = localStorage.getItem('authToken');
  let username = null;
  if (authToken) {
    const decodedJwt = jwtDecode(authToken);
    username = decodedJwt.sub;
  } else {
    username = 'Undefined';
  }

  return (
    <div className="kowalski-react-basic-container-vertical">
      <NavBar aria-label="main navigation" className="navbar">
        <div className="navbar-start">
          <AppNameWrapper className="navbar-item">
            <img src={SaturnoLogo} alt="react-boilerplate - Logo" />
          </AppNameWrapper>
        </div>
        <div className="navbar-end">
          <span className="navbar-item">
            <NavMenu onClick={onTimesheetClicked}><FormattedMessage {...messages.timesheet} /></NavMenu>
          </span>
          <span className="navbar-item">
            <NavMenu onClick={onProjectsClicked}><FormattedMessage {...messages.projects} /></NavMenu>
          </span>
          <span className="navbar-item">
            <FormattedMessage {...messages.people} />
          </span>
          <NavBarMenuWrapper className="navbar-item">
            { username }
          </NavBarMenuWrapper>
        </div>
      </NavBar>
      { children }
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.object,
  onTimesheetClicked: PropTypes.func.isRequired,
  onProjectsClicked: PropTypes.func.isRequired,
};

export default injectIntl(Header);
