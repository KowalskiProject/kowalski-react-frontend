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

const wrapperFlexBasis = 14.286;
const slotsBackgroundColor = '#fff';

const Wrapper = styled.div`
  flex-grow: 0;
  flex-basis: ${wrapperFlexBasis}%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const DayLabelWrapper = styled.div`
  text-align: center;
`;

const SlotsContainer = styled.div`
  flex-basis: ${100 - wrapperFlexBasis}%;
  background-color: ${slotsBackgroundColor};
  border: 0.5px solid #aaa;
  border-right:0px;
  display: flex;
  flex-direction: column;
`;

const generateSlotWrapper = (hourSlot, totalSlot) => styled.a`
  display: flex;
  flex-direction: column;
  flex-basis: ${(hourSlot * 100) / totalSlot}%;
  justify-content: center;
  text-align: center;
  padding: 10px;
  flex-grow: 0;
`;

const generatePlusSlotWrapper = (hourSlot, totalSlot) => generateSlotWrapper(hourSlot, totalSlot).extend`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 0;
  flex-grow: 1;

  &:hover {
    font-size: 3rem;
  }
`;

const renderTimeSlots = (timeSlots) => {
  return (timeSlots || List()).map((timeSlot, index) => {
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
};

const amountOfHoursInTimeSlots = (timeSlots) => {
  return (timeSlots || List()).reduce((memo, current) => {
    return memo + parseAmountOfHours(current.get('duration'));
  }, 0.0);
}

const renderPlusButton = (timeSlots, onClickCallback) => {
  const amountOfHours = 8.0 - amountOfHoursInTimeSlots(timeSlots);
  const SlotWrapper = generatePlusSlotWrapper(amountOfHours, 8.0);

  return (
    <SlotWrapper role="button" onClick={onClickCallback} tabIndex={0}>+</SlotWrapper>
  );
}

function DayColumn({ day, onFreeSlotClick, timeSlots }) {
  return (
    <Wrapper>
      <DayLabelWrapper>
        <p>{ format(day, 'ddd') }</p>
        <p>{ format(day, 'D') }</p>
      </DayLabelWrapper>
      <SlotsContainer>
        { renderTimeSlots(timeSlots) }
        { renderPlusButton(timeSlots, onFreeSlotClick) }
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
