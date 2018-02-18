import React from 'react';
import PropTypes from 'prop-types';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  expandTaskListItem as expandTaskListItemAction,
  collapseTaskListItem as collapseTaskListItemAction,
  launchNewTaskDialog as launchNewTaskDialogAction,
} from './actions';
import { makeSelectExpandedTaskIds } from './selectors';

const renderTasks = (tasks) => (
  (tasks || List()).map((task) => (
    <tr>
      <td>{task.get('name')}</td>
      <td>{task.get('accountable') ? task.get('accountable').get('name') : 'Undefined'}</td>
      <td>{task.description}</td>
    </tr>
  ))
);

const renderActivityCardContent = ({ activity, onCreateNewTaskClicked, project }) => (
  <div className="card-content">
    <div className="content">
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Owner</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          { renderTasks(activity.tasks) }
          <tr>
            <td colSpan={3}><a tabIndex={0} role="button" onClick={() => onCreateNewTaskClicked(activity, project)}>+ Create new task</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

renderActivityCardContent.propTypes = {
  activity: PropTypes.any,
  onCreateNewTaskClicked: PropTypes.func,
  project: PropTypes.any,
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
              : expandTaskListItem(activity.get('activityId'))
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
