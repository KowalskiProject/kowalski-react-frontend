import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { fromJS } from 'immutable';

import { ProjectPage } from '../index';

describe('<ProjectPage />', () => {
  it('renders', () => {
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['projects/23']}>
        <Route
          exact
          path="projects/:code"
          render={(props) => (
            <ProjectPage
              {...props}
              projectCodes={fromJS([])}
              loadUsers={jest.fn()}
              loadingUsersError=""
              isAddPeopleFormOpen={false}
              closeAddPeopleForm={jest.fn()}
              openAddPeopleForm={jest.fn()}
              submitAddPeopleFormAndCloseIt={jest.fn()}
              usersNotInProject={fromJS([])}
              loadProjectCodes={jest.fn()}
              updateSelectedProjectId={jest.fn()}
              intl={{ formatMessage: jest.fn() }}
            />
          )
        }
        />
      </MemoryRouter>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
