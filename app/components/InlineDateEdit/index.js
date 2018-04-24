/**
*
* InlineDateEdit
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import InlineEdit from '../InlineEdit';

const renderDatePicker = ({ content, onCommit, onChange }) => (
  <Flatpickr
    value={content}
    onChange={([date]) => onChange({ target: { value: date } })}
    onClose={() => setTimeout(onCommit)}
    ref={(ref) => {
      if (ref && ref.node) {
        ref.node.focus();
      }
    }}
  />
);

renderDatePicker.propTypes = {
  content: PropTypes.string,
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
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

