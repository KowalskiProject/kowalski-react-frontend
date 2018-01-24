/**
*
* DayColumn
*
*/

import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { List } from 'immutable';
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
  display: flex;
  flex-direction: column;
`;

const generateSlotWrapper = (hourSlot, totalSlot) => styled.a`
  flex-grow: 1;
  display: block;
  flex-basis: ${(hourSlot * 100) / totalSlot}%;
  padding: 10px;
`;

const renderTimeSlots = (timeSlots) => (
  (timeSlots || List()).map((timeSlot, index) => {
    const amountOfHours = parseAmountOfHours(timeSlot.get('duration'));
    const SlotWrapper = generateSlotWrapper(amountOfHours, 8.0);
    // TODO put the id of the log instead of index. This is going to be returned by the server,
    // so we must wait until it's integrated
    return (
      <SlotWrapper key={index}>
        <p>{ timeSlot.get('duration') }</p>
        <p>{ timeSlot.get('project') } - { timeSlot.get('activity') }</p>
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
  timeSlots: PropTypes.instanceOf(List),
};

export default DayColumn;
