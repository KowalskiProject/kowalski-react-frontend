import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckboxGroup from 'components/CheckboxGroup/Loadable';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { List } from 'immutable';

import { ADD_PEOPLE_FORM_ID } from './constants';
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
  width: 150px;
`;

const AddPeopleCheckboxElement = styled.div`
  width: 250px;
  padding-top: 6px;
  padding-botton: 6px;
`;

const AddPeopleCheckbox = ({ input, label }) => (
  <AddPeopleCheckboxElement>
    <label htmlFor={input.id} className="checkbox">
      <input type="checkbox" {...input} />
      {` ${label}`}
    </label>
  </AddPeopleCheckboxElement>
);

AddPeopleCheckbox.propTypes = {
  input: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
};

function AddPeopleForm(props) {
  const { error, submitting, onCancel, handleSubmit, onAdd } = props;
  const { project, availableUsers } = props;

  const addPeopleOptions = availableUsers.map((user) => ({
    label: user.get('name'),
    value: user.get('kUserId'),
  })).toJS();

  const myOnSubmit = (formData, func) => (
    func(
      formData
        .delete('role') // Temporary -> role has still to be added in the backend
        .set('projectId', project.get('projectId'))
    )
  );

  return (
    <Wrapper className="box">
      <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
        <FormTitle><H1>
          <FormattedMessage {... messages.generalTabProjectAddPeople} />
        </H1></FormTitle>

        <p>
          <FormattedMessage {... messages.generalTabSelectOneOrMorePeople} />
        </p>

        <CheckboxGroup options={addPeopleOptions} component={AddPeopleCheckbox} name="people" />

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
            <FormAction type="submit" className={`button is-primary ${submitting ? 'is-loading' : ''}`} disabled={submitting}>
              <FormattedMessage {... messages.generalTabAddPeopleFormButtonAdd} />
            </FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction className="button" type="button" onClick={onCancel}>
              <FormattedMessage {... messages.generalTabAddPeopleFormButtonCancel} />
            </FormAction>
          </FormActionWrapper>
        </FormActions>
      </form>
    </Wrapper>
  );
}

AddPeopleForm.propTypes = {
  project: PropTypes.any.isRequired,
  error: PropTypes.any,
  submitting: PropTypes.any.isRequired,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  onAdd: PropTypes.func,
  availableUsers: PropTypes.instanceOf(List).isRequired,
};

export default reduxForm({
  form: ADD_PEOPLE_FORM_ID,
})(AddPeopleForm);
