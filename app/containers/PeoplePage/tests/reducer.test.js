import peoplePageReducer from '../reducer';

describe('peoplePageReducer', () => {
  it('returns the initial state', () => {
    expect(peoplePageReducer(undefined, {})).toMatchSnapshot();
  });
});
