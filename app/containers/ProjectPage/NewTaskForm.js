import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage, injectIntl } from 'react-intl';

import messages from './messages';
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
  const { error, submitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew } = props;
  const { activity, project, predefinedAccountableId, intl: { formatMessage } } = props;

  const myOnSubmit = (formData, func) => (
    func(formData
      .set('project', project)
      .updateIn(['accountableId'], (accountableId) => predefinedAccountableId || accountableId)
      .set('activityId', activity.get('activityId'))
    )
  );

  const people = project.get('people');

  return (
    <Wrapper className="box">
      <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
        <FormTitle><H1>{formatMessage(messages.newTaskFormTitle)}</H1></FormTitle>

        <Field
          name="name"
          id="name"
          component={InputField}
          label={formatMessage(messages.newTaskLabelName)}
          validate={[required]}
        />

        {
          !predefinedAccountableId &&
            <Field
              name="accountableId"
              id="accountableId"
              component={SelectField}
              label={formatMessage(messages.newTaskLabelAccountableId)}
              validate={[required]}
            >
              <option value="">{formatMessage(messages.newTaskSelectAccountableId)}</option>
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
          placeholder={formatMessage(messages.newTaskLabelDescriptionPlaceholder)}
          component={TextAreaField}
          label={formatMessage(messages.newTaskLabelDescription)}
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
                <FormAction className="button" type="button" disabled={submitting} onClick={handleSubmit((formData) => myOnSubmit(formData, onSaveAndAddNew))}>
                  <FormattedMessage {... messages.newTaskButtonSaveAndAddNew} />
                </FormAction>
              </FormActionWrapper>
          }
          <FormActionWrapper className="control">
            <FormAction type="submit" className={`button is-primary ${submitting ? 'is-loading' : ''}`} disabled={submitting}>
              { props.onAddText || formatMessage(messages.newTaskButtonAdd) }
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction className="button" type="button" onClick={onCancel}>
              <FormattedMessage {... messages.newTaskButtonCancel} />
            </FormAction>
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
  submitting: PropTypes.bool.isRequired,
  onAddText: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

export default reduxForm({
  form: NEW_TASK_FORM_ID,
})(injectIntl(NewTaskForm));
