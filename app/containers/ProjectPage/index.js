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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { List } from 'immutable';
import {
  makeSelectProjectCodes,
  makeSelectSelectedProject,
  makeSelectSelectedProjectCode,
  makeSelectSelectedTab,
  makeSelectLoadingProjectCodesError,
  makeSelectLoadingProjectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import ActivitiesTab from './ActivitiesTab';
import GeneralTab from './GeneralTab';

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
  border-bottom: 0.5px solid #dbdbdb;
  ${(props) => props.selected ? 'background-color: #ccc;' : ''}

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
    this.props.updateSelectedProjectCode(this.selectedProjectCode());
  }

  componentDidUpdate() {
    if (this.selectedProjectCode() !== this.props.selectedProjectCode) {
      this.props.updateSelectedProjectCode(this.selectedProjectCode());
    }
  }

  selectedProjectCode() {
    return this.props.match.params.code;
  }

  renderProjectMenuItems() {
    const {
      projectCodes,
      otherProjectClicked,
      selectedProjectCode,
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

    return (projectCodes).map((code) => (
      <ProjectCodeWrapper
        selected={code === selectedProjectCode}
        key={code}
        onClick={() => otherProjectClicked(code)}
      >
        { code }
      </ProjectCodeWrapper>
    ));
  }

  renderProjectPane() {
    const { loadingProjectError, selectedTab, selectedTabChanged, selectedProject } = this.props;

    if (loadingProjectError) {
      return (
        <ProjectPaneWrapper>
          <div className="control" style={{ marginTop: '1rem' }}>
            <article className="message is-danger">
              <div className="message-body">
                { loadingProjectError }
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
              <a role="button" tabIndex={0} onClick={() => selectedTabChanged(0)}>General</a>
            </li>
            <li className={selectedTab === 1 ? 'is-active' : ''}>
              <a role="button" tabIndex={0} onClick={() => selectedTabChanged(1)}>Activities</a>
            </li>
          </ul>
        </TabsWrapper>
        <TabContentWrapper>
          {selectedTab === 0 && <GeneralTab project={selectedProject} />}
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
  updateSelectedProjectCode: PropTypes.func,
  loadProjectCodes: PropTypes.func,
  selectedTab: PropTypes.number,
  selectedTabChanged: PropTypes.func,
  otherProjectClicked: PropTypes.func,
  loadingProjectCodesError: PropTypes.string,
  loadingProjectError: PropTypes.string,
  selectedProjectCode: PropTypes.func,
  selectedProject: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  projectCodes: makeSelectProjectCodes(),
  selectedProjectCode: makeSelectSelectedProjectCode(),
  selectedProject: makeSelectSelectedProject(),
  selectedTab: makeSelectSelectedTab(),
  loadingProjectCodesError: makeSelectLoadingProjectCodesError(),
  loadingProjectError: makeSelectLoadingProjectError(),
});

const withConnect = connect(mapStateToProps, actions);

const withReducer = injectReducer({ key: 'projectpage', reducer });
const withSaga = injectSaga({ key: 'projectpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectPage);
