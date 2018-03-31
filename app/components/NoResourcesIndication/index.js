/**
*
* NoResourcesIndication
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  text-align: center;
  font-size:46px;
  color:#F7F8F8;
  padding-top: 100px;
`;

function NoResourcesIndication({ resourceName, gender = 'female' }) {
  return (
    <Container>
      <FormattedMessage {...(gender === 'female' ? messages.textFemale : messages.textMale)} values={{ resourceName }} />
    </Container>
  );
}

NoResourcesIndication.propTypes = {
  resourceName: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(['male', 'female']),
};

export default NoResourcesIndication;
