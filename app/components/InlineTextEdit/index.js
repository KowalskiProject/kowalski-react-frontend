/**
*
* InlineTextEdit
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TextareaAutoresize from 'react-autosize-textarea';
import InlineEdit from '../InlineEdit';

const TextArea = styled(TextareaAutoresize)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const renderTextEdit = ({ content, onChange, onBlur }) => (
  <TextArea
    autoFocus="true"
    value={content}
    onChange={onChange}
    onBlur={onBlur}
  />
);

renderTextEdit.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

function InlineTextEdit(props) {
  return <InlineEdit {...props} renderEditComponent={renderTextEdit} />;
}

export default InlineTextEdit;
