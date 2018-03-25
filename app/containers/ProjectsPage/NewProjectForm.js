import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, FormattedMessage } from 'react-intl';
import InputField from 'components/InputField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';

import { required } from '../../support/forms/validation';
import { NEW_PROJECT_FORM_ID } from './constants';
import { formatDate } from '../../support/backend/formatters';
import messages from './messages';

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

function NewProjectForm(props) {
  const { error, submitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew, intl: { formatMessage } } = props;

  const myOnSubmit = (formData, func) => (
    func(formData
      .set('startDate', formatDate(new Date()))
      .set('endDate', formatDate(new Date()))
    )
  );

  return (
    <Wrapper className="box">
      <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
        <FormTitle><H1>{formatMessage(messages.newProjectFormTitle)}</H1></FormTitle>

        <Field
          name="code"
          id="code"
          component={InputField}
          label={formatMessage(messages.newProjectLabelCode)}
          validate={[required]}
          fieldStyle={{ width: '200px' }}
        />

        <Field
          name="name"
          id="name"
          component={InputField}
          label={formatMessage(messages.newProjectLabelName)}
          validate={[required]}
        />

        <Field
          name="description"
          id="description"
          component={TextAreaField}
          label={formatMessage(messages.newProjectLabelDescription)}
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
              disabled={submitting}
              onClick={handleSubmit((formData) => myOnSubmit(formData, onSaveAndAddNew))}
            >
              <FormattedMessage {... messages.newProjectButtonSaveAndAddNew} />
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction type="submit" className={`button is-primary ${submitting ? 'is-loading' : ''}`} disabled={submitting}>
              <FormattedMessage {... messages.newProjectButtonAdd} />
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction className="button" type="button" onClick={onCancel}>
              <FormattedMessage {... messages.newProjectButtonCancel} />
            </FormAction>
          </FormActionWrapper>
        </FormActions>
      </form>
    </Wrapper>
  );
}

NewProjectForm.propTypes = {
  error: PropType.any,
  submitting: PropType.any.isRequired,
  onCancel: PropType.func,
  handleSubmit: PropType.func,
  onAdd: PropType.func,
  onSaveAndAddNew: PropType.func,
  intl: PropType.object.isRequired,
};

export default reduxForm({
  form: NEW_PROJECT_FORM_ID,
})(injectIntl(NewProjectForm));
