import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import InputField from 'components/InputField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';

import { required } from '../../support/forms/validation';
import { NEW_PERSON_FORM_ID } from './constants';
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

function NewPersonForm(props) {
  const { error, isSubmitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew } = props;

  const myOnSubmit = (formData, func) => (
    func(formData
      .set('startDate', formatDate(new Date()))
      .set('endDate', formatDate(new Date()))
      .set('code', formData.get('name'))
    )
  );

  return (
    <Wrapper className="box">
      <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
        <FormTitle><H1>Create new project</H1></FormTitle>

        <Field
          name="name"
          id="name"
          component={InputField}
          label="Project Name"
          validate={[required]}
        />

        <Field
          name="description"
          id="description"
          component={TextAreaField}
          label="Project Description"
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
            <FormAction
              className="button"
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit((formData) => myOnSubmit(formData, onSaveAndAddNew))}
            >
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

NewPersonForm.propTypes = {
  error: PropType.any,
  isSubmitting: PropType.any,
  onCancel: PropType.func,
  handleSubmit: PropType.func,
  onAdd: PropType.func,
  onSaveAndAddNew: PropType.func,
};

export default reduxForm({
  form: NEW_PERSON_FORM_ID,
})(NewPersonForm);
