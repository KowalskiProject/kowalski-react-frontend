/**
*
* DayColumn
*
*/

import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import parseAmountOfHours from '../../support/parsers/duration';
import { capitalize } from '../../support/string/utils';

const wrapperFlexBasis = 14.286;
const slotsBackgroundColor = '#FDFCFF';

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
  height: ${100 - wrapperFlexBasis}% !important;
  background-color: ${slotsBackgroundColor};
  border: solid 0.5px rgba(102,78,164,0.4);
  border-left:0px;
  display: flex;
  flex-direction: column;
`;

const generateSlotWrapper = (hourSlot, totalSlot) => styled.a`
  display: flex;
  flex-direction: column;
  height: ${(hourSlot * 100) / totalSlot}% !important;
  overflow: hidden;
  border-bottom: solid 0.5px rgba(102,78,164,0.4);;
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

const TimeRecordDescription = styled.p`
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const extractTimeRecordDescription = (timeRecord) => {
  const text = `${(timeRecord.get('projectCode') || '[PROJ]')} - ` +
    `${(timeRecord.get('activityName') || 'Undefined activity Name - ')}` +
    `${(timeRecord.get('taskName') || 'Undefined task Name')}`;
  return text;
};

const renderTimeRecords = (timeRecords, onSlotClicked, day) => (
  timeRecords.map((timeRecord) => {
    const amountOfHours = parseAmountOfHours(timeRecord.get('reportedTime'));
    const SlotWrapper = generateSlotWrapper(amountOfHours, 8.0);
    const id = timeRecord.get('trId');
    return (
      <SlotWrapper key={id} onClick={() => onSlotClicked(id, day)} title={extractTimeRecordDescription(timeRecord)}>
        <p>{ timeRecord.get('reportedTime') }</p>
        <TimeRecordDescription>
          { extractTimeRecordDescription(timeRecord) }
        </TimeRecordDescription>
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

function DayColumn({ day, onFreeSlotClick, timeRecords, onSlotClicked, intl }) {
  return (
    <Wrapper>
      <DayLabelWrapper>
        <p>{capitalize(intl.formatDate(day, { weekday: 'short' }))}</p>
        <p>{ format(day, 'D') }</p>
      </DayLabelWrapper>
      <SlotsContainer>
        { renderTimeRecords(timeRecords, onSlotClicked, day) }
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
  intl: PropTypes.object.isRequired,
};

export default injectIntl(DayColumn);
