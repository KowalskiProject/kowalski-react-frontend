/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */

import defaultSaga from '../saga';
import { collectAllYields } from '../../../support/tests/sagas';

const generator = defaultSaga();

describe('Project Page sagas', () => {
  describe('defaultSaga Saga', () => {
    let readableActionTypes = [];

    beforeEach(() => {
      readableActionTypes = collectAllYields(generator);
    });

    it('generate only takeEvery effects', () => {
      expect(readableActionTypes.every((action) => action.FORK.fn.name.startsWith('takeEvery'))).toBeTruthy();
    });
  });


  // TODO add tests for all individual saga generators
});
