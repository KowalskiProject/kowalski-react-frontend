import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <NavBar aria-label="main navigation" className="kowalski-back-panel">
        <a className="navbar-item">
          <FormattedMessage {...messages.home} />
        </a>
      </NavBar>
    );
  }
}

export default Header;
