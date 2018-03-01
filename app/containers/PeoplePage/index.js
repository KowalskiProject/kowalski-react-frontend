/**
 *
 * PeoplePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Modal from 'components/Modal/Loadable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPeoplePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import NewPersonForm from './NewPersonForm';

const MainContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const margins = `
  margin-top: 2rem;
  margin-left: 4rem;
  margin-right: 4rem;
`;

const TitleBar = styled.div`
  ${margins}
  display: flex;
  flex-basis: 100%;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  display: block;
  font-weight:300px;
`;

const AddPersonButton = styled.button`
  width:226px;
  height:50px !important;
  border-radius:2px;
  border:1px solid #654EA3;
  color: #654EA3;
`;

const PersonListWrapper = styled.div`
  ${margins}
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export class PeoplePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      openNewPersonForm,
      closeNewPersonForm,
      isNewPersonFormOpen,
    } = this.props;

    return (
      <MainContainerWrapper className="kowalski-react-basic-container">
        <Helmet>
          <title>PeoplePage</title>
          <meta name="description" content="Description of PeoplePage" />
        </Helmet>
        <TitleBar>
          <PageTitle>People</PageTitle>
          <AddPersonButton className="button" onClick={openNewPersonForm}>Add person</AddPersonButton>
        </TitleBar>
        <PersonListWrapper>
          { this.renderProjectsPanel() }
        </PersonListWrapper>
        <Modal active={isNewPersonFormOpen} onDismiss={closeNewPersonForm}>
          <NewPersonForm
            onAdd={this.props.submitNewPersonFormAndCloseIt}
            onSaveAndAddNew={this.props.submitNewPersonForm}
            onCancel={closeNewPersonForm}
          />
        </Modal>
      </MainContainerWrapper>
    );
  }
}

PeoplePage.propTypes = {
  openNewPersonForm: PropTypes.func,
  closeNewPersonForm: PropTypes.func,
  isNewPersonFormOpen: PropTypes.bool,
  submitNewPersonFormAndCloseIt: PropTypes.func,
  submitNewPersonForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  peoplepage: makeSelectPeoplePage(),
});

const withConnect = connect(mapStateToProps, actions);
const withReducer = injectReducer({ key: 'peoplePage', reducer });
const withSaga = injectSaga({ key: 'peoplePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PeoplePage);
