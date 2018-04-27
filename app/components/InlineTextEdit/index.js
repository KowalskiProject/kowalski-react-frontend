/**
*
* InlineTextEdit
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextareaAutoresize from 'react-autosize-textarea';
import InlineEdit from '../InlineEdit';

const TextArea = styled(TextareaAutoresize)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const renderTextarea = ({ content, onCommit, onChange }) => (
  <TextArea
    autoFocus="true"
    value={content}
    onChange={(evt) => onChange(evt.target.value)}
    onBlur={onCommit}
  />
);

renderTextarea.propTypes = {
  content: PropTypes.string,
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

class InlineTextEdit extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <InlineEdit
        {...this.props}
        renderEditComponent={renderTextarea}
      />
    );
  }
}

export default InlineTextEdit;

