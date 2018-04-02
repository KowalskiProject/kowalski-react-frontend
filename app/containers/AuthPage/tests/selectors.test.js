import { fromJS } from 'immutable';
import { selectAuthPageDomain } from '../selectors';

describe('selectAuthPageDomain', () => {
  it('selects the proper substate', () => {
    const authpage = fromJS({
      testing2: 'b',
    });
    const state = fromJS({
      testing: 'a',
      authpage,
    });
    expect(selectAuthPageDomain(state)).toMatchSnapshot();
    expect(selectAuthPageDomain(state)).toEqual(authpage);
  });
});
