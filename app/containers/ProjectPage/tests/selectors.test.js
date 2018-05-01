import { fromJS } from 'immutable';
import { selectProjectPageDomain } from '../selectors';

describe('selectProjectPageDomain', () => {
  it('selects the proper substate', () => {
    const state = fromJS({
      testing: 'a',
      projectspage: {
        testing2: 'b',
      },
    });
    expect(selectProjectPageDomain(state)).toMatchSnapshot();
  });
});
