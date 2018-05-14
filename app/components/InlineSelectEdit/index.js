/**
*
* InlineSelectEdit
*
*/

import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import InlineEdit from '../InlineEdit';

const valueFormatterForSelect = (options, toBeFormatted, notSetMsg) => {
  const correspondingOption = options.find(({ value }) => toBeFormatted === value);
  if (!correspondingOption) {
    return notSetMsg;
  }

  return correspondingOption.label;
};

function InlineSelectEdit(props) {
  const { value, onChange, onCommit, onDiscard, options, placeholderMsg, notSetMsg } = props;

  return (
    <InlineEdit {...props} formatter={(rawValue) => valueFormatterForSelect(props.options, rawValue, notSetMsg)}>
      { () => (
        <Select
          autoFocus
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          clearable={false}
          value={value}
          onChange={(obj) => { onChange(obj.value); onCommit(); }}
          onBlur={onDiscard}
          options={options}
          searchable
          autosize={false}
          openOnFocus
          placeholder={placeholderMsg}
        />
      ) }
    </InlineEdit>
  );
}

InlineSelectEdit.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func.isRequired,
  onCommit: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  placeholderMsg: PropTypes.string.isRequired,
  notSetMsg: PropTypes.string.isRequired,
};

export default InlineSelectEdit;
