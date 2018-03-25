import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputField from 'components/InputField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage, injectIntl } from 'react-intl';

import { required } from '../../support/forms/validation';
import { NEW_ACTIVITY_FORM_ID } from './constants';
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

function NewActivityForm(props) {
  const { error, submitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew } = props;
  const { project, intl: { formatMessage } } = props;

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
        <FormTitle><H1>
          <FormattedMessage {... messages.newActivityFormTitle} />
        </H1></FormTitle>

        <Field
          name="name"
          id="name"
          component={InputField}
          label={formatMessage(messages.newActivityFormLabelName)}
          validate={[required]}
        />

        <Field
          name="description"
          id="description"
          component={TextAreaField}
          label={formatMessage(messages.newActivityFormLabelDescription)}
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
            <FormAction className="button" type="button" disabled={submitting} onClick={handleSubmit((formData) => myOnSubmit(formData, onSaveAndAddNew))}>
              <FormattedMessage {... messages.newActivityFormButtonSaveAndAddNew} />
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction type="submit" className={`button is-primary ${submitting ? 'is-loading' : ''}`} disabled={submitting}>
              <FormattedMessage {... messages.newActivityFormButtonAnd} />
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction className="button" type="button" onClick={onCancel}>
              <FormattedMessage {... messages.newActivityFormButtonCancel} />
            </FormAction>
          </FormActionWrapper>
        </FormActions>
      </form>
    </Wrapper>
  );
}

NewActivityForm.propTypes = {
  error: PropTypes.any,
  submitting: PropTypes.any.isRequired,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  onAdd: PropTypes.func,
  onSaveAndAddNew: PropTypes.func,
  project: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

export default reduxForm({
  form: NEW_ACTIVITY_FORM_ID,
})(injectIntl(NewActivityForm));
