/**
*
* CheckboxGroup
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  border: 1px solid #aaa;
  padding-left: 10px;
  margin-top: 10px;
`;

// TODO export this component to another file
const DefaultCheckboxGroupItem = ({ input, label }) => (
  <label htmlFor={input.id}>
    <input type="checkbox" {...input} />
    <span>{label}</span>
  </label>
);

DefaultCheckboxGroupItem.propTypes = {
  input: PropTypes.shape({
    id: PropTypes.any.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

const createChangeHandler = ({ input, input: { onChange, onBlur }, value }) => (event) => {
  // TODO change the code to handle value as a List from immutable
  const arr = [...input.value];
  if (event.target.checked) {
    arr.push(value);
  } else {
    arr.splice(arr.indexOf(value), 1);
  }
  onBlur(arr);
  return onChange(arr);
};

const CheckboxGroupField = ({ input, meta, options, checkboxItemComponent }) => {
  const { name, onFocus } = input;
  const inputValue = input.value;
  const Component = checkboxItemComponent || DefaultCheckboxGroupItem;
  const checkboxes = options.map((option, index) => {
    const { label, value } = option;
    const key = `checkbox-${index}`;

    return (
      <Component
        input={{
          name: `${name}[${index}]`,
          id: `${name}[${index}]`,
          checked: inputValue.includes(value),
          onChange: createChangeHandler({ input, value }),
          value,
          onFocus,
        }}
        {...{
          meta,
          label,
          option,
          options,
          key,
        }}
      />
    );
  });

  return <CheckboxContainer>{checkboxes}</CheckboxContainer>;
};

CheckboxGroupField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
  })).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onFocus: PropTypes.func,
  }),
  meta: PropTypes.object.isRequired,
  checkboxItemComponent: PropTypes.func,
};

export default CheckboxGroupField;
