import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { fromJS } from 'immutable';
import { IntlProvider, injectIntl } from 'react-intl';

import { ProjectPage } from '../index';
import { STATE_NORMAL } from '../../../components/InlineEdit';
import { translationMessages } from '../../../i18n';

describe('<ProjectPage />', () => {
  it('renders', () => {
    const ProjectPageWithIntl = injectIntl(ProjectPage);
    const renderedComponent = mount(
      <MemoryRouter initialEntries={['projects/23']}>
        <Route
          exact
          path="projects/:code"
          render={(props) => (
            <IntlProvider locale="en" messages={translationMessages.en}>
              <ProjectPageWithIntl
                {...props}
                projectCodes={fromJS([])}
                loadUsers={jest.fn()}
                loadingUsersError=""
                isAddPeopleFormOpen={false}
                closeAddPeopleForm={jest.fn()}
                openAddPeopleForm={jest.fn()}
                submitAddPeopleFormAndCloseIt={jest.fn()}
                usersNotInProject={fromJS([])}
                selectedProjectPeople={fromJS([])}
                loadProjectCodes={jest.fn()}
                updateField={jest.fn()}
                inlineProjectFormFields={fromJS({
                  name: { state: STATE_NORMAL, originalValue: 'test', value: 'test' },
                  description: { state: STATE_NORMAL, originalValue: 'test', value: 'test' },
                  startDate: { state: STATE_NORMAL, originalValue: null, value: null },
                  endDate: { state: STATE_NORMAL, originalValue: null, value: null },
                  code: { state: STATE_NORMAL, originalValue: null, value: null },
                  accountableId: { state: STATE_NORMAL, originalValue: null, value: null },
                })}
                updateProjectAttributesErrorMsg=""
                otherProjectClicked={jest.fn()}
                loadingProjectCodesError=""
                selectedTab={0}
                selectedTabChanged={jest.fn()}
                accountableOptions={[]}
                updateSelectedProjectId={jest.fn()}
                intl={{ formatMessage: jest.fn() }}
              />
            </IntlProvider>
          )
        }
        />
      </MemoryRouter>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
