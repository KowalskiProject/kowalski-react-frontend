import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import FaSearch from 'react-icons/lib/fa/search';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/Modal/Loadable';
import NewTaskForm from './NewTaskForm';
import NewActivityForm from './NewActivityForm';
import {
  changedActivitiesTextFilter as changedActivitiesTextFilterAction,
  launchNewTaskDialog as launchNewTaskDialogAction,
  dismissNewTaskDialog as dismissNewTaskDialogAction,
  submitNewTaskFormAndCloseIt as submitNewTaskFormAndCloseItAction,
  launchNewActivityDialog as launchNewActivityDialogAction,
  dismissNewActivityDialog as dismissNewActivityDialogAction,
  submitNewActivityForm as submitNewActivityFormAction,
  submitNewActivityFormAndCloseIt as submitNewActivityFormAndCloseItAction,
  submitNewTaskForm as submitNewTaskFormAction,
} from './actions';
import {
  makeSelectActivityFilteringText,
  makeSelectIsNewTaskFormDialogOpened,
  makeSelectActivityLoadedIntoNewTaskForm,
  makeSelectProjectLoadedIntoNewTaskForm,
  makeSelectIsNewActivityFormDialogOpened,
  makeSelectIsSubmittingNewActivity,
  makeSelectIsSubmittingNewTask,
} from './selectors';
import ActivityListItem from './ActivityListItem';
import { userCanAccess } from '../../support/auth/utils';
import { ADD } from '../../support/auth/resources';
import messages from './messages';

const Container = styled.div`
  padding-top: 2rem;
  padding-right: 3rem;
  padding-left: 3rem;
  display: flex;
  flex-direction: column;
`;

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;

`;

const NewActivityButton = styled.button`
  width:226px;
  height:50px!important;
  border-radius:2px;
  border:1px solid #654EA3;
  margin-left: 1rem;
  color:white;
`;

const ActivityListContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ActivityContainer = styled.div`
`;

const renderActivities = (project, term) => {
  // TODO key must be activitiy ID -> will be fetched from server in the future
  if (!project) {
    return <div></div>;
  }

  return project.get('activities')
    .filter((activity) => activity.get('name').includes(term))
    .map((activity) => (
      <ActivityContainer key={activity.get('activityId')}>
        <ActivityListItem activity={activity} project={project} />
      </ActivityContainer>
    ));
};

const Input = styled.input`
  width: 600px;
  height: 22px;
`;

const ActivitiesTab = (props) => {
  const { project, changedActivitiesTextFilter, activityFilteringText, launchNewActivityDialog } = props;
  return (
    <Container className="activitieTabWrapper">
      <ToolbarContainer>
        <div className="field">
          <div className="control has-icons-right">
            <Input
              type="text"
              className="input"
              value={activityFilteringText}
              cols="60"
              onChange={(evt) => changedActivitiesTextFilter(evt.target.value)}
            />
            <span className="icon is-small is-right">
              <FaSearch />
            </span>
          </div>

        </div>

        {
          userCanAccess(ADD.ACTIVITY_TO_PROJECT) &&
            <NewActivityButton className="button primary-button" onClick={() => launchNewActivityDialog(project)}>
              <FormattedMessage {... messages.activitiesTabButtonAddActivity} />
            </NewActivityButton>
        }
      </ToolbarContainer>
      <ActivityListContainer className="activitieWrapper">
        { renderActivities(project, activityFilteringText) }
      </ActivityListContainer>
      <Modal active={props.isNewActivityFormDialogOpened} onDismiss={props.dismissNewActivityDialog}>
        <NewActivityForm
          project={project}
          onAdd={props.submitNewActivityFormAndCloseIt}
          onSaveAndAddNew={props.submitNewActivityForm}
          onCancel={props.dismissNewActivityDialog}
        />
      </Modal>
      <Modal active={props.isNewTaskFormDialogOpened} onDismiss={props.dismissNewTaskDialog}>
        {
          props.isNewTaskFormDialogOpened &&
          <NewTaskForm
            project={project}
            activity={props.activityLoadedIntoNewTaskForm}
            onAdd={props.submitNewTaskFormAndCloseIt}
            onSaveAndAddNew={props.submitNewTaskForm}
            onCancel={props.dismissNewTaskDialog}
          />
        }
      </Modal>
    </Container>
  );
};

ActivitiesTab.propTypes = {
  project: PropTypes.any,
  changedActivitiesTextFilter: PropTypes.func,
  activityFilteringText: PropTypes.any,
  activityLoadedIntoNewTaskForm: PropTypes.object,
  submitNewActivityFormAndCloseIt: PropTypes.func,
  submitNewTaskForm: PropTypes.func,
  submitNewTaskFormAndCloseIt: PropTypes.func,
  submitNewActivityForm: PropTypes.func,
  isSubmittingNewActivity: PropTypes.bool,
  dismissNewActivityDialog: PropTypes.func,
  isNewTaskFormDialogOpened: PropTypes.bool,
  dismissNewTaskDialog: PropTypes.func,
  isNewActivityFormDialogOpened: PropTypes.bool,
  launchNewActivityDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activityFilteringText: makeSelectActivityFilteringText(),
  isNewTaskFormDialogOpened: makeSelectIsNewTaskFormDialogOpened(),
  activityLoadedIntoNewTaskForm: makeSelectActivityLoadedIntoNewTaskForm(),
  projectLoadedIntoNewTaskForm: makeSelectProjectLoadedIntoNewTaskForm(),
  isNewActivityFormDialogOpened: makeSelectIsNewActivityFormDialogOpened(),
  isSubmittingNewActivity: makeSelectIsSubmittingNewActivity(),
  isSubmittingNewTask: makeSelectIsSubmittingNewTask(),
});

export default connect(mapStateToProps, {
  launchNewTaskDialog: launchNewTaskDialogAction,
  dismissNewTaskDialog: dismissNewTaskDialogAction,
  submitNewTaskForm: submitNewTaskFormAction,
  submitNewTaskFormAndCloseIt: submitNewTaskFormAndCloseItAction,
  launchNewActivityDialog: launchNewActivityDialogAction,
  dismissNewActivityDialog: dismissNewActivityDialogAction,
  submitNewActivityForm: submitNewActivityFormAction,
  submitNewActivityFormAndCloseIt: submitNewActivityFormAndCloseItAction,
  changedActivitiesTextFilter: changedActivitiesTextFilterAction,
})(ActivitiesTab);
