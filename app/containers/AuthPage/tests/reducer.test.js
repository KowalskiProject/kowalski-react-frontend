import authPageReducer from '../reducer';

describe('authPageReducer', () => {
  it('returns the initial state', () => {
    expect(authPageReducer(undefined, {})).toMatchSnapshot();
  });
});
