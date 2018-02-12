import React from 'react';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { expandTaskListItem, collapseTaskListItem } from './actions';
import { makeSelectExpandedTaskIds } from './selectors';

const ActivityListItem = (props) => {
  const { activity, expandedTaskIds } = props;
  const { expandTaskListItem, collapseTaskListItem} = props;
  const isExpanded = expandedTaskIds.includes(activity.id);

  return (
    <div className="card">
      <header className="card-header">
        <a
          className="card-header-icon"
          aria-label="activity details"
          onClick={
            () => isExpanded
              ? collapseTaskListItem(activity.id)
              : expandTaskListItem(activity.id)
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
          {activity.title}
        </p>
      </header>
      { isExpanded && <div className="card-content">
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
          <br />
        </div>
      </div> }
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  expandedTaskIds: makeSelectExpandedTaskIds(),
});

export default connect(
  mapStateToProps, { expandTaskListItem, collapseTaskListItem }
)(ActivityListItem);
