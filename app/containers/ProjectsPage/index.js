/**
 *
 * ProjectsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { List } from 'immutable';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Modal from 'components/Modal/Loadable';
import makeSelectProjectsPage, {
  makeSelectProjects,
  makeSelectIsNewProjectFormOpen,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
// import messages from './messages';

const MainContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const renderProjects = (projects) => (
  (projects || []).map((project) => (
    // TODO trocar por
    <a className="tile is-child box" key={project.get('name')} style={{ display: 'block' }}>
      <p className="title">{project.get('name')}</p>
      <p>{project.get('description')}</p>
    </a>
  ))
);

const margins = `
  margin-top: 2rem;
  margin-left: 4rem;
  margin-right: 4rem;
`;

const TitleBar = styled.div`
  ${margins}
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  display: block
`;

const AddProjectButton = styled.button`
`;

const ProjectListWrapper = styled.div`
  ${margins}
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

function ProjectsPage(props) {
  const { projects, openNewProjectForm, closeNewProjectForm, isNewProjectFormOpen } = props;

  return (
    <MainContainerWrapper className="kowalski-react-basic-container">
      <Helmet>
        <title>Projetos</title>
        <meta name="description" content="Description of ProjectsPage" />
      </Helmet>
      <TitleBar>
        <PageTitle>Projects</PageTitle>
        <AddProjectButton className="button" onClick={openNewProjectForm}>Add project</AddProjectButton>
      </TitleBar>
      <ProjectListWrapper>
        <div className="tile is-parent is-vertical">
          { renderProjects(projects) }
        </div>
      </ProjectListWrapper>
      <Modal active={isNewProjectFormOpen} onDismiss={closeNewProjectForm}>
        <p>Eeste é meu form</p>
      </Modal>
    </MainContainerWrapper>
  );
}

ProjectsPage.propTypes = {
  projects: PropTypes.instanceOf(List),
  openNewProjectForm: PropTypes.func,
  isNewProjectFormOpen: PropTypes.bool,
  closeNewProjectForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  isNewProjectFormOpen: makeSelectIsNewProjectFormOpen(),
});

const withConnect = connect(mapStateToProps, actions);

const withReducer = injectReducer({ key: 'projectspage', reducer });
const withSaga = injectSaga({ key: 'projectspage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectsPage);
