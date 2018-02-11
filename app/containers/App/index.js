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
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TimesheetPage from 'containers/TimesheetPage/Loadable';
import ProjectsPage from 'containers/ProjectsPage/Loadable';
import ProjectPage from 'containers/ProjectPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthPage from 'containers/AuthPage/Loadable';
import Header from 'components/Header';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import * as actions from './actions';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

function App(props) {
  const { navigateTo } = props;

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Header onTimesheetClicked={() => navigateTo('/')} onProjectsClicked={() => navigateTo('/projects')}>
          <Switch>
            <Route path="/projects/:code" component={ProjectPage} />
            <Route path="/projects" component={ProjectsPage} />
            <Route exact path="" component={TimesheetPage} />
            <Route path="/features" component={FeaturePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Header>
      </Switch>
    </AppWrapper>
  );
}

const withSaga = injectSaga({ key: 'global', saga });
const withConnect = connect(null, actions);

export default withRouter(compose(
  withConnect,
  withSaga,
)(App));
