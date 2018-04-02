
import projectsPageReducer from '../reducer';

describe('projectsPageReducer', () => {
  it('returns the initial state', () => {
    expect(projectsPageReducer(undefined, {})).toMatchSnapshot();
  });
});
