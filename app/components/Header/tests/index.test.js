import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../index';
import { mockLocalStorage, unmockLocalStorage } from '../../../support/tests/stub';

describe('<Header />', () => {
  beforeEach(mockLocalStorage);
  afterEach(unmockLocalStorage);

  it('should render 3 divs', () => {
    const renderedComponent = shallow(
      <Header
        onTimesheetClicked={jest.fn()}
        onProjectsClicked={jest.fn()}
        onPeopleClicked={jest.fn()}
        onLogoutClicked={jest.fn()}
        activePage="timesheet"
      />
    );
    expect(renderedComponent.find('div').length).toEqual(3);
  });
});
