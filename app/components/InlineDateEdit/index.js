/**
*
* InlineDateEdit
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import InlineEdit, { STATE_SAVING } from '../InlineEdit';

export const onDatePickerChange = (onChange) => ([date]) => onChange(date);
export const onDatePickerClose = (onCommit) => () => setTimeout(onCommit);

const renderDatePicker = ({ content, onCommit, onChange, stateName }) => (
  <Flatpickr
    value={content}
    onChange={onDatePickerChange(onChange)}
    onClose={onDatePickerClose(onCommit)}
    ref={(ref) => {
      if (ref && ref.node && stateName !== STATE_SAVING) {
        ref.node.focus();
      }
    }}
  />
);

renderDatePicker.propTypes = {
  content: PropTypes.string,
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  stateName: PropTypes.string.isRequired,
};

class InlineDateEdit extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <InlineEdit
        {...this.props}
        renderEditComponent={renderDatePicker}
        displayEditElementWhenSaving
      />
    );
  }
}

export default InlineDateEdit;

