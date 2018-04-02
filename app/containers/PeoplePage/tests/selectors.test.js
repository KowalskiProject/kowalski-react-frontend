import { fromJS } from 'immutable';
import { selectPeoplePageDomain } from '../selectors';

describe('selectPeoplePageDomain', () => {
  it('selects the proper substate', () => {
    const peoplePage = fromJS({
      testing2: 'b',
    });
    const state = fromJS({
      testing: 'a',
      peoplePage,
    });
    expect(selectPeoplePageDomain(state)).toMatchSnapshot();
    expect(selectPeoplePageDomain(state)).toEqual(peoplePage);
  });
});
