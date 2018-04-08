import React from 'react';
import { mount, shallow } from 'enzyme';

import Header from 'components/Header';
import TimesheetPage from 'containers/TimesheetPage';
import App from '../index';

const dummyBooleanFunction = () => true;
const dummyStringFunction = () => '';
const dummyIntlObject = { formatMessage: dummyStringFunction };
const templateProps = {
  navigateTo: dummyBooleanFunction,
  logout: dummyBooleanFunction,
  intl: dummyIntlObject,
};

describe('<App />', () => {
  it('should render the header', () => {
    const renderedComponent = mount(
      <App {... { ...templateProps, activePage: 'anything' }} />,
      { context: { router: {} } }
    );
    expect(renderedComponent.find(Header).length).toBe(1);
  });

  describe('when timesheet page is active', () => {
    it('should render the TimesheetPage component', () => {
      const renderedComponent = shallow(
        <App {... { ...templateProps, activePage: 'timesheet' }} />, {
          context: { router: {} },
        }
      );
      expect(renderedComponent.find(TimesheetPage).length).toBe(1);
    });
  });

  // it('should render some routes', () => {
  //   const renderedComponent = shallow(
  //     <App />
  //   );
  //   expect(renderedComponent.find(Route).length).not.toBe(0);
  // });
});
