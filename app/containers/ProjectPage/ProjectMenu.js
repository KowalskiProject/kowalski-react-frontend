import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImmutablePropTypes from 'react-immutable-proptypes';

const ProjectCodeWrapper = styled.a`
  display: block;
  width: 200px;
  padding: 2rem;
  text-align: center;
  color:#414549;
  border-bottom: 0.5px solid #dbdbdb;
  ${(props) => props.selected ? 'background-color: #D2CCEB;' : ''}

  &:hover {
    ${(props) => props.selected ? '' : 'background-color: #DFD9FA;'}
  }
`;

export default function ProjectMenu({ projectGroups, onProjectSelect, selectedProjectId, projectCodesLoadingErrorMsg }) {
  if (projectCodesLoadingErrorMsg) {
    return (
      <article className="message is-danger">
        <div className="message-body">
          { projectCodesLoadingErrorMsg }
        </div>
      </article>
    );
  }

  return (
    <div>
      {
        (projectGroups).map((group) => (
          <ProjectCodeWrapper
            selected={group.get('id') === selectedProjectId}
            key={group.get('id')}
            onClick={() => onProjectSelect(group.get('id'))}
          >
            { group.get('code') }
          </ProjectCodeWrapper>
        ))
      }
    </div>
  );
}

ProjectMenu.propTypes = {
  projectGroups: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    code: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  onProjectSelect: PropTypes.func.isRequired,
  selectedProjectId: PropTypes.number,
  projectCodesLoadingErrorMsg: PropTypes.string.isRequired,
};
