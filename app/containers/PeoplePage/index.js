/**
 *
 * PeoplePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { RingLoader } from 'react-spinners';  // eslint-disable-line import/no-unresolved
import { FormattedMessage, injectIntl } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Modal from 'components/Modal/Loadable';
import NewPersonForm from './NewPersonForm';

import {
  makeSelectPeople,
  makeSelectIsNewPersonFormOpen,
  makeSelectIsLoadingPeople,
  makeSelectLoadingPeopleErrorMsg,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import PeopleFlexGrid from '../../components/PeopleFlexGrid';
import { userCanAccess } from '../../support/auth/utils';
import { ADD } from '../../support/auth/resources';
import messages from './messages';
import NoResourcesIndication from '../../components/NoResourcesIndication';

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
`;

export class PeoplePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.startPeopleLoading();
  }

  renderPeoplePanel() {
    const {
      isLoadingPeople,
      loadingPeopleErrorMsg,
      people,
      personSelected,
      intl: { formatMessage },
    } = this.props;

    if (isLoadingPeople) {
      return <RingLoader />;
    } else if (loadingPeopleErrorMsg) {
      return (
        <article className="message is-danger">
          <div className="message-body">
            { loadingPeopleErrorMsg }
          </div>
        </article>
      );
    } else if (people.size === 0) {
      return <NoResourcesIndication resourceName={formatMessage(messages.resourceNamePlural)} />;
    }

    return (
      <PeopleFlexGrid {... { people, personSelected }} />
    );
  }


  render() {
    const {
      openNewPersonForm,
      closeNewPersonForm,
      isNewPersonFormOpen,
      intl: { formatMessage },
    } = this.props;

    return (
      <MainContainerWrapper className="kowalski-react-basic-container">
        <Helmet>
          <title>{formatMessage(messages.title)}</title>
          <meta name="description" content={formatMessage(messages.description)} />
        </Helmet>
        <TitleBar>
          <PageTitle>
            <FormattedMessage {... messages.title} />
          </PageTitle>
          {
            userCanAccess(ADD.PERSON) &&
              <AddPersonButton className="button" onClick={openNewPersonForm}>
                <FormattedMessage {... messages.buttonAddPerson} />
              </AddPersonButton>
          }
        </TitleBar>
        <PersonListWrapper>
          { this.renderPeoplePanel() }
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
  openNewPersonForm: PropTypes.func.isRequired,
  closeNewPersonForm: PropTypes.func.isRequired,
  isNewPersonFormOpen: PropTypes.bool.isRequired,
  submitNewPersonFormAndCloseIt: PropTypes.func.isRequired,
  submitNewPersonForm: PropTypes.func.isRequired,
  startPeopleLoading: PropTypes.func.isRequired,
  people: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    kUserId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isLoadingPeople: PropTypes.bool.isRequired,
  personSelected: PropTypes.func.isRequired,
  loadingPeopleErrorMsg: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  people: makeSelectPeople(),
  isNewPersonFormOpen: makeSelectIsNewPersonFormOpen(),
  isLoadingPeople: makeSelectIsLoadingPeople(),
  loadingPeopleErrorMsg: makeSelectLoadingPeopleErrorMsg(),
});

const withConnect = connect(mapStateToProps, actions);
const withReducer = injectReducer({ key: 'peoplePage', reducer });
const withSaga = injectSaga({ key: 'peoplePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(PeoplePage));
