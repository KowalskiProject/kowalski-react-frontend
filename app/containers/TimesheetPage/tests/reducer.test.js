
import timesheetPageReducer from '../reducer';

describe('timesheetPageReducer', () => {
  it('returns the initial state', () => {
    expect(timesheetPageReducer(undefined, {})).toMatchSnapshot();
  });
});
