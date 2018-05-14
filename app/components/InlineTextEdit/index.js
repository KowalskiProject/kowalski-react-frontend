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

function InlineTextEdit(props) {
  return (
    <InlineEdit {...props}>
      { () => (
        <TextArea
          autoFocus="true"
          value={props.value}
          onChange={(evt) => props.onChange(evt.target.value)}
          onBlur={props.onCommit}
          maxRows={props.maxRows}
        />
      ) }
    </InlineEdit>
  );
}

InlineTextEdit.propTypes = {
  maxRows: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onCommit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

InlineTextEdit.defaultProps = {
  value: '',
};

export default InlineTextEdit;

