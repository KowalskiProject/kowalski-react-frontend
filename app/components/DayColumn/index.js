/**
*
* DayColumn
*
*/

import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import parseAmountOfHours from '../../support/parsers/duration';

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

const generateSlotWrapper = (hourSlot, totalSlot) => styled.div`
  background-color: red
  flex-basis: ${(hourSlot * 100) / totalSlot}%;
`;

const renderTimeSlots = (timeSlots) => (
  timeSlots.map((timeSlot) => {
    const amountOfHours = parseAmountOfHours(timeSlot.get('duration'));
    const SlotWrapper = generateSlotWrapper(amountOfHours, 8.0);
    return (
      <SlotWrapper>
        <p>{ timeSlot.duration }</p>
        <p>{ timeSlot.project } - { timeSlot.activity }</p>
      </SlotWrapper>
    );
  })
);

function DayColumn({ day, onFreeSlotClick, timeSlots }) {
  return (
    <Wrapper>
      <DayLabelWrapper>
        <p>{ format(day, 'ddd') }</p>
        <p>{ format(day, 'D') }</p>
      </DayLabelWrapper>
      <SlotsContainer>
        { renderTimeSlots(timeSlots) }
        <div>
          <a role="button" className="logHourAnchor" onClick={onFreeSlotClick} tabIndex={0}>+</a>
        </div>
      </SlotsContainer>
    </Wrapper>
  );
}

DayColumn.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  onFreeSlotClick: PropTypes.func,
  timeSlots: PropTypes.array,
};

export default DayColumn;
