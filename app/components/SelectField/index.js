/**
*
* SelectField
* options prop: An object containing:
* 'labelField'
*   - the field in the elements of items that should be fetched in order to show the text of the option. Defaults to label,
* 'valueField'
*   - the field in the elements of items that should be fetched in order to show the value of the option. Defaults to value,
*  'items'
*   - The array of objects representing the option elements of the select input
*/

import React from 'react';
import PropTypes from 'prop-types';

function SelectField({ input, label, id, children, meta: { touched, error } }) {
  const labelHtml = label ? <label htmlFor={input.id} className="label">{label}</label> : '';
  const errorSelectClasses = touched && error ? 'is-danger' : '';
  return (
    <div className="field">
      {labelHtml}
      <span className="control">
        <div className={`select ${errorSelectClasses}`}>
          <select {...input} id={id}>
            { children }
          </select>
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </span>
    </div>
  );
}

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  children: PropTypes.any,
  id: PropTypes.string,
};

export default SelectField;
