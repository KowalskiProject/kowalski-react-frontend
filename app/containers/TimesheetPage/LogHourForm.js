import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { parse as parseQueryParam } from 'query-string';
import parse from 'date-fns/parse';
import ImmutablePropTypes from 'react-immutable-proptypes';

import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';

import { required, timeEntryFormat } from '../../support/forms/validation';
import TaskSelectionField from '../../components/TaskSelectionField';
import {
  LOG_HOUR_FORM,
} from './constants';

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

const submissionHook = (onSubmit, day) => (values) => {
  const newValues = values.set('day', day);
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
  }

  componentWillMount() {
    this.props.loadFormProjects();
  }

  handleProjectChange(e) {
    const selectedProjectId = e.target.value;
    this.props.loadFormActivities(selectedProjectId);
  }

  render() {
    const {
      history,
      error,
      onSubmit,
      handleSubmit,
      isSubmitting,
      isTaskOverlaySelectOpened,
      onDismissTaskOverlaySelect,
      onSelectTaskClicked,
      onNewTaskSelected,
      formProjects,
    } = this.props;

    const date = parse(parseQueryParam(history.location.search).date);

    return (
      <Wrapper>
        <form onSubmit={handleSubmit(submissionHook(onSubmit, date))}>
          <FormTitle><H1>Add Time</H1></FormTitle>

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
          />

          <Field
            name="duration"
            id="duration"
            component={InputField}
            validate={[required, timeEntryFormat]}
            label="How Long it last?"
            placeholder="blabla"
          />

          <Field
            name="description"
            id="description"
            component={TextAreaField}
            validate={[required]}
            label="Description"
          />

          {error && <strong>{error}</strong>}

          <FormActions>
            <FormActionWrapper className="control">
              <FormAction type="submit" className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting}>
                Submit
              </FormAction>
            </FormActionWrapper>
            <FormActionWrapper className="control">
              <FormAction className="button" type="button" onClick={() => history.push('/')}>Cancel</FormAction>
            </FormActionWrapper>
          </FormActions>
        </form>
      </Wrapper>
    );
  }
}

LogHourForm.propTypes = {
  history: PropType.object,
  error: PropType.any,
  handleSubmit: PropType.func,
  isSubmitting: PropType.any,
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
};

export default reduxForm({
  form: LOG_HOUR_FORM,
})(LogHourForm);
