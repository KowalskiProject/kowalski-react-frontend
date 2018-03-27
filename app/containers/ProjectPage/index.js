/**
 *
 * ProjectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { List } from 'immutable';
import {
  makeSelectProjectCodes,
  makeSelectSelectedProject,
  makeSelectSelectedProjectId,
  makeSelectSelectedTab,
  makeSelectLoadingProjectCodesError,
  makeSelectLoadingProjectError,
  makeSelectIsAddPeopleFormOpen,
  makeSelectUsersNotInProject,
  makeSelectLoadingUsersError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import ActivitiesTab from './ActivitiesTab';
import GeneralTab from './GeneralTab';
import messages from './messages';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
`;

const ProjectSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 200px;
  flex-grow: 0;
  border-right: 0.5px solid #dbdbdb;
  align-items: stretch;
  background:#FBFAFF;
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ProjectCodeWrapper = styled.a`
  display: block;
  width: 200px;
  padding: 2rem;
  text-align: center;
  color:#414549;
  border-bottom: 0.5px solid #dbdbdb;
  ${(props) => props.selected ? 'background-color: #D2CCEB;' : ''}

  &:hover {
    ${(props) => props.selected ? '' : 'background-color: #eee;'}
  }
`;

const ProjectPaneWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin-top: 8px;
`;

const TabContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 2rem;
`;

class ProjectPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadProjectCodes();
    this.props.loadUsers();
    this.props.updateSelectedProjectId(this.selectedProjectId());
  }

  componentDidUpdate() {
    if (this.selectedProjectId() !== this.props.selectedProjectId) {
      this.props.updateSelectedProjectId(this.selectedProjectId());
    }
  }

  selectedProjectId() {
    return parseInt(this.props.match.params.code, 10);
  }

  renderProjectMenuItems() {
    const {
      projectCodes,
      otherProjectClicked,
      selectedProjectId,
      loadingProjectCodesError,
    } = this.props;

    if (loadingProjectCodesError) {
      return (
        <article className="message is-danger">
          <div className="message-body">
            { loadingProjectCodesError }
          </div>
        </article>
      );
    }

    return (projectCodes).map((group) => (
      <ProjectCodeWrapper
        selected={group.get('id') === selectedProjectId}
        key={group.get('id')}
        onClick={() => otherProjectClicked(group.get('id'))}
      >
        { group.get('code') }
      </ProjectCodeWrapper>
    ));
  }

  renderProjectPane() {
    const {
      loadingProjectError,
      loadingUsersError,
      selectedTab,
      selectedTabChanged,
      selectedProject,
      isAddPeopleFormOpen,
      closeAddPeopleForm,
      openAddPeopleForm,
      submitAddPeopleFormAndCloseIt,
      usersNotInProject,
      intl: { formatMessage },
    } = this.props;

    const generalTabProps = {
      project: selectedProject,
      isAddPeopleFormOpen,
      closeAddPeopleForm,
      openAddPeopleForm,
      submitAddPeopleFormAndCloseIt,
      usersNotInProject,
    };

    const loadingError = loadingProjectError || loadingUsersError;
    if (loadingError) {
      return (
        <ProjectPaneWrapper>
          <div className="control" style={{ marginTop: '1rem' }}>
            <article className="message is-danger">
              <div className="message-body">
                { loadingError }
              </div>
            </article>
          </div>
        </ProjectPaneWrapper>
      );
    }

    return (
      <ProjectPaneWrapper>
        <TabsWrapper className="tabs">
          <ul>
            <li className={selectedTab === 0 ? 'is-active' : ''}>
              <a role="button" tabIndex={0} onClick={() => selectedTabChanged(0)}>{formatMessage(messages.generalTab)}</a>
            </li>
            <li className={selectedTab === 1 ? 'is-active' : ''}>
              <a role="button" tabIndex={0} onClick={() => selectedTabChanged(1)}>{formatMessage(messages.activitiesTab)}</a>
            </li>
          </ul>
        </TabsWrapper>
        <TabContentWrapper>
          {selectedTab === 0 && <GeneralTab {...generalTabProps} />}
          {selectedTab === 1 && <ActivitiesTab project={selectedProject} />}
        </TabContentWrapper>
      </ProjectPaneWrapper>
    );
  }

  render() {
    return (
      <OuterWrapper>
        <Helmet>
          <title>ProjectPage</title>
          <meta name="description" content="Description of ProjectPage" />
        </Helmet>
        <Wrapper>
          <ProjectSelectorWrapper>
            { this.renderProjectMenuItems() }
          </ProjectSelectorWrapper>
          { this.renderProjectPane() }
        </Wrapper>
      </OuterWrapper>
    );
  }
}

ProjectPage.propTypes = {
  projectCodes: PropTypes.objectOf(List).isRequired,
  match: PropTypes.object,
  updateSelectedProjectId: PropTypes.func,
  loadProjectCodes: PropTypes.func,
  loadUsers: PropTypes.func.isRequired,
  selectedTab: PropTypes.number,
  selectedTabChanged: PropTypes.func,
  otherProjectClicked: PropTypes.func,
  loadingProjectCodesError: PropTypes.string,
  loadingProjectError: PropTypes.string,
  loadingUsersError: PropTypes.string.isRequired,
  selectedProjectId: PropTypes.number,
  selectedProject: PropTypes.object,
  isAddPeopleFormOpen: PropTypes.bool.isRequired,
  closeAddPeopleForm: PropTypes.func.isRequired,
  openAddPeopleForm: PropTypes.func.isRequired,
  submitAddPeopleFormAndCloseIt: PropTypes.func.isRequired,
  usersNotInProject: PropTypes.instanceOf(List).isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectCodes: makeSelectProjectCodes(),
  selectedProjectId: makeSelectSelectedProjectId(),
  selectedProject: makeSelectSelectedProject(),
  selectedTab: makeSelectSelectedTab(),
  loadingProjectCodesError: makeSelectLoadingProjectCodesError(),
  loadingProjectError: makeSelectLoadingProjectError(),
  loadingUsersError: makeSelectLoadingUsersError(),
  isAddPeopleFormOpen: makeSelectIsAddPeopleFormOpen(),
  usersNotInProject: makeSelectUsersNotInProject(),
});

const withConnect = connect(mapStateToProps, actions);

const withReducer = injectReducer({ key: 'projectpage', reducer });
const withSaga = injectSaga({ key: 'projectpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(ProjectPage));
