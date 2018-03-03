import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';

import { required, email } from '../../support/forms/validation';
import { NEW_PERSON_FORM_ID } from './constants';

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

const PhotoUploadContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PictureContainer = styled.div`
  margin-top: 32px;
  height: 175px;
  width: 175px;
  border: 1px solid black;
`;

const UploadButtonContainer = styled.div`
  margin-bottom: -32px;
`;

const HelpUploadPictureInstructions = styled.span`
  display: block;
  font-size: 0.7rem;
`;

const UploadButton = styled.a`
  width: 100%;
  display: table;
`;

function NewPersonForm(props) {
  const { error, isSubmitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew } = props;
  const myOnSubmit = (formData, func) => (
    func(formData.delete('role')) // TEMP
  );

  return (
    <Wrapper className="box">
      <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
        <FormTitle><H1>Add person</H1></FormTitle>

        <div className="tile is-ancestor">
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child" style={{ display: 'flex' }}>
              <PhotoUploadContainer>
                <PictureContainer>
                </PictureContainer>
                <UploadButtonContainer>
                  <UploadButton className="button">
                    <FaCloudUpload />
                    <br />
                    <span>Choose a file</span>
                  </UploadButton>
                  <HelpUploadPictureInstructions>
                    Your file must be in .jpeg or .png format
                  </HelpUploadPictureInstructions>
                </UploadButtonContainer>
              </PhotoUploadContainer>
            </div>
          </div>
          <div className="tile is-8 is-vertical">
            <div className="tile is-parent">
              <div className="tile is-child">
                <Field
                  name="username"
                  id="username"
                  component={InputField}
                  label="Username"
                  validate={[required]}
                />
              </div>
              <div className="tile is-child">
                <Field
                  name="role"
                  id="role"
                  component={SelectField}
                  label="Role"
                >
                  <option value="">Select a Role</option>
                  <option value="PM">Project Manager</option>
                  <option value="DEV">Developer</option>
                  <option value="AUD">Auditor</option>
                  <option value="ADMIN">Administrator</option>
                </Field>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <Field
                  name="name"
                  id="name"
                  component={InputField}
                  label="Name"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <Field
                  name="email"
                  id="email"
                  component={InputField}
                  label="Email"
                  validate={[required, email]}
                />
              </div>
            </div>
          </div>
        </div>

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
