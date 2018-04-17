/**
*
* ErrorMessageBox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

function ErrorMessageBox({ errorMsg }) {
  if (!errorMsg) {
    return <div></div>;
  }

  return (
    <Container className="message is-danger">
      <Container className="message-body">
        { errorMsg }
      </Container>
    </Container>
  );
}

ErrorMessageBox.propTypes = {
  errorMsg: PropTypes.string,
};

export default ErrorMessageBox;
