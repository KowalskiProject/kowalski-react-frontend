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

const renderSelect = (options, { content, onCommit, onChange, onDiscard }) => (
  <Select
    autoFocus
    onBlurResetsInput={false}
    onSelectResetsInput={false}
    clearable={false}
    value={content}
    onChange={({ value }) => { onChange(value); onCommit(); }}
    onBlur={onDiscard}
    options={options}
    searchable
    autosize={false}
    openOnFocus
    placeholder="Select a user..."
  />
);

const valueFormatterForSelect = (options, toBeFormatted) => {
  const correspondingOption = options.find(({ value }) => toBeFormatted === value);
  if (!correspondingOption) {
    return 'Not defined';
  }

  return correspondingOption.label;
};

function InlineSelectEdit(props) {
  return (
    <InlineEdit
      {...props}
      formatter={(value) => valueFormatterForSelect(props.options, value)}
      renderEditComponent={({ ...editProps }) => renderSelect(props.options, editProps)}
    >
    </InlineEdit>
  );
}

InlineSelectEdit.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })),
};

export default InlineSelectEdit;
