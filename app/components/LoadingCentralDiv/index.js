/**
*
* LoadingCentralDiv
*
*/

import React from 'react';
import { RingLoader } from 'react-spinners';
import CentralDiv from '../CentralDiv';

function LoadingCentralDiv() {
  return (
    <CentralDiv>
      <RingLoader />
    </CentralDiv>
  );
}

LoadingCentralDiv.propTypes = {

};

export default LoadingCentralDiv;
