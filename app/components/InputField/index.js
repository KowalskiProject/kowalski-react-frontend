/**
*
* InputField
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function InputField({ input, label, type = 'text', placeholder, meta: { touched, error } }) {
  const labelHtml = label ? <label htmlFor={input.id} className="label">{label}</label> : '';
  const errorInputClasses = touched && error ? 'is-danger' : '';
  return (
    <div className="field">
      {labelHtml}
      <div className="control">
        <input {...input} type={type} className={`input ${errorInputClasses}`} placeholder={placeholder} />
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
}

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.any,
};

export default InputField;
