import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'immutable';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/Modal/Loadable';
import AddPeopleForm from './AddPeopleForm';
import PeopleFlexGrid from '../../components/PeopleFlexGrid';
import { userCanAccess } from '../../support/auth/utils';
import { ADD } from '../../support/auth/resources';
import messages from './messages';

const ProjectNameWrapper = styled.h3`
`;

const ProjectDescriptionWrapper = styled.div`
  margin-top: 1rem;
`;

const ProjectDescriptionHeader = styled.h4`
`;

const ProjectDescriptionContent = styled.div`
`;

const ProjectPeopleWrapper = styled.div`
  margin-top: 2rem;
  flex-grow: 1;
  display: flex;
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
  margin-top: 0.8rem;
  margin-right: 2rem;
  padding-right: 3rem;
  padding-top: 1rem;
`;

const AddPeopleButton = styled.button`
  margin-right: 2rem;
  margin-botton: 1rem;
  width:186px;
  height:50px !important;
  border-radius:2px;
  border:1px solid #654EA3;
  color: white;
`;

export default function GeneralTab(props) {
  const {
    project,
    isAddPeopleFormOpen,
    closeAddPeopleForm,
    usersNotInProject,
  } = props;

  if (!project) {
    return <div></div>;
  }

  return (
    <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
      <ProjectNameWrapper>
        {project.get('name')}
      </ProjectNameWrapper>
      <ProjectDescriptionWrapper>
        <ProjectDescriptionHeader>
          <FormattedMessage {... messages.generalTabProjectDescription} />
        </ProjectDescriptionHeader>
        <ProjectDescriptionContent>
          <p>{project.get('description')}</p>
        </ProjectDescriptionContent>
      </ProjectDescriptionWrapper>
      <ProjectPeopleWrapper>
        <ProjectPeopleHeader>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>

            <h4>
              <FormattedMessage {... messages.generalTabProjectPeople} />
            </h4>
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
    </div>
  );
}

GeneralTab.propTypes = {
  project: PropTypes.object,
  isAddPeopleFormOpen: PropTypes.bool.isRequired,
  closeAddPeopleForm: PropTypes.func.isRequired,
  openAddPeopleForm: PropTypes.func.isRequired,
  submitAddPeopleFormAndCloseIt: PropTypes.func.isRequired,
  usersNotInProject: PropTypes.instanceOf(List).isRequired,
};
