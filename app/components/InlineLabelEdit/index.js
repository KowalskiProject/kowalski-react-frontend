/**
*
* InlineTextEdit
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InlineEdit from '../InlineEdit';

const Input = styled.input`
  width: 100%;
  height: 100%;
`;

const renderTextInput = ({ content, onCommit, onChange }) => (
  <Input
    type="text"
    value={content}
    onChange={(evt) => onChange(evt.target.value)}
    innerRef={(ref) => {
      if (ref) {
        ref.focus();
        ref.selectionStart = ref.value.length + 1; // eslint-disable-line no-param-reassign
        ref.selectionEnd = ref.value.length + 1; // eslint-disable-line no-param-reassign
      }
    }}
    onBlur={onCommit}
  />
);

renderTextInput.propTypes = {
  content: PropTypes.string,
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function InlineLabelEdit(props) {
  return (
    <InlineEdit
      {...props}
      renderEditComponent={(editProps) => renderTextInput({ ...editProps })}
    />
  );
}

export default InlineLabelEdit;
