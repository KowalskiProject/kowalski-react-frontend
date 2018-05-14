/**
*
* InlineDateEdit
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import InlineEdit, { STATE_EDITING, statePropType, STATE_NORMAL } from '../InlineEdit';
import { formatDate } from '../../support/backend/formatters';

export const onDatePickerChange = (onChange, onCommit) => ([date]) => {
  onChange(formatDate(date));
  onCommit();
};

export const onDatePickerClose = (state, onDiscard, onStateChange) => () => {
  if (state === STATE_EDITING) {
    setTimeout(() => {
      onDiscard();
      onStateChange(STATE_NORMAL);
    });
  }
};

function InlineDateEdit(props) {
  return (
    <InlineEdit {...props} >
      { () => (
        <Flatpickr
          value={props.value}
          onChange={onDatePickerChange(props.onChange, props.onCommit)}
          onClose={onDatePickerClose(props.state, props.onDiscard, props.onStateChange)}
          ref={(ref) => {
            if (ref && ref.node) {
              ref.node.focus();
            }
          }}
        />
      ) }
    </InlineEdit>
  );
}

InlineDateEdit.propTypes = {
  onStateChange: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  state: statePropType.isRequired,
  value: PropTypes.string.isRequired,
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InlineDateEdit;
