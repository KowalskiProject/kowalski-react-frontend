/**
*
* DayColumn
*
*/

import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
  border-left:0px;
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

const renderTimeRecords = (timeRecords, onSlotClicked) => (
  timeRecords.map((timeRecord) => {
    const amountOfHours = parseAmountOfHours(timeRecord.get('reportedTime'));
    const SlotWrapper = generateSlotWrapper(amountOfHours, 8.0);
    const id = timeRecord.get('trId');
    return (
      <SlotWrapper key={id} onClick={() => onSlotClicked(id)}>
        <p>{ timeRecord.get('reportedTime') }</p>
        <p>
          {
            `${(timeRecord.get('projectCode') || '[PROJ]')} - ` +
            `${(timeRecord.get('activityName') || 'Activity Name -')}` +
            `${(timeRecord.get('taskName') || 'Task Name')}`
          }
        </p>
      </SlotWrapper>
    );
  })
);

const amountOfHoursInTimeRecords = (timeRecords) => timeRecords.reduce(
  (memo, current) => memo + parseAmountOfHours(current.get('reportedTime')),
  0.0
);

const renderPlusButton = (timeRecords, onClickCallback) => {
  const amountOfHours = 8.0 - amountOfHoursInTimeRecords(timeRecords);
  const SlotWrapper = generatePlusSlotWrapper(amountOfHours, 8.0);

  return (
    <SlotWrapper role="button" onClick={onClickCallback} tabIndex={0}>+</SlotWrapper>
  );
};

function DayColumn({ day, onFreeSlotClick, timeRecords, onSlotClicked }) {
  return (
    <Wrapper>
      <DayLabelWrapper>
        <p>{ format(day, 'ddd') }</p>
        <p>{ format(day, 'D') }</p>
      </DayLabelWrapper>
      <SlotsContainer>
        { renderTimeRecords(timeRecords, onSlotClicked) }
        { renderPlusButton(timeRecords, onFreeSlotClick) }
      </SlotsContainer>
    </Wrapper>
  );
}

DayColumn.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  onFreeSlotClick: PropTypes.func.isRequired,
  onSlotClicked: PropTypes.func.isRequired,
  timeRecords: ImmutablePropTypes.list.isRequired,
};

export default DayColumn;
