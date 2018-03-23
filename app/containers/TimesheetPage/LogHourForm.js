import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';

import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';

import { required, timeEntryFormat } from '../../support/forms/validation';
import TaskSelectionField from '../../components/TaskSelectionField';
import {
  LOG_HOUR_FORM,
} from './constants';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { CLOSE, OPEN } from '../../utils/constants';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-left: 20%;
  margin-right: 20%;
`;

const FormTitle = styled.div`
`;

const FormActions = styled.div`
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  text-align: center;
`;

const FormAction = styled.button`
  font-size: 1.1rem;
  width: 100%;
`;

const FormActionWrapper = styled.div`
  width: 100%;
`;

const submissionHook = (onSubmit, reportedDay) => (values) => {
  const newValues = values
    .delete('projectId')
    .set('reportedDay', reportedDay);
  onSubmit(newValues);
};

const renderProjectOptions = (formProjects) => (
  formProjects.map((project) => (
    <option
      key={project.get('projectId')}
      value={project.get('projectId')}
    >
      {project.get('code')}
    </option>
  ))
);

class LogHourForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.closeDeleteRecordConfirmDialog = this.closeDeleteRecordConfirmDialog.bind(this);
    this.deleteTimeRecord = this.deleteTimeRecord.bind(this);
    this.confirmTimeRecordDeletion = this.confirmTimeRecordDeletion.bind(this);
  }

  componentWillMount() {
    this.props.loadFormProjects();
  }

  componentDidMount() {
    if (this.props.initialValues) {
      // Project is already selected. Load activities now
      this.props.loadFormActivities(this.props.initialValues.get('projectId'));
    }
  }

  handleProjectChange(e) {
    const selectedProjectId = e.target.value;
    this.props.loadFormActivities(selectedProjectId);
  }

  closeDeleteRecordConfirmDialog() {
    this.props.deleteConfirmationDialogCallback(CLOSE);
  }

  deleteTimeRecord() {
    this.props.onDeleteRecord(this.props.initialValues.get('trId'), this.props.date);
    this.props.deleteConfirmationDialogCallback(CLOSE);
  }

  confirmTimeRecordDeletion() {
    this.props.deleteConfirmationDialogCallback(OPEN);
  }

  render() {
    const {
      error,
      onSubmit,
      handleSubmit,
      submitting,
      isTaskOverlaySelectOpened,
      onDismissTaskOverlaySelect,
      onSelectTaskClicked,
      onNewTaskSelected,
      formProjects,
      onDismissForm,
      date,
      initialValues,
      values,
    } = this.props;

    const isEdition = !!initialValues;

    if (!date) {
      onDismissForm();
    }

    const taskDisabled = !(values && values.get('projectId'));
    const durationAndCommentDisabled = !(values && values.get('taskId'));

    return (
      <Wrapper>
        <ConfirmationDialog
          message="Are you sure you want to delete this record?"
          onCancel={this.closeDeleteRecordConfirmDialog}
          onConfirm={this.deleteTimeRecord}
          isActive={this.props.isDeleteConfirmationDialogOpened}
        />

        <form onSubmit={handleSubmit(submissionHook(onSubmit, date))}>
          <FormTitle><H1>{`${isEdition ? 'Edit Time' : 'Add Time'}`}</H1></FormTitle>

          <Field
            name="projectId"
            id="projectId"
            component={SelectField}
            label="Your Projects"
            onChange={this.handleProjectChange}
            validate={[required]}
          >
            <option value="">Choose a project</option>
            { renderProjectOptions(formProjects) }
          </Field>

          <Field
            name="taskId"
            id="taskId"
            label="Your Tasks"
            component={TaskSelectionField}
            {...{ isTaskOverlaySelectOpened, onDismissTaskOverlaySelect, onSelectTaskClicked, onNewTaskSelected }}
            validate={[required]}
            optionGroups={this.props.taskOverlaySelectOptions.toJSON()}
            disabled={taskDisabled}
          />

          <Field
            name="reportedTime"
            id="reportedTime"
            component={InputField}
            validate={[required, timeEntryFormat]}
            label="How Long it last?"
            placeholder="Ex: 02:00, 1:20 etc."
            disabled={durationAndCommentDisabled}
          />

          <Field
            name="comment"
            id="comment"
            component={TextAreaField}
            validate={[required]}
            label="Comment"
            disabled={durationAndCommentDisabled}
          />

          {
            error &&
            <div className="control" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <article className="message is-danger">
                <div className="message-body">
                  { error }
                </div>
              </article>
            </div>
          }

          <FormActions>
            <FormActionWrapper className="control">
              <FormAction type="submit" className={`button is-primary ${submitting ? 'is-loading' : ''}`} disabled={submitting}>
                Submit
              </FormAction>
            </FormActionWrapper>
            {
              isEdition &&
                <FormAction type="button" className="button is-danger" disabled={submitting} onClick={this.confirmTimeRecordDeletion}>
                  Delete
                </FormAction>
            }
            <FormActionWrapper className="control">
              <FormAction className="button" type="button" onClick={onDismissForm}>Cancel</FormAction>
            </FormActionWrapper>
          </FormActions>
        </form>
      </Wrapper>
    );
  }
}

LogHourForm.propTypes = {
  error: PropType.any,
  handleSubmit: PropType.func,
  submitting: PropType.any.isRequired,
  onSubmit: PropType.func,
  isTaskOverlaySelectOpened: PropType.bool.isRequired,
  onDismissTaskOverlaySelect: PropType.func.isRequired,
  onSelectTaskClicked: PropType.func.isRequired,
  loadFormProjects: PropType.func.isRequired,
  formProjects: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    projectId: PropType.number.isRequired,
    name: PropType.string.isRequired,
    code: PropType.string.isRequired,
  })).isRequired,
  loadFormActivities: PropType.func.isRequired,
  taskOverlaySelectOptions: PropType.object.isRequired,
  onNewTaskSelected: PropType.func.isRequired,
  onDismissForm: PropType.func.isRequired,
  date: PropType.objectOf(Date).isRequired,
  initialValues: ImmutablePropTypes.contains({
    trId: PropType.number.isRequired,
    taskId: PropType.number.isRequired,
    projectId: PropType.number.isRequired,
    comment: PropType.string.isRequired,
    reportedTime: PropType.string.isRequired,
  }),
  onDeleteRecord: PropType.func.isRequired,
  isDeleteConfirmationDialogOpened: PropType.bool.isRequired,
  deleteConfirmationDialogCallback: PropType.func.isRequired,
  values: ImmutablePropTypes.map.isRequired,
};

const selector = formValueSelector(LOG_HOUR_FORM);
export default reduxForm({
  form: LOG_HOUR_FORM,
})(connect((state) => ({
  values: fromJS(selector(state, 'projectId', 'taskId')),
}))(LogHourForm));
