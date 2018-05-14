import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FaCheck from 'react-icons/lib/fa/check';
import TiTimes from 'react-icons/lib/ti/times';

const EditActionsWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  position: absolute;
  bottom: -28px;
  right: 0px;
`;

const CheckChangesButton = styled.a`
  display: flex;
  color: inherit;
  margin-left: 2px;
  margin-right: 1px;
`;

const DiscardChangesButton = styled.a`
  display: flex;
  color: inherit;
  margin-left: 1px;
  margin-right: 2px;
`;

function EditActions({ onConfirmChanges, onDiscardChanges }) {
  return (
    <EditActionsWrapper>
      <CheckChangesButton title="Confirm changes" onMouseDown={onConfirmChanges}>
        <FaCheck size={19} />
      </CheckChangesButton>
      <DiscardChangesButton title="Discard changes" onMouseDown={onDiscardChanges}>
        <TiTimes size={22} />
      </DiscardChangesButton>
    </EditActionsWrapper>
  );
}

EditActions.propTypes = {
  onConfirmChanges: PropTypes.func.isRequired,
  onDiscardChanges: PropTypes.func.isRequired,
};

export default EditActions;
