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
import NewProjectForm from './NewProjectForm';
import {
  makeSelectProjects,
  makeSelectIsNewProjectFormOpen,
  makeSelectIsSubmittingNewProject,
  makeSelectProjectCodes,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
// import messages from './messages';

const MainContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const renderProjects = (projects, onSelectProject) => {
  return (projects || []).map((project, index) => {
    // TODO trocar por
    return (
      <a
        tabIndex={index}
        className="tile is-child projectBox"
        role="button"
        key={project.get('name')}
        style={{ display: 'block' }}
        onClick={() => { onSelectProject(project.get('code')); }}
      >
        <p className="title">{project.get('name')}</p>
        <p>{project.get('description')}</p>
      </a>
    );
  });
};

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
  display: block;
  font-weight:300px;
  margin-left:3%;
`;

const AddProjectButton = styled.button`
width:226px;
height:50px !important;
border-radius:2px;
border:1px solid #654EA3;
color: #654EA3;
`;

const ProjectListWrapper = styled.div`
  ${margins}
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  
`;

function ProjectsPage(props) {
  const {
    projects,
    projectSelected,
    openNewProjectForm,
    closeNewProjectForm,
    isNewProjectFormOpen,
  } = props;

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
          { renderProjects(projects, projectSelected) }
        </div>
      </ProjectListWrapper>
      <Modal active={isNewProjectFormOpen} onDismiss={closeNewProjectForm}>
        <NewProjectForm
          onAdd={props.submitNewProjectFormAndCloseIt}
          onSaveAndAddNew={props.submitNewProjectForm}
          isSubmitting={props.isSubmittingNewProject}
          onCancel={closeNewProjectForm}
        />
      </Modal>
    </MainContainerWrapper>
  );
}

ProjectsPage.propTypes = {
  projects: PropTypes.instanceOf(List),
  openNewProjectForm: PropTypes.func,
  isNewProjectFormOpen: PropTypes.bool,
  closeNewProjectForm: PropTypes.func,
  submitNewProjectForm: PropTypes.func,
  isSubmittingNewProject: PropTypes.bool,
  submitNewProjectFormAndCloseIt: PropTypes.func,
  projectSelected: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  isNewProjectFormOpen: makeSelectIsNewProjectFormOpen(),
  isSubmittingNewProject: makeSelectIsSubmittingNewProject(),
});

const withConnect = connect(mapStateToProps, actions);

const withReducer = injectReducer({ key: 'projectspage', reducer });
const withSaga = injectSaga({ key: 'projectspage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectsPage);
