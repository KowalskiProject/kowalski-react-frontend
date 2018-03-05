/**
*
* OverlaySelectGroupHeader
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Title = styled.h4`
`;

function OverlaySelectGroupHeader(props) {
  return (
    <Title>
      { props.children }
    </Title>
  );
}

OverlaySelectGroupHeader.propTypes = {
  children: PropTypes.any,
};

export default OverlaySelectGroupHeader;
