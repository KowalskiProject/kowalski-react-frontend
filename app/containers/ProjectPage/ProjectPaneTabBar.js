import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabsWrapper = styled.div`
  margin-top: 8px;
  flex-grow: 0;
  flex-shrink: 0;
`;

export default function ProjectPaneTabBar({ selectedTab, onTabSelect, generalTabTitle, activitiesTabTitle }) {
  return (
    <TabsWrapper className="tabs">
      <ul>
        <li className={selectedTab === 0 ? 'is-active' : ''}>
          <a role="button" tabIndex={0} onClick={() => onTabSelect(0)}>{generalTabTitle}</a>
        </li>
        <li className={selectedTab === 1 ? 'is-active' : ''}>
          <a role="button" tabIndex={0} onClick={() => onTabSelect(1)}>{activitiesTabTitle}</a>
        </li>
      </ul>
    </TabsWrapper>
  );
}

ProjectPaneTabBar.propTypes = {
  selectedTab: PropTypes.oneOf([0, 1]).isRequired,
  onTabSelect: PropTypes.func.isRequired,
  generalTabTitle: PropTypes.string.isRequired,
  activitiesTabTitle: PropTypes.string.isRequired,
};
