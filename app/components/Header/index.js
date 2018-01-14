import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import NavBar from './NavBar';
import messages from './messages';

const AppNameWrapper = styled.span`
  font-size: 1.5rem;
`;

const NavBarMenuWrapper = styled.span`
  margin-left: 2rem;
`;

function Header({ intl, children }) {
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
            <FormattedMessage {...messages.timesheet} />
          </span>
          <span className="navbar-item">
            <FormattedMessage {...messages.projects} />
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
};

export default injectIntl(Header);
