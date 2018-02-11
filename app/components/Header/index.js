import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import messages from './messages';

const AppNameWrapper = styled.span`
  font-size: 1.5rem;
`;

const NavBarMenuWrapper = styled.span`
  margin-left: 2rem;
`;

const NavMenu = styled.a`
  color: inherit;
`

function Header({ intl, children, onTimesheetClicked, onProjectsClicked }) {
  return (
    <div className="kowalski-react-basic-container-vertical">
      <NavBar aria-label="main navigation" className="navbar">
        <div className="navbar-start">
          <AppNameWrapper className="navbar-item">
            { intl.formatMessage(messages.appTitle) }
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
            <FormattedMessage {...messages.usernamePlaceholder} />
          </NavBarMenuWrapper>
        </div>
      </NavBar>
      { children }
    </div>
  );
}

Header.propTypes = {
  intl: intlShape.isRequired,
  children: PropTypes.object,
  onTimesheetClicked: PropTypes.func.isRequired,
  onProjectsClicked: PropTypes.func.isRequired,
};

export default injectIntl(Header);
