/**
*
* OverlaySelectGroup
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OverlaySelectGroupContainer = styled.div`
  margin-top: 15px;
`;

function OverlaySelectGroup({ children, onOptionSelect, ...other }) {
  return (
    <OverlaySelectGroupContainer>
      {React.Children.map(children, ((child) => {
        // Preserve onOptionSelect of individual element if it's present
        const finalOnOptionSelect = child.props.onOptionSelect || onOptionSelect;
        return React.cloneElement(child, { onOptionSelect: finalOnOptionSelect, ...other });
      }))}
    </OverlaySelectGroupContainer>
  );
}

OverlaySelectGroup.propTypes = {
  children: PropTypes.any,
  onOptionSelect: PropTypes.func,
  selectedOption: PropTypes.any,
};

export default OverlaySelectGroup;
