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

const renderDatePicker = ({ content, onChange, onBlur }) => (
  <Flatpickr
    value={content}
    onChange={onChange}
    onBlur={onBlur}
    ref={(ref) => {
      if (ref && ref.node) {
        ref.node.focus();
      }
    }}
  />
);

renderDatePicker.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

class InlineDateEdit extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <InlineEdit
        {...this.props}
        renderEditComponent={renderDatePicker}
      />
    );
  }
}

export default InlineDateEdit;

