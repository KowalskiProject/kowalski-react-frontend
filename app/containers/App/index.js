/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TimesheetPage from 'containers/TimesheetPage/Loadable';
import ProjectsPage from 'containers/ProjectsPage/Loadable';
import ProjectPage from 'containers/ProjectPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PeoplePage from 'containers/PeoplePage/Loadable';
import AuthPage from 'containers/AuthPage/Loadable';
import Header from 'components/Header';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import * as actions from './actions';
import requireAuth from '../../hoc/requireAuth';
import requireUnAuth from '../../hoc/requireUnAuth';
import { makeSelectActivePage } from './selectors';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

function App(props) {
  const { navigateTo, logout } = props;

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route path="/auth" component={requireUnAuth(AuthPage)} />
        <Header
          activePage={props.activePage}
          onTimesheetClicked={() => navigateTo('/')}
          onProjectsClicked={() => navigateTo('/projects')}
          onPeopleClicked={() => navigateTo('/people')}
          onLogoutClicked={() => logout()}
        >
          <Switch>
            <Route path="/projects/:code" component={requireAuth(ProjectPage)} />
            <Route path="/projects" component={requireAuth(ProjectsPage)} />
            <Route path="/people" component={requireAuth(PeoplePage)} />
            <Route exact path="" component={requireAuth(TimesheetPage)} />
            <Route path="/features" component={requireAuth(FeaturePage)} />
            <Route path="" component={requireAuth(NotFoundPage)} />
          </Switch>
        </Header>
      </Switch>
    </AppWrapper>
  );
}

App.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
};

const withSaga = injectSaga({ key: 'global', saga });
const withConnect = connect(createStructuredSelector({
  activePage: makeSelectActivePage(),
}), actions);

export default withRouter(compose(
  withConnect,
  withSaga,
)(App));
