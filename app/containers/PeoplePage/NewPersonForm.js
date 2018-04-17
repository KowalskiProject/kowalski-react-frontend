import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FaCloudUpload from 'react-icons/lib/fa/cloud-upload';
import { FormattedMessage, injectIntl } from 'react-intl';

import InputField from 'components/InputField/Loadable';
import SelectField from 'components/SelectField/Loadable';

import { startFetchingNewPersonFormOptions } from './actions';
import { required, email } from '../../support/forms/validation';
import { NEW_PERSON_FORM_ID } from './constants';
import { makeSelectIsFetchingNewPersonFormOptions, makeSelectFetchingNewPersonFormOptionsErrorMsg, makeSelectRoles } from './selectors';
import LoadingCentralDiv from '../../components/LoadingCentralDiv';
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

class NewPersonForm extends React.Component {
  componentDidMount() {
    if (this.props.roles.size <= 0) {
      this.props.startFetchingNewPersonFormOptions();
    }
  }

  formatRole(roleId) {
    switch (roleId) {
      case 'MANAGER':
        return 'Manager';
      case 'USER':
        return 'User';
      case 'AUDITOR':
        return 'Auditor';
      case 'ADMIN':
        return 'Administrator';
      default:
        throw new Error(`Unknown role: ${roleId}`);
    }
  }

  renderRoles() {
    const { intl: { formatMessage } } = this.props;
    const options = [
      <option value="" key="select">
        <FormattedMessage {... messages.newPersonFormSelectARole} />
      </option>,
    ];
    return options.concat(this.props.roles.map((role) => (
      <option value={role} key={role}>
        {formatMessage(messages[`role${this.formatRole(role)}`])}
      </option>
    )));
  }

  render() {
    const { error, submitting, onCancel, handleSubmit, onAdd, onSaveAndAddNew } = this.props;
    const { intl: { formatMessage } } = this.props;
    const myOnSubmit = (formData, func) => (
      func(formData) // TEMP
    );

    if (this.props.isFetchingNewPersonFormOptions) {
      return <LoadingCentralDiv />;
    }

    return (
      <Wrapper className="box">
        <form onSubmit={handleSubmit((formData) => myOnSubmit(formData, onAdd))}>
          <FormTitle><H1>
            <FormattedMessage {... messages.newPersonFormTitle} />
          </H1></FormTitle>

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
                      <span>
                        <FormattedMessage {... messages.newPersonFormChooseAFile} />
                      </span>
                    </UploadButton>
                    <HelpUploadPictureInstructions>
                      <FormattedMessage {... messages.newPersonFormFileHelpText} />
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
                    label={formatMessage(messages.newPersonFormLabelUsername)}
                    validate={[required]}
                  />
                </div>
                <div className="tile is-child">
                  <Field
                    name="role"
                    id="role"
                    component={SelectField}
                    label={formatMessage(messages.newPersonFormLabelRole)}
                  >
                    { this.renderRoles() }
                  </Field>
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child">
                  <Field
                    name="name"
                    id="name"
                    component={InputField}
                    label={formatMessage(messages.newPersonFormLabelName)}
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
                    label={formatMessage(messages.newPersonFormLabelEmail)}
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
                disabled={submitting}
                onClick={handleSubmit((formData) => myOnSubmit(formData, onSaveAndAddNew))}
              >
                <FormattedMessage {... messages.newPersonFormButtonSaveAndAddNew} />
              </FormAction>
            </FormActionWrapper>
            <FormActionWrapper className="control">
              <FormAction type="submit" className={`button is-primary ${submitting ? 'is-loading' : ''}`} disabled={submitting}>
                <FormattedMessage {... messages.newPersonFormButtonAdd} />
              </FormAction>
            </FormActionWrapper>
            <FormActionWrapper className="control">
              <FormAction className="button" type="button" onClick={onCancel}>
                <FormattedMessage {... messages.newPersonFormButtonCancel} />
              </FormAction>
            </FormActionWrapper>
          </FormActions>
        </form>
      </Wrapper>
    );
  }
}

NewPersonForm.propTypes = {
  error: PropType.any,
  submitting: PropType.any.isRequired,
  onCancel: PropType.func,
  handleSubmit: PropType.func,
  onAdd: PropType.func,
  onSaveAndAddNew: PropType.func,
  isFetchingNewPersonFormOptions: PropType.bool.isRequired,
  roles: ImmutablePropTypes.listOf(PropType.string).isRequired,
  startFetchingNewPersonFormOptions: PropType.func.isRequired,
  intl: PropType.object.isRequired,
};

export default reduxForm({
  form: NEW_PERSON_FORM_ID,
})(connect(createStructuredSelector({
  isFetchingNewPersonFormOptions: makeSelectIsFetchingNewPersonFormOptions(),
  fetchingNewPersonFormOptionsErrorMsg: makeSelectFetchingNewPersonFormOptionsErrorMsg(),
  roles: makeSelectRoles(),
}), { startFetchingNewPersonFormOptions })(injectIntl(NewPersonForm)));
