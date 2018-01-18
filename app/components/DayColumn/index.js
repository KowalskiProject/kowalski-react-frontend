/**
*
* DayColumn
*
*/

import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  flex-grow: 0;
  flex-basis: 14.286%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DayLabelWrapper = styled.div`
  text-align: center;
`;

const SlotsContainer = styled.div`
  flex-grow: 1;
  background-color: #eee;
  border-radius: 25px;
  border: 2px solid #aaa;
  margin: 5px;
  position: relative;
`;

function DayColumn({ day }) {
  return (
    <Wrapper>
      <DayLabelWrapper>
        <p>{ format(day, 'ddd') }</p>
        <p>{ format(day, 'D') }</p>
      </DayLabelWrapper>
      <SlotsContainer>
        <a className="logHourAnchor">+</a>
      </SlotsContainer>
    </Wrapper>
  );
}

DayColumn.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
};

export default DayColumn;
