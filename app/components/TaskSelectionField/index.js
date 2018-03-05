/**
*
* TaskSelectionField
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OverlaySelect from '../../components/OverlaySelect';
import OverlaySelectGroup from '../../components/OverlaySelectGroup';
import OverlaySelectGroupHeader from '../../components/OverlaySelectGroupHeader';
import OverlaySelectOption from '../../components/OverlaySelectOption';

const SelectButton = styled.button`
  width: 100%;
  height: 50px !important;
`;

const renderOptions = (options) => (
  options.map(({label, value}) => (
    <OverlaySelectOption value={value} key={value}>{label}</OverlaySelectOption>
  ))
);

const renderGroupOptions = (optionGroups) => (
  optionGroups.map(({label, options}) => (
    <OverlaySelectGroup key={label}>
      <OverlaySelectGroupHeader>{label}</OverlaySelectGroupHeader>
      { renderOptions(options) }
    </OverlaySelectGroup>
  ))
);

function TaskSelectionField(props) {
  const {
    input: { onChange, onBlur, id, value },
    label,
    meta,
    meta: { touched, error },
    isTaskOverlaySelectOpened,
    onDismissTaskOverlaySelect,
    onSelectTaskClicked,
    optionGroups,
  } = props;

  const errorInputClasses = touched && error ? 'is-danger' : '';

  const labelHtml = label ? <label htmlFor={id} className="label">{label}</label> : '';
  let buttonLabel = "Select a Task";

  if (value) {
    const group = optionGroups.find((group) => group.options
      .find((option) => option.value === value)
    );
    const option = group.options.find((option) => option.value === value);
    buttonLabel = `${group.label} - ${option.label}`;
  }

  return (
    <div className="field">
      {labelHtml}
      <div className="control">
        <SelectButton {...meta} onClick={onSelectTaskClicked} onBlur={() => onBlur(value)} className={`button ${errorInputClasses}`}>
          {buttonLabel}
        </SelectButton>
        {touched && error && <p className="help is-danger">{error}</p>}
        <OverlaySelect
          title="Select a Task"
          opened={isTaskOverlaySelectOpened}
          onDismiss={onDismissTaskOverlaySelect}
          onOptionSelect={(value) => onBlur(value) && onChange(value)}
        >
          { renderGroupOptions(optionGroups) }
        </OverlaySelect>
      </div>
    </div>
  );
}

TaskSelectionField.propTypes = {
  input: PropTypes.any.isRequired,
  meta: PropTypes.any.isRequired,
  isTaskOverlaySelectOpened: PropTypes.bool.isRequired,
  onDismissTaskOverlaySelect: PropTypes.func,
  onSelectTaskClicked: PropTypes.func.isRequired,
  label: PropTypes.any,
  optionGroups: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }))
  }))
};

export default TaskSelectionField;
