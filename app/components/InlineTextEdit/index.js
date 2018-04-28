/**
*
* InlineTextEdit
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextareaAutoresize from 'react-autosize-textarea';
import InlineEdit from '../InlineEdit';

const TextArea = styled(TextareaAutoresize)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// TODO refactor renderTextarea to dedicated file and rename it to be InlineEditTextArea
const renderTextarea = ({ content, onCommit, onChange, maxRows }) => (
  <TextArea
    autoFocus="true"
    value={content}
    onChange={(evt) => onChange(evt.target.value)}
    onBlur={onCommit}
    maxRows={maxRows}
  />
);

renderTextarea.propTypes = {
  content: PropTypes.string,
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  maxRows: PropTypes.number,
};

function InlineTextEdit(props) {
  const { maxRows } = props;
  return (
    <InlineEdit
      {...props}
      renderEditComponent={(editProps) => renderTextarea({ ...editProps, maxRows })}
    />
  );
}

InlineTextEdit.propTypes = {
  maxRows: PropTypes.number,
};

export default InlineTextEdit;

