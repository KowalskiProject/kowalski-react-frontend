import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputField from 'components/InputField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';
import { Field, reduxForm } from 'redux-form/immutable';

import { required } from '../../support/forms/validation';
import { NEW_ACTIVITY_FORM_ID } from './constants';
import { formatDate } from '../../support/backend/formatters';

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

function NewActivityForm(props) {
  const { error, isSubmitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew } = props;
  const { project } = props;

  const myOnSubmit = (formData, func) => (
    func(formData
      .set('projectId', project.get('projectId'))
      .set('startDate', formatDate(new Date()))
      .set('endDate', formatDate(new Date()))
    )
  );

  return (
    <Wrapper className="box">
      <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
        <FormTitle><H1>Create new activity</H1></FormTitle>

        <Field
          name="name"
          id="name"
          component={InputField}
          label="Activity Name"
          validate={[required]}
        />

        <Field
          name="description"
          id="description"
          component={TextAreaField}
          label="Activity Description"
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
          <FormActionWrapper className="control">
            <FormAction className="button" type="button" disabled={isSubmitting} onClick={handleSubmit((formData) => myOnSubmit(formData, onSaveAndAddNew))}>
              Save and add new
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction type="submit" className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting}>
              Add
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

NewActivityForm.propTypes = {
  error: PropTypes.any,
  isSubmitting: PropTypes.any,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  onAdd: PropTypes.func,
  onSaveAndAddNew: PropTypes.func,
  project: PropTypes.object,
};

export default reduxForm({
  form: NEW_ACTIVITY_FORM_ID,
})(NewActivityForm);
