import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';
import { Field, reduxForm } from 'redux-form/immutable';

import { required } from '../../support/forms/validation';
import { NEW_TASK_FORM_ID } from './constants';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const FormTitle = styled.div`
`;

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
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

function NewTaskForm(props) {
  const { error, isSubmitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew } = props;
  const { activity, project, predefinedAccountableId } = props;

  const myOnSubmit = (formData, func) => {
    if (predefinedAccountableId) {
      formData = formData.set('accountableId', predefinedAccountableId);
    }

    return func(formData
      .set('project', project)
      .set('activityId', activity.get('activityId'))
    );
  };

  const people = project.get('people');

  return (
    <Wrapper className="box">
      <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
        <FormTitle><H1>Create new task</H1></FormTitle>

        <Field
          name="name"
          id="name"
          component={InputField}
          label="Task Name"
          validate={[required]}
        />

        {
          !predefinedAccountableId &&
            <Field
              name="accountableId"
              id="accountableId"
              component={SelectField}
              label="Project Members"
              validate={[required]}
            >
              <option value="">Select a person</option>
              {
                people.map((person) => (
                  <option key={person.get('kUserId')} value={person.get('kUserId')}>{person.get('name')}</option>
                ))
              }
            </Field>
        }


        <Field
          name="description"
          id="description"
          component={TextAreaField}
          label="Task Description"
          validate={[required]}
        />

        {
          error &&
          <div className="control" style={{ marginTop: '1rem' }}>
            <article className="message is-danger">
              <div className="message-body">
                { error }
              </div>
            </article>
          </div>
        }

        <FormActions>
          {
            onSaveAndAddNew &&
              <FormActionWrapper className="control">
                <FormAction className="button" type="button" disabled={isSubmitting} onClick={handleSubmit((formData) => myOnSubmit(formData, onSaveAndAddNew))}>
                  Save and add new
                </FormAction>
              </FormActionWrapper>
          }
          <FormActionWrapper className="control">
            <FormAction type="submit" className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting}>
              { props.onAddText || 'Add' }
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction className="button" type="button" onClick={onCancel}>Cancel</FormAction>
          </FormActionWrapper>
        </FormActions>
      </form>
    </Wrapper>
  );
}

NewTaskForm.propTypes = {
  project: ImmutablePropTypes.mapContains({
    projectId: PropTypes.number.isRequired,
    people: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
      kUserId: PropTypes.number.isRequired,
    })),
  }).isRequired,
  activity: ImmutablePropTypes.mapContains({
    activityId: PropTypes.number.isRequired,
  }).isRequired,
  error: PropTypes.any,
  predefinedAccountableId: PropTypes.number,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  onAdd: PropTypes.func,
  onSaveAndAddNew: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onAddText: PropTypes.string,
};

export default reduxForm({
  form: NEW_TASK_FORM_ID,
})(NewTaskForm);
