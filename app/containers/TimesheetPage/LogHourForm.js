import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';

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

function LogHourForm(props) {
  const { history, error, handleSubmit, submitting } = props;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <FormTitle><H1>Add Time</H1></FormTitle>

        <Field
          name="project"
          id="project"
          component={SelectField}
          label="Your Projects"
          options={[{ label: 'Choose a project' }, { label: 'Project A' }, { label: 'Project B' }]}
        />

        <Field
          name="activities"
          id="activities"
          component={SelectField}
          label="Activities"
          options={[{ label: 'Choose an activity' }, { label: 'Activity A' }, { label: 'Activity B' }]}
        />

        <Field
          name="howLongItLast"
          id="howLongItLast"
          component={InputField}
          label="How Long it last?"
          placeholder="blabla"
        />

        <Field
          name="description"
          id="description"
          component={TextAreaField}
          label="Description"
        />

        {error && <strong>{error}</strong>}

        <FormActions>
          <FormActionWrapper className="control">
            <FormAction type="submit" className="button is-primary" disabled={submitting}>Submit</FormAction>
          </FormActionWrapper>
          <FormActionWrapper className="control">
            <FormAction className="button" onClick={() => history.push('/')}>Cancel</FormAction>
          </FormActionWrapper>
        </FormActions>
      </form>
    </Wrapper>
  );
}

LogHourForm.propTypes = {
  history: PropType.object,
  error: PropType.any,
  handleSubmit: PropType.func,
  submitting: PropType.boolean,
};

export default reduxForm({
  form: 'logHourForm',
})(LogHourForm);
