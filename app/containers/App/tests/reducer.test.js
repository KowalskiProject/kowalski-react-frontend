import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  savePageBeforeAuthError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      currentUser: false,
      pageBeforeAuthError: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the savePageBeforeAuthError action correctly', () => {
    const expectedResult = state.set('pageBeforeAuthError', 'previous/path');
    expect(appReducer(state, savePageBeforeAuthError('previous/path'))).toEqual(expectedResult);
  });
});
