/**
*
* TextAreaField
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TextAreaField({ input, label, type = 'text', placeholder, meta: { touched, error }, disabled }) {
  const labelHtml = label ? <label htmlFor={input.id} className="label">{label}</label> : '';
  const errorInputClasses = touched && error ? 'is-danger' : '';
  return (
    <div className="field">
      {labelHtml}
      <div className="control">
        <textarea disabled={disabled} {...input} type={type} className={`textarea ${errorInputClasses}`} placeholder={placeholder} />
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
}

TextAreaField.propTypes = {
  input: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
};

export default TextAreaField;
