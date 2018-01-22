import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { parse } from 'query-string';

import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';

import { required, timeEntryFormat } from '../../support/forms/validation';

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
  const { history, error, onSubmit, handleSubmit, isSubmitting } = props;
  const date = parse(history.location.search).date;
  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit((values) => {
          onSubmit(values.set('day', new Date(date)));
        })}
      >
        <FormTitle><H1>Add Time</H1></FormTitle>

        <Field
          name="project"
          id="project"
          component={SelectField}
          label="Your Projects"
          validate={[required]}
        >
          <option value="">Choose a project</option>
          <option value="Project A">Project A</option>
          <option value="Aroject B">Aroject B</option>
        </Field>

        <Field
          name="activities"
          id="activities"
          component={SelectField}
          label="Activities"
          validate={[required]}
        >
          <option value="">Choose an activity</option>
          <option value="Activity A">Activity A</option>
          <option value="Activity B">Activity B</option>
        </Field>

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

LogHourForm.propTypes = {
  history: PropType.object,
  error: PropType.any,
  handleSubmit: PropType.func,
  isSubmitting: PropType.any,
  onSubmit: PropType.func,
};

export default reduxForm({
  form: 'logHourForm',
})(LogHourForm);
