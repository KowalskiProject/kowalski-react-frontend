/**
*
* InlineEdit
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaPencil from 'react-icons/lib/fa/pencil';
import { ClipLoader } from 'react-spinners';
import EditActions from './EditActions';

export const STATE_NORMAL = 'STATE_NORMAL';
export const STATE_HOVERED = 'STATE_HOVERED';
export const STATE_EDITING = 'STATE_EDITING';
export const STATE_SAVING = 'STATE_SAVING';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  outline: ${({ outlined }) => outlined ? '1px solid grey' : 'none'};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  width: 100%;
  ${({ saving }) => saving ? 'font-style: italic; color: grey;' : ''}
`;

const SideIconsContainer = styled.a`
  color: inherit;
  margin-right: 5px;
  flex-grow: 0;
`;

function InlineEdit({
  formatter, onCommit, onDiscard, state, children, value, onStateChange, tooltipText, notSetMsg,
}) {
  return (
    <Container
      outlined={state === STATE_HOVERED || state === STATE_EDITING}
      onMouseEnter={() => state === STATE_NORMAL && onStateChange(STATE_HOVERED)}
      onMouseLeave={() => state === STATE_HOVERED && onStateChange(STATE_NORMAL)}
      onClick={() => state !== STATE_SAVING && onStateChange(STATE_EDITING)}
      title={state === STATE_HOVERED || state === STATE_NORMAL ? tooltipText : undefined}
    >
      <ContentContainer saving={state === STATE_SAVING}>
        { state !== STATE_EDITING && (value ? formatter(value) : notSetMsg) }
        { state === STATE_EDITING && children() }
        { state === STATE_EDITING && <EditActions onConfirmChanges={onCommit} onDiscardChanges={onDiscard} /> }
      </ContentContainer>
      {
        state !== STATE_EDITING && state !== STATE_NORMAL &&
          <SideIconsContainer>
            { state === STATE_HOVERED ? <FaPencil size={18} /> : <ClipLoader size={18} /> }
          </SideIconsContainer>
      }
    </Container>
  );
}

export const statePropType = PropTypes.oneOf([STATE_EDITING, STATE_NORMAL, STATE_HOVERED, STATE_SAVING]);

InlineEdit.propTypes = {
  formatter: PropTypes.func.isRequired,
  onCommit: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  state: statePropType.isRequired,
  children: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  onStateChange: PropTypes.func.isRequired,
  tooltipText: PropTypes.string,
  notSetMsg: PropTypes.string,
};

InlineEdit.defaultProps = {
  formatter: (x) => x,
};

export default InlineEdit;
