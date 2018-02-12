import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import FaSearch from 'react-icons/lib/fa/search';
import { changedActivitiesTextFilter } from './actions';
import { makeSelectActivityFilteringText } from './selectors';
import ActivityListItem from './ActivityListItem';

const Container = styled.div`
  padding-top: 2rem;
  padding-right: 3rem;
  padding-left: 3rem;
  display: flex;
  flex-direction: column;
`;

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NewActivityButton = styled.button`
  margin-left: 1rem;
`;

const ActivityListContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ActivityContainer = styled.div`
`;

const renderActivities = (activities, term) => (
  // TODO key must be activitiy ID -> will be fetched from server in the future
  activities
    .filter(({title}) => title.includes(term))
    .map((activity, index) => (
      <ActivityContainer key={activity.title}>
        <ActivityListItem activity={activity} />
      </ActivityContainer>
    ))
);

const Input = styled.input`
  width: 400px;
`;

const ActivitiesTab = (props) => {
  const { project, changedActivitiesTextFilter, activityFilteringText } = props;

  return (
    <Container>
      <ToolbarContainer>
        <div className="field">
          <div className="control has-icons-right">
            <Input
              type="text"
              className="input"
              value={activityFilteringText}
              cols="60"
              onChange={(evt) => changedActivitiesTextFilter(evt.target.value)}
            />
            <span className="icon is-small is-right">
              <FaSearch />
            </span>
          </div>

        </div>

        <NewActivityButton className="button">Add activity</NewActivityButton>
      </ToolbarContainer>
      <ActivityListContainer>
        { renderActivities(project.activities, activityFilteringText) }
      </ActivityListContainer>
    </Container>
  )
};

const mapStateToProps = createStructuredSelector({
  activityFilteringText: makeSelectActivityFilteringText(),
});

export default connect(mapStateToProps, { changedActivitiesTextFilter })(ActivitiesTab);
