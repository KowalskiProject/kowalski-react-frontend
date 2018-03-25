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

import { createStructuredSelector } from 'reselect';
import { List } from 'immutable';
import { compose } from 'redux';
import { RingLoader } from 'react-spinners';  // eslint-disable-line import/no-unresolved
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Modal from 'components/Modal/Loadable';
import { FormattedMessage, injectIntl } from 'react-intl';
import NewProjectForm from './NewProjectForm';
import {
  makeSelectProjects,
  makeSelectIsNewProjectFormOpen,
  makeSelectIsSubmittingNewProject,
  makeSelectIsLoadingProjects,
  makeSelectLoadingProjectsErrorMsg,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import { userCanAccess } from '../../support/auth/utils';
import { ADD } from '../../support/auth/resources';
import messages from './messages';

const MainContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const renderProjects = (projects, onSelectProject) => (
  (projects || []).map((project, index) => (
    <a
      tabIndex={index}
      className="tile is-child projectBox"
      role="button"
      key={project.get('projectId')}
      style={{ display: 'block' }}
      onClick={() => { onSelectProject(project.get('projectId')); }}
    >
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
  display: block;
  font-weight:300px;
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

class ProjectsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.startProjectLoading();
  }

  renderProjectsPanel() {
    const {
      projects,
      projectSelected,
      isLoadingProjects,
      loadingProjectsErrorMsg,
    } = this.props;

    if (isLoadingProjects) {
      return <RingLoader />;
    } else if (loadingProjectsErrorMsg) {
      return (
        <article className="message is-danger">
          <div className="message-body">
            { loadingProjectsErrorMsg }
          </div>
        </article>
      );
    }

    return (
      <div className="tile is-parent is-vertical">
        {renderProjects(projects, projectSelected)}
      </div>
    );
  }

  render() {
    const {
      openNewProjectForm,
      closeNewProjectForm,
      isNewProjectFormOpen,
      intl: { formatMessage },
    } = this.props;

    return (
      <MainContainerWrapper className="kowalski-react-basic-container">
        <Helmet>
          <title>Projetos</title>
          <meta name="description" content="Description of ProjectsPage" />
        </Helmet>
        <TitleBar>
          <PageTitle>
            <FormattedMessage {... messages.title} />
          </PageTitle>
          {
            userCanAccess(ADD.PROJECT) &&
              <AddProjectButton className="button" onClick={openNewProjectForm}>
                {formatMessage(messages.buttonAddProject)}
              </AddProjectButton>
          }
        </TitleBar>
        <ProjectListWrapper>
          { this.renderProjectsPanel() }
        </ProjectListWrapper>
        <Modal active={isNewProjectFormOpen} onDismiss={closeNewProjectForm}>
          <NewProjectForm
            onAdd={this.props.submitNewProjectFormAndCloseIt}
            onSaveAndAddNew={this.props.submitNewProjectForm}
            isSubmitting={this.props.isSubmittingNewProject}
            onCancel={closeNewProjectForm}
          />
        </Modal>
      </MainContainerWrapper>
    );
  }
}

ProjectsPage.propTypes = {
  projects: PropTypes.instanceOf(List),
  openNewProjectForm: PropTypes.func,
  isNewProjectFormOpen: PropTypes.bool,
  closeNewProjectForm: PropTypes.func,
  submitNewProjectForm: PropTypes.func,
  isSubmittingNewProject: PropTypes.bool,
  submitNewProjectFormAndCloseIt: PropTypes.func,
  startProjectLoading: PropTypes.func,
  projectSelected: PropTypes.func,
  isLoadingProjects: PropTypes.bool,
  loadingProjectsErrorMsg: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  isNewProjectFormOpen: makeSelectIsNewProjectFormOpen(),
  isSubmittingNewProject: makeSelectIsSubmittingNewProject(),
  isLoadingProjects: makeSelectIsLoadingProjects(),
  loadingProjectsErrorMsg: makeSelectLoadingProjectsErrorMsg(),
});

const withConnect = connect(mapStateToProps, actions);

const withReducer = injectReducer({ key: 'projectspage', reducer });
const withSaga = injectSaga({ key: 'projectspage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(ProjectsPage));
