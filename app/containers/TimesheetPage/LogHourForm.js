import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { parse as parseQueryParam } from 'query-string';
import parse from 'date-fns/parse';

import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import TextAreaField from 'components/TextAreaField/Loadable';

import { required, timeEntryFormat } from '../../support/forms/validation';
import TaskSelectionField from '../../components/TaskSelectionField';

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

function LogHourForm(props) {
  const {
    history,
    error,
    onSubmit,
    handleSubmit,
    isSubmitting,
    isTaskOverlaySelectOpened,
    onDismissTaskOverlaySelect,
    onSelectTaskClicked,
  } = props;
  const date = parse(parseQueryParam(history.location.search).date);

  const optionGroups = [
    {
      label: 'Group 1',
      options: [
        { label: 'Option 11', value: 'Option 11' },
        { label: 'Option 12', value: 'Option 12' },
        { label: 'Option 13', value: 'Option 13' },
      ],
    },
    {
      label: 'Group 2',
      options: [
        { label: 'Option 21', value: 'Option 21' },
        { label: 'Option 22', value: 'Option 22' },
        { label: 'Option 23', value: 'Option 23' },
      ],
    },
    {
      label: 'Group 3',
      options: [
        { label: 'Option 31', value: 'Option 31' },
        { label: 'Option 32', value: 'Option 32' },
        { label: 'Option 33', value: 'Option 33' },
      ],
    },
  ];

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(submissionHook(onSubmit, date))}>
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
          name="task"
          id="task"
          label="Your Tasks"
          component={TaskSelectionField}
          {...{ isTaskOverlaySelectOpened, onDismissTaskOverlaySelect, onSelectTaskClicked }}
          validate={[required]}
          optionGroups={optionGroups}
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

LogHourForm.propTypes = {
  history: PropType.object,
  error: PropType.any,
  handleSubmit: PropType.func,
  isSubmitting: PropType.any,
  onSubmit: PropType.func,
  isTaskOverlaySelectOpened: PropType.bool.isRequired,
  onDismissTaskOverlaySelect: PropType.func.isRequired,
  onSelectTaskClicked: PropType.func.isRequired,
};

export default reduxForm({
  form: 'logHourForm',
})(LogHourForm);
