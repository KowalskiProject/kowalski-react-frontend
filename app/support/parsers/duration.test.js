import parseAmountOfHours from './duration';

describe('parseAmountOfHours()', () => {
  it('should parse duration expressions properly', () => {
    [
      ['3:0', 3.0],
      ['1:30', 1.5],
      ['4:45', 4.75],
      ['1:0', 1.0],
    ].forEach(([durationExp, expectedDurationInHours]) => {
      expect(parseAmountOfHours(durationExp)).toEqual(expectedDurationInHours);
    });
  });
});
