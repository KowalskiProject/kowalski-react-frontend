/**
 *
 * ProjectPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import bind from 'memoize-bind';

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
  makeSelectInlineProjectFormFields,
  makeSelectUpdateProjectAttributesErrorMsg,
  makeSelectSelectedProjectPeople,
  makeSelectAccountableOptions,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import Meta from './Meta';
import ProjectPaneTabBar from './ProjectPaneTabBar';
import ProjectMenu from './ProjectMenu';
import ActivitiesTab from './ActivitiesTab';
import messages from './messages';
import InlineProjectForm from './InlineProjectForm';
import ProjectPeople from './ProjectPeople';
import Container from './Container';
import ProjectPaneWrapper from './ProjectPaneWrapper';
import TabContentWrapper from './TabContentWrapper';
import Wrapper from './Wrapper';
import ProjectSelectorWrapper from './ProjectSelectorWrapper';
import ProjectPaneLoadingError from './ProjectPaneLoadingError';
import { capitalize } from '../../support/string/utils';

export class ProjectPage extends Component {
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

  renderMeta() {
    const { formatMessage } = this.props.intl;
    const { selectedProject } = this.props;

    return (
      <Meta
        title={formatMessage(messages.title, { code: selectedProject.get('code') })}
        description={formatMessage(messages.description, { code: selectedProject.get('code') })}
      />
    );
  }

  renderGeneralTab() {
    if (this.props.selectedTab !== 0 || !this.props.selectedProject) {
      return [];
    }

    const { intl: { formatMessage }, updateProjectAttributesErrorMsg } = this.props;
    const errorMsg = updateProjectAttributesErrorMsg
      ? (
          `${formatMessage(messages.generalTabErrorUpdatingAttribute)} '` +
          `${formatMessage(messages[`generalTabErrorUpdating${capitalize(updateProjectAttributesErrorMsg)}`])}'`
        )
      : updateProjectAttributesErrorMsg;

    return (
      <Container>
        <InlineProjectForm
          fields={this.props.inlineProjectFormFields}
          labels={{
            accountable: formatMessage(messages.generalTabProjectAccountable),
            startDate: formatMessage(messages.generalTabProjectStartDate),
            endDate: formatMessage(messages.generalTabProjectEndDate),
            code: formatMessage(messages.generalTabProjectCode),
            description: formatMessage(messages.generalTabProjectDescription),
          }}
          errorMsg={errorMsg}
          updateField={bind(this.props.updateField, this, this.props.selectedProjectId)}
          tooltipText={formatMessage(messages.generalTabInlineProjectFormTooltip)}
          notSetMsg={formatMessage(messages.generalTabInlineProjectFormNotSetMsg)}
          accountableOptions={this.props.accountableOptions}
        />
        <ProjectPeople
          sectionTitle={formatMessage(messages.generalTabProjectPeople)}
          addPeopleBtnText={formatMessage(messages.generalTabAddPeopleFormButtonAdd)}
          onAddPeopleFormOpen={this.props.openAddPeopleForm}
          addPeopleFormOpened={this.props.isAddPeopleFormOpen}
          onAddPeopleFormDismiss={this.props.closeAddPeopleForm}
          onAddPeopleFormSubmit={this.props.submitAddPeopleFormAndCloseIt}
          availableUsers={this.props.usersNotInProject}
          people={this.props.selectedProjectPeople}
          projectId={this.props.selectedProjectId}
        />
      </Container>
    );
  }

  render() {
    return (
      <Container>
        { this.props.selectedProject && this.renderMeta() }
        <Wrapper>
          <ProjectSelectorWrapper>
            <ProjectMenu
              projectGroups={this.props.projectCodes}
              onProjectSelect={this.props.otherProjectClicked}
              selectedProjectId={this.props.selectedProjectId}
              projectCodesLoadingErrorMsg={this.props.loadingProjectCodesError}
            />
          </ProjectSelectorWrapper>
          <ProjectPaneWrapper>
            <ProjectPaneLoadingError loadingError={this.props.loadingProjectError || this.props.loadingUsersError} />
            <ProjectPaneTabBar
              selectedTab={this.props.selectedTab}
              onTabSelect={this.props.selectedTabChanged}
              generalTabTitle={this.props.intl.formatMessage(messages.generalTab)}
              activitiesTabTitle={this.props.intl.formatMessage(messages.activitiesTab)}
            />
            <TabContentWrapper>
              {this.props.selectedTab === 0 && this.renderGeneralTab() }
              {this.props.selectedTab === 1 && <ActivitiesTab project={this.props.selectedProject} />}
            </TabContentWrapper>
          </ProjectPaneWrapper>
        </Wrapper>
      </Container>
    );
  }
}

ProjectPage.propTypes = {
  projectCodes: PropTypes.objectOf(List).isRequired,
  match: PropTypes.object,
  selectedTab: PropTypes.number,
  selectedTabChanged: PropTypes.func,
  otherProjectClicked: PropTypes.func.isRequired,
  loadingProjectCodesError: PropTypes.string,
  loadingProjectError: PropTypes.string,
  loadingUsersError: PropTypes.string.isRequired,
  selectedProjectId: PropTypes.number,
  selectedProject: PropTypes.object,
  selectedProjectPeople: PropTypes.object.isRequired,
  isAddPeopleFormOpen: PropTypes.bool.isRequired,
  closeAddPeopleForm: PropTypes.func.isRequired,
  openAddPeopleForm: PropTypes.func.isRequired,
  submitAddPeopleFormAndCloseIt: PropTypes.func.isRequired,
  usersNotInProject: PropTypes.instanceOf(List).isRequired,
  intl: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  inlineProjectFormFields: PropTypes.object.isRequired,
  updateProjectAttributesErrorMsg: PropTypes.string.isRequired,
  loadProjectCodes: PropTypes.func.isRequired,
  updateSelectedProjectId: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  accountableOptions: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectCodes: makeSelectProjectCodes(),
  selectedProjectId: makeSelectSelectedProjectId(),
  selectedProject: makeSelectSelectedProject(),
  selectedProjectPeople: makeSelectSelectedProjectPeople(),
  selectedTab: makeSelectSelectedTab(),
  loadingProjectCodesError: makeSelectLoadingProjectCodesError(),
  loadingProjectError: makeSelectLoadingProjectError(),
  loadingUsersError: makeSelectLoadingUsersError(),
  isAddPeopleFormOpen: makeSelectIsAddPeopleFormOpen(),
  usersNotInProject: makeSelectUsersNotInProject(),
  inlineProjectFormFields: makeSelectInlineProjectFormFields(),
  updateProjectAttributesErrorMsg: makeSelectUpdateProjectAttributesErrorMsg(),
  accountableOptions: makeSelectAccountableOptions(),
});

const withConnect = connect(mapStateToProps, actions);

const withReducer = injectReducer({ key: 'projectpage', reducer });
const withSaga = injectSaga({ key: 'projectpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(ProjectPage));
