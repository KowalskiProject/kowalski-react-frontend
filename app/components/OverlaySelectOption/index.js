/**
*
* OverlaySelectOption
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Option = styled.a`
  display: block;
`;

const SelectedOption = styled.a`
  display: block;
  color: blue;
`;

function OverlaySelectOption({ onOptionSelect, selectedOption, children, value }) {
  const OptionElement = selectedOption === value || children
    ? SelectedOption
    : Option;
  const finalValue = value || children;

  return (
    <OptionElement onClick={() => onOptionSelect(finalValue)}>
      { children }
    </OptionElement>
  );
}

OverlaySelectOption.propTypes = {
  onOptionSelect: PropTypes.func,
  selectedOption: PropTypes.any,
  children: PropTypes.any,
  value: PropTypes.any,
};

export default OverlaySelectOption;
