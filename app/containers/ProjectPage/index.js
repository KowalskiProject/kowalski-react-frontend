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
import { List, Map } from 'immutable';
import {
  makeSelectProjectCodes,
  makeSelectSelectedProject,
  makeSelectSelectedProjectCode,
  makeSelectSelectedTab
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
`;

const ProjectSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 150px;
  border-right: 1px solid black;
  align-items: stretch;
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ProjectCodeWrapper = styled.a`
  display: block;
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid black;
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
  flex-grow: 1;
`;

class ProjectPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadProjectCodes();
  }

  componentDidUpdate() {
    const selectedProjectCode = this.props.match.params.code;
    if (selectedProjectCode !== this.props.selectedProjectCode) {
      this.props.updateSelectedProjectCode(selectedProjectCode);
    }
  }

  renderProjectMenuItems() {
    const { projectCodes, otherProjectClicked, selectedProjectCode } = this.props;
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

  renderGeneralTab() {
    return <div></div>;
  }

  renderActivitiesTab() {
    return <div></div>;
  }

  render() {
    const { selectedTab, selectedTabChanged } = this.props;

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
          <ProjectPaneWrapper>
            <TabsWrapper className="tabs">
              <ul>
                <li className={selectedTab === 0 ? 'is-active' : ''}>
                  <a onClick={() => selectedTabChanged(0)}>General</a>
                </li>
                <li className={selectedTab === 1 ? 'is-active' : ''}>
                  <a onClick={() => selectedTabChanged(1)}>Activities</a>
                </li>
              </ul>
            </TabsWrapper>
            <TabContentWrapper>
              {selectedTab === 0 && this.renderGeneralTab()}
              {selectedTab === 1 && this.renderActivitiesTab()}
            </TabContentWrapper>
          </ProjectPaneWrapper>
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
};

const mapStateToProps = createStructuredSelector({
  projectCodes: makeSelectProjectCodes(),
  selectedProjectCode: makeSelectSelectedProjectCode(),
  selectedProject: makeSelectSelectedProject(),
  selectedTab: makeSelectSelectedTab(),
});

const withConnect = connect(mapStateToProps, actions);

const withReducer = injectReducer({ key: 'projectpage', reducer });
const withSaga = injectSaga({ key: 'projectpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectPage);
