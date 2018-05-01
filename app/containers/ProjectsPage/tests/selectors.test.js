import { fromJS } from 'immutable';
import { selectProjectsPageDomain } from '../selectors';

describe('selectProjectsPageDomain', () => {
  it('selects the proper substate', () => {
    const state = fromJS({
      testing: 'a',
      projectspage: {
        testing2: 'b',
      },
    });
    expect(selectProjectsPageDomain(state)).toMatchSnapshot();
  });
});
