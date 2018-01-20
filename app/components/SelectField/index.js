/**
*
* SelectField
*
*/

import React from 'react';
import PropTypes from 'prop-types';

const renderOptions = (options) => (
  options.map((option) => {
    const value = option.value ? option.value : option.label;
    return <option value={value} key={value}>{option.label}</option>;
  })
);

function SelectField({ input, label, options, meta: { touched, error } }) {
  const labelHtml = label ? <label htmlFor={input.id} className="label">{label}</label> : '';
  return (
    <div className="field">
      {labelHtml}
      <div className="control">
        <div className="select">
          <select {...input}>
            { renderOptions(options) }
          </select>
        </div>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.any,
  options: PropTypes.array,
};

export default SelectField;
