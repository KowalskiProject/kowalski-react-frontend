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

function OverlaySelectGroup({ children, ...other }) {
  return (
    <OverlaySelectGroupContainer>
      {React.Children.map(children, ((child) => React.cloneElement(child, other)))}
    </OverlaySelectGroupContainer>
  );
}

OverlaySelectGroup.propTypes = {
  children: PropTypes.any,
  onOptionSelect: PropTypes.func,
  selectedOption: PropTypes.any,
};

export default OverlaySelectGroup;
