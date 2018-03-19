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
  ${(props) => props.hasError ? 'border-color: red !important;' : ''}
`;

const renderOptions = (options, groupValue, onNewTaskSelected) => (
  [
    ...options.map(({ label, value }) => (
      <OverlaySelectOption value={value} key={value}>{label}</OverlaySelectOption>
    )),
    <OverlaySelectOption key={`${groupValue}-new`} value={`${groupValue}-new`} onOptionSelect={onNewTaskSelected}>
      New task...
    </OverlaySelectOption>,
  ]
);

const renderGroupOptions = (optionGroups, onNewTaskSelected) => (
  optionGroups.map(({ label, value, options }) => (
    <OverlaySelectGroup key={value}>
      <OverlaySelectGroupHeader>{label}</OverlaySelectGroupHeader>
      { renderOptions(options, value, onNewTaskSelected) }
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
    onNewTaskSelected,
  } = props;

  const labelHtml = label ? <label htmlFor={id} className="label">{label}</label> : '';
  let buttonLabel = 'Select a Task';

  if (value) {
    const foundGroup = optionGroups.find((group) => group.options
      .find((option) => option.value === value)
    );
    if (foundGroup) {
      const foundOption = foundGroup.options.find((option) => option.value === value);
      buttonLabel = `${foundGroup.label} - ${foundOption.label}`;
    }
  }

  return (
    <div className="field">
      {labelHtml}
      <div className="control">
        <SelectButton
          {...meta}
          hasError={touched && error}
          onClick={onSelectTaskClicked}
          onBlur={() => onBlur(value)}
          className="button"
        >
          {buttonLabel}
        </SelectButton>
        {touched && error && <p className="help is-danger">{error}</p>}
        <OverlaySelect
          title="Select a Task"
          opened={isTaskOverlaySelectOpened}
          onDismiss={onDismissTaskOverlaySelect}
          onOptionSelect={(selectedValue) => onBlur(selectedValue) && onChange(selectedValue)}
        >
          { renderGroupOptions(optionGroups, onNewTaskSelected) }
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
  onNewTaskSelected: PropTypes.func.isRequired,
  optionGroups: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })),
  })),
};

export default TaskSelectionField;
