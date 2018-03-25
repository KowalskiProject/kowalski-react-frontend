/**
*
* TaskSelectionField
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import OverlaySelect from '../../components/OverlaySelect';
import OverlaySelectGroup from '../../components/OverlaySelectGroup';
import OverlaySelectGroupHeader from '../../components/OverlaySelectGroupHeader';
import OverlaySelectOption from '../../components/OverlaySelectOption';
import messages from '../../containers/TimesheetPage/messages';

const SelectButton = styled.button`
  width: 100%;
  height: 50px !important;
  ${(props) => props.hasError ? 'border-color: red !important;' : ''}
`;

const renderOptions = (options, groupValue, onNewTaskSelected, formatMessage) => (
  [
    ...options.map(({ label, value }) => (
      <OverlaySelectOption value={value} key={value}>{label}</OverlaySelectOption>
    )),
    <OverlaySelectOption key={`${groupValue}-new`} value={`${groupValue}-new`} onOptionSelect={onNewTaskSelected}>
      { formatMessage(messages.buttonNewTask) }
    </OverlaySelectOption>,
  ]
);

const renderGroupOptions = (optionGroups, onNewTaskSelected, formatMessage) => (
  optionGroups.map(({ label, value, options }) => (
    <OverlaySelectGroup key={value}>
      <OverlaySelectGroupHeader>{label}</OverlaySelectGroupHeader>
      { renderOptions(options, value, onNewTaskSelected, formatMessage) }
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
    disabled,
    intl: { formatMessage },
  } = props;

  const labelHtml = label ? <label htmlFor={id} className="label">{label}</label> : '';
  let buttonLabel = formatMessage(messages.buttonSelectATask);

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
          disabled={disabled}
        >
          {buttonLabel}
        </SelectButton>
        {touched && error && <p className="help is-danger">{error}</p>}
        <OverlaySelect
          title={formatMessage(messages.buttonSelectATask)}
          opened={isTaskOverlaySelectOpened}
          onDismiss={onDismissTaskOverlaySelect}
          onOptionSelect={(selectedValue) => onBlur(selectedValue) && onChange(selectedValue)}
        >
          { renderGroupOptions(optionGroups, onNewTaskSelected, formatMessage) }
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
  disabled: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TaskSelectionField);
