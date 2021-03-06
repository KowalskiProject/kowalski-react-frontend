import React from 'react';
import PropTypes from 'prop-types';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import {
  expandTaskListItem as expandTaskListItemAction,
  collapseTaskListItem as collapseTaskListItemAction,
  launchNewTaskDialog as launchNewTaskDialogAction,
} from './actions';
import { makeSelectExpandedTaskIds } from './selectors';
import { userCanAccess } from '../../support/auth/utils';
import { ADD } from '../../support/auth/resources';
import messages from './messages';

const renderTasks = (tasks) => (
  (tasks || List()).map((task) => (
    <tr key={task.get('taskId')}>
      <td>{task.get('name')}</td>
      <td>{task.get('accountable') ? task.get('accountable').get('name') : 'Undefined'}</td>
      <td>{task.get('description')}</td>
    </tr>
  ))
);

const renderActivityCardContent = ({ activity, onCreateNewTaskClicked }) => (
  <div className="card-content">
    <div className="content">
      <table className="table">
        <thead>
          <tr>
            <th><FormattedMessage {... messages.activitiesTabTask} /></th>
            <th><FormattedMessage {... messages.activitiesOwner} /></th>
            <th><FormattedMessage {... messages.activitiesDescription} /></th>
          </tr>
        </thead>
        <tbody>
          { renderTasks(activity.get('tasks')) }
          {
            userCanAccess(ADD.TASK_TO_PROJECT) &&
              <tr>
                <td colSpan={3}><a tabIndex={0} role="button" onClick={() => onCreateNewTaskClicked(activity)}>
                  <FormattedMessage {... messages.activitiesTabCreateNewTask} />
                </a></td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
);

renderActivityCardContent.propTypes = {
  activity: PropTypes.any,
  onCreateNewTaskClicked: PropTypes.func,
};

const ActivityListItem = (props) => {
  const { activity, expandedActivityIds, project } = props;
  const { expandTaskListItem, collapseTaskListItem, launchNewTaskDialog } = props;
  const isExpanded = expandedActivityIds.includes(activity.get('activityId'));

  return (
    <div className="card">
      <header className="card-header">
        <a
          role="button"
          tabIndex={0}
          className="card-header-icon"
          aria-label="activity details"
          onClick={
            () => isExpanded
              ? collapseTaskListItem(activity.get('activityId'))
              : expandTaskListItem(activity.get('activityId'), activity.get('projectId'), project.get('people'))
          }
        >
          <span className="icon">
            {
              isExpanded
                ? <FaAngleUp />
                : <FaAngleDown />
            }
          </span>
        </a>
        <p className="card-header-title">
          {activity.get('name')}
        </p>
      </header>
      {
        isExpanded && renderActivityCardContent(
          { onCreateNewTaskClicked: launchNewTaskDialog, project, activity }
        )
      }
    </div>
  );
};

ActivityListItem.propTypes = {
  activity: PropTypes.any,
  project: PropTypes.any,
  expandedActivityIds: PropTypes.objectOf(List),
  expandTaskListItem: PropTypes.func,
  collapseTaskListItem: PropTypes.func,
  launchNewTaskDialog: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  expandedActivityIds: makeSelectExpandedTaskIds(),
});

export default connect(
  mapStateToProps, {
    expandTaskListItem: expandTaskListItemAction,
    collapseTaskListItem: collapseTaskListItemAction,
    launchNewTaskDialog: launchNewTaskDialogAction,
  }
)(ActivityListItem);
