/**
*
* TextAreaField
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TextAreaField({ input, label, type = 'text', placeholder, meta: { touched, error } }) {
  const labelHtml = label ? <label htmlFor={input.id} className="label">{label}</label> : '';
  return (
    <div className="field">
      {labelHtml}
      <div className="control">
        <textarea {...input} type={type} className="textarea" placeholder={placeholder} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

TextAreaField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.any,
};

export default TextAreaField;
