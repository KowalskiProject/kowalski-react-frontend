import { fromJS } from 'immutable';

import {
  selectGlobal,
  selectRoute,
  makeSelectCurrentUser,
  makeSelectLocation,
  makeSelectPageBeforeAuthError,
  makeSelectActivePage,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectCurrentUser', () => {
  const currentUserSelector = makeSelectCurrentUser();
  it('should select the current user', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      global: {
        currentUser: username,
      },
    });
    expect(currentUserSelector(mockedState)).toEqual(username);
  });
});

describe('selectRoute', () => {
  it('should select the route state', () => {
    const routeState = fromJS({});
    const mockedState = fromJS({
      route: routeState,
    });
    expect(selectRoute(mockedState)).toEqual(routeState);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.get('location').toJS());
  });
});

describe('makeSelectPageBeforeAuthError', () => {
  const pageBeforeAuthErrorSelector = makeSelectPageBeforeAuthError();
  it('should select page before auth error', () => {
    const pageBeforeAuthError = 'foo/bar';
    const mockedState = fromJS({
      global: {
        pageBeforeAuthError,
      },
    });
    expect(pageBeforeAuthErrorSelector(mockedState)).toEqual(pageBeforeAuthError);
  });
});


describe('makeSelectActivePage', () => {
  const activePageSelector = makeSelectActivePage();

  it('should return people when on a people page ', () => {
    let mockedState = fromJS({ route: { location: { pathname: '/test/people/something/else' } } });
    expect(activePageSelector(mockedState)).toEqual('people');
    mockedState = fromJS({ route: { location: { pathname: '/people' } } });
    expect(activePageSelector(mockedState)).toEqual('people');
  });

  it('should return timesheet when on a timesheet a page', () => {
    let mockedState = fromJS({ route: { location: { pathname: '/test/timesheet/something/else' } } });
    expect(activePageSelector(mockedState)).toEqual('timesheet');
    mockedState = fromJS({ route: { location: { pathname: '/timesheet' } } });
    expect(activePageSelector(mockedState)).toEqual('timesheet');
  });

  it('should return projects when on a projects page', () => {
    let mockedState = fromJS({ route: { location: { pathname: '/test/projects/something/else' } } });
    expect(activePageSelector(mockedState)).toEqual('projects');
    mockedState = fromJS({ route: { location: { pathname: '/projects' } } });
    expect(activePageSelector(mockedState)).toEqual('projects');
  });

  it('should throw an error when on a unmachable path', () => {
    const mockedState = fromJS({ route: { location: { pathname: 'something/else' } } });
    expect(() => activePageSelector(mockedState)).toThrowError(/Unmachable path/);
  });
});
