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

const renderTextarea = ({ content, onChange, onBlur }) => (
  <TextArea
    autoFocus="true"
    value={content}
    onChange={onChange}
    onBlur={onBlur}
  />
);

renderTextarea.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
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

