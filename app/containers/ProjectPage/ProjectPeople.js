import React from 'react';
import styled from 'styled-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Loadable';
import { userCanAccess } from '../../support/auth/utils';
import { ADD } from '../../support/auth/resources';
import AddPeopleForm from './AddPeopleForm';
import PeopleFlexGrid from '../../components/PeopleFlexGrid';

const ProjectPeopleWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-top: 2rem;
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

function ProjectPeople({
  sectionTitle,
  addPeopleBtnText,
  onAddPeopleFormOpen,
  addPeopleFormOpened,
  onAddPeopleFormDismiss,
  onAddPeopleFormSubmit,
  availableUsers,
  people,
  projectId,
}) {
  return (
    <ProjectPeopleWrapper>
      <ProjectPeopleHeader>
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          <h4> {sectionTitle} </h4>
        </div>
        {
          userCanAccess(ADD.PERSON_TO_PROJECT) &&
            <AddPeopleButton className="button primary-button" onClick={onAddPeopleFormOpen}>
              { addPeopleBtnText }
            </AddPeopleButton>
        }
      </ProjectPeopleHeader>
      <ProjectPeopleContent>
        <PeopleFlexGrid people={people} />
      </ProjectPeopleContent>
      <Modal active={addPeopleFormOpened} onDismiss={onAddPeopleFormDismiss}>
        <AddPeopleForm
          availableUsers={availableUsers}
          onAdd={onAddPeopleFormSubmit}
          onCancel={onAddPeopleFormDismiss}
          projectId={projectId}
        />
      </Modal>
    </ProjectPeopleWrapper>
  );
}

ProjectPeople.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  addPeopleBtnText: PropTypes.string.isRequired,
  onAddPeopleFormOpen: PropTypes.func.isRequired,
  addPeopleFormOpened: PropTypes.bool.isRequired,
  onAddPeopleFormDismiss: PropTypes.func.isRequired,
  onAddPeopleFormSubmit: PropTypes.func.isRequired,
  availableUsers: ImmutablePropTypes.list.isRequired,
  people: ImmutablePropTypes.list.isRequired,
  projectId: PropTypes.number.isRequired,
};

export default ProjectPeople;
