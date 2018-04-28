import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Modal from 'components/Modal/Loadable';
import ErrorMessageBox from 'components/ErrorMessageBox/Loadable';
import AddPeopleForm from './AddPeopleForm';
import PeopleFlexGrid from '../../components/PeopleFlexGrid';
import { userCanAccess } from '../../support/auth/utils';
import { ADD } from '../../support/auth/resources';
import messages from './messages';
import { updateProjectAttribute } from './actions';
import { makeSelectUpdateProjectAttributesStatus, makeSelectUpdateProjectAttributesErrorMsg } from './selectors';
import InlineTextEdit from '../../components/InlineTextEdit';
import InlineDateEdit from '../../components/InlineDateEdit';
import InlineSelectEdit from '../../components/InlineSelectEdit';
import InlineLabelEdit from '../../components/InlineLabelEdit';
import { capitalize } from '../../support/string/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: stretch;
  margin-right: 2rem;
`;

const FlexFieldContainer = styled.div`
  display: flex;
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
`;

const ProjectInfoWrapper = styled.div`
  display: flex;
`;

const ProjectPeopleWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const ProjectPeopleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 0;
  margin-botton: 10px;
`;

const ProjectPeopleContent = styled.div`
  flex-grow: 1;
  border-left: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  padding-top: 1rem;
`;

const AddPeopleButton = styled.button`
  width:186px;
  height:50px !important;
  border-radius:2px;
  border:1px solid #654EA3;
  color: white;
  display: flex;
  margin-bottom: 0.5rem;
`;

export function GeneralTab(props) {
  const {
    isAddPeopleFormOpen,
    closeAddPeopleForm,
    usersNotInProject,
    updateProjectAttributesErrorMsg,
    intl: { formatMessage },
  } = props;

  const project = props.project;

  if (!project) {
    return <div></div>;
  }

  const projectId = project.get('projectId');
  const accountableOptions = project.get('people').map(
    (person) => ({ value: person.get('kUserId'), label: person.get('name') })
  ).toJS();

  return (
    <Container>
      {
        updateProjectAttributesErrorMsg &&
          <ErrorMsgBoxWrapper>
            <ErrorMessageBox
              errorMsg={`
                ${formatMessage(messages.generalTabErrorUpdatingAttribute)}
                ${formatMessage(messages[`generalTabErrorUpdating${capitalize(updateProjectAttributesErrorMsg)}`])}
              `}
            />
          </ErrorMsgBoxWrapper>
      }
      <ProjectNameWrapper>
        <InlineTextEdit
          onCommit={(name) => props.updateProjectAttribute(Map({ name, projectId }))}
          saving={props.updateProjectAttributesStatus.get('name')}
          value={project.get('name')}
        />
      </ProjectNameWrapper>
      <ProjectInfoWrapper className="columns">
        <FlexFieldContainer className="column">
          <h4><FormattedMessage {... messages.generalTabProjectAccountable} /></h4>
          <div>
            <InlineSelectEdit
              onCommit={(accountableId) => props.updateProjectAttribute(Map({ accountableId, projectId }))}
              saving={props.updateProjectAttributesStatus.get('accountableId')}
              value={project.get('accountableId')}
              options={accountableOptions}
            />
          </div>
        </FlexFieldContainer>
        <FlexFieldContainer className="column">
          <h4><FormattedMessage {... messages.generalTabProjectStartDate} /></h4>
          <div>
            <InlineDateEdit
              onCommit={(startDate) => props.updateProjectAttribute(Map({ startDate, projectId }))}
              saving={props.updateProjectAttributesStatus.get('startDate')}
              value={project.get('startDate')}
            />
          </div>
        </FlexFieldContainer>
        <FlexFieldContainer className="column">
          <h4><FormattedMessage {... messages.generalTabProjectEndDate} /></h4>
          <div>
            <InlineDateEdit
              onCommit={(endDate) => props.updateProjectAttribute(Map({ endDate, projectId }))}
              saving={props.updateProjectAttributesStatus.get('endDate')}
              value={project.get('endDate')}
            />
          </div>
        </FlexFieldContainer>
      </ProjectInfoWrapper>
      <ProjectInfoWrapper className="columns">
        <FlexFieldContainer className="column is-two-thirds">
          <h4><FormattedMessage {... messages.generalTabProjectDescription} /></h4>
          <div>
            <InlineTextEdit
              onCommit={(description) => props.updateProjectAttribute(Map({ description, projectId }))}
              saving={props.updateProjectAttributesStatus.get('description')}
              value={project.get('description')}
            />
          </div>
        </FlexFieldContainer>
        <FlexFieldContainer className="column">
          <h4><FormattedMessage {... messages.generalTabProjectCode} /></h4>
          <div>
            <InlineLabelEdit
              onCommit={(code) => props.updateProjectAttribute(Map({ code, projectId }))}
              saving={props.updateProjectAttributesStatus.get('code')}
              value={project.get('code')}
            />
          </div>
        </FlexFieldContainer>
      </ProjectInfoWrapper>
      <ProjectPeopleWrapper>
        <ProjectPeopleHeader>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <h4> <FormattedMessage {... messages.generalTabProjectPeople} /> </h4>
          </div>
          {
            userCanAccess(ADD.PERSON_TO_PROJECT) &&
              <AddPeopleButton className="button primary-button" onClick={props.openAddPeopleForm}>
                <FormattedMessage {... messages.generalTabProjectAddPeople} />
              </AddPeopleButton>
          }
        </ProjectPeopleHeader>
        <ProjectPeopleContent>
          <PeopleFlexGrid people={project.get('people')} />
        </ProjectPeopleContent>
        <Modal active={isAddPeopleFormOpen} onDismiss={closeAddPeopleForm}>
          <AddPeopleForm
            availableUsers={usersNotInProject}
            onAdd={props.submitAddPeopleFormAndCloseIt}
            onCancel={closeAddPeopleForm}
            project={props.project}
          />
        </Modal>
      </ProjectPeopleWrapper>
    </Container>
  );
}

GeneralTab.propTypes = {
  project: PropTypes.object,
  isAddPeopleFormOpen: PropTypes.bool.isRequired,
  closeAddPeopleForm: PropTypes.func.isRequired,
  openAddPeopleForm: PropTypes.func.isRequired,
  submitAddPeopleFormAndCloseIt: PropTypes.func.isRequired,
  usersNotInProject: PropTypes.instanceOf(List).isRequired,
  updateProjectAttributesStatus: PropTypes.object.isRequired,
  updateProjectAttribute: PropTypes.func.isRequired,
  updateProjectAttributesErrorMsg: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  updateProjectAttributesStatus: makeSelectUpdateProjectAttributesStatus(),
  updateProjectAttributesErrorMsg: makeSelectUpdateProjectAttributesErrorMsg(),
});

const withConnect = connect(mapStateToProps, { updateProjectAttribute });

export default compose(
  withConnect,
)(injectIntl(GeneralTab));
