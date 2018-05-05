import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../index';
import { mockLocalStorage, unmockLocalStorage } from '../../../support/tests/stub';

const renderComponent = () => (
  shallow(
    <Header
      onTimesheetClicked={jest.fn()}
      onProjectsClicked={jest.fn()}
      onPeopleClicked={jest.fn()}
      onLogoutClicked={jest.fn()}
      activePage="timesheet"
    />
  )
);

describe('<Header />', () => {
  beforeEach(mockLocalStorage);
  afterEach(unmockLocalStorage);

  it('should render 3 divs', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.find('div').length).toEqual(3);
  });

  it('should support expanding and collapsing user menu', () => {
    const renderedComponent = renderComponent();

    renderedComponent.instance().expandUserDropdown();
    expect(renderedComponent.state('dropDownExpanded')).toBeTruthy();
    renderedComponent.instance().collapseUserDropdown();
    expect(renderedComponent.state('dropDownExpanded')).toBeFalsy();
  });
});
