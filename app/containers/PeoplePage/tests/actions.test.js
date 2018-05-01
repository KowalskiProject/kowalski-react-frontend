
import {
  startPeopleLoading,
} from '../actions';
import {
  START_PEOPLE_LOADING,
} from '../constants';

describe('PeoplePage actions', () => {
  describe('Start People Loading Action', () => {
    it('has a type of START_PEOPLE_LOADING', () => {
      const expected = {
        type: START_PEOPLE_LOADING,
      };
      expect(startPeopleLoading()).toEqual(expected);
    });
  });
});
