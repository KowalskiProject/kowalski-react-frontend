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

function InlineLabelEdit(props) {
  return (
    <InlineEdit {...props}>
      { () => (
        <Input
          type="text"
          value={props.value}
          onChange={(evt) => props.onChange(evt.target.value)}
          innerRef={(ref) => {
            if (ref) {
              ref.focus();
              if (ref.value) {
                ref.selectionStart = ref.value.length + 1; // eslint-disable-line no-param-reassign
                ref.selectionEnd = ref.value.length + 1; // eslint-disable-line no-param-reassign
              }
            }
          }}
          onBlur={props.onCommit}
        />
      ) }
    </InlineEdit>
  );
}

InlineLabelEdit.propTypes = {
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default InlineLabelEdit;
