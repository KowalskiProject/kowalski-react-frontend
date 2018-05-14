import React from 'react';
import bind from 'memoize-bind';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ErrorMessageBox from 'components/ErrorMessageBox/Loadable';
import { fromJS } from 'immutable';
import styled from 'styled-components';

import InlineTextEdit from '../../components/InlineTextEdit';
import InlineDateEdit from '../../components/InlineDateEdit';
import InlineSelectEdit from '../../components/InlineSelectEdit';
import InlineLabelEdit from '../../components/InlineLabelEdit';
import { statePropType } from '../../components/InlineEdit';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const FlexFieldContainer = styled.div`
  flex: 1;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ProjectNameWrapper = FlexFieldContainer.extend`
  padding-top: 0rem;
  font-size: 1.8rem;
`;

const ErrorMsgBoxWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
  flex: 1;
`;

const ProjectInfoWrapper = styled.div`
  flex: 1;
`;

function InlineProjectForm({ fields, labels, accountableOptions, errorMsg, updateField, tooltipText, notSetMsg }) {
  const editAttributes = fields.reduce((reduced, field, fieldName) => (
    reduced.set(fieldName, fromJS({
      onCommit: bind(updateField, this, fieldName, 'originalValue', field.get('value')),
      onDiscard: bind(updateField, this, fieldName, 'value', field.get('originalValue')),
      onChange: bind(updateField, this, fieldName, 'value'),
      onStateChange: bind(updateField, this, fieldName, 'state'),
      state: field.get('state'),
      value: field.get('value'),
      tooltipText,
      notSetMsg,
    }))
  ), fromJS({})).toJS();

  return (
    <Container>
      {
        errorMsg &&
        <ErrorMsgBoxWrapper>
          <ErrorMessageBox errorMsg={errorMsg} />
        </ErrorMsgBoxWrapper>
      }
      <ProjectNameWrapper>
        <InlineTextEdit {...editAttributes.name} />
      </ProjectNameWrapper>
      <ProjectInfoWrapper className="columns">
        <FlexFieldContainer className="column">
          <h4> {labels.accountable} </h4>
          <div>
            <InlineSelectEdit
              {...editAttributes.accountableId}
              options={accountableOptions}
              placeholderMsg={notSetMsg}
            />
          </div>
        </FlexFieldContainer>
        <FlexFieldContainer className="column">
          <h4> {labels.startDate} </h4>
          <div> <InlineDateEdit {...editAttributes.startDate} /> </div>
        </FlexFieldContainer>
        <FlexFieldContainer className="column">
          <h4> {labels.endDate} </h4>
          <div> <InlineDateEdit {...editAttributes.endDate} /> </div>
        </FlexFieldContainer>
      </ProjectInfoWrapper>
      <ProjectInfoWrapper className="columns">
        <FlexFieldContainer className="column is-two-thirds">
          <h4> {labels.description} </h4>
          <div> <InlineTextEdit {...editAttributes.description} /> </div>
        </FlexFieldContainer>
        <FlexFieldContainer className="column">
          <h4> {labels.code} </h4>
          <div> <InlineLabelEdit {...editAttributes.code} /> </div>
        </FlexFieldContainer>
      </ProjectInfoWrapper>
    </Container>
  );
}

const fieldPropType = (fieldType) => ImmutablePropTypes.mapContains({
  state: statePropType.isRequired,
  value: fieldType,
  originalValue: fieldType,
}).isRequired;

InlineProjectForm.propTypes = {
  fields: ImmutablePropTypes.mapContains({
    name: fieldPropType(PropTypes.string),
    accountableId: fieldPropType(PropTypes.number),
    startDate: fieldPropType(PropTypes.string),
    endDate: fieldPropType(PropTypes.string),
    code: fieldPropType(PropTypes.string),
    description: fieldPropType(PropTypes.string),
  }).isRequired,
  labels: PropTypes.shape({
    accountable: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  accountableOptions: PropTypes.array.isRequired,
  errorMsg: PropTypes.string,
  updateField: PropTypes.func.isRequired,
  tooltipText: PropTypes.string,
  notSetMsg: PropTypes.string,
};

export default InlineProjectForm;
