import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { TimesheetPage } from '../index';
import { translationMessages } from '../../../i18n';

describe('<TimesheetPage />', () => {
  it('renders', () => {
    const renderedComponent = mount(
      <MemoryRouter>
        <IntlProvider locale="en" messages={translationMessages.en}>
          <TimesheetPage
            selectedDate={new Date()}
            selectedRange={[new Date(), new Date()]}
            closeTaskOverlaySelect={jest.fn()}
            openTaskOverlaySelect={jest.fn()}
            updateCachedSelectDate={jest.fn()}
            loadTimeRecordsForWeekDate={jest.fn()}
            isLoadingTimeRecords={false}
            loadFormProjects={jest.fn()}
            formProjects={{}}
            loadFormActivities={jest.fn()}
            launchNewTaskDialog={jest.fn()}
            dismissNewTaskDialog={jest.fn()}
            isTaskDialogOpen={false}
            submitNewTaskFormAndCloseIt={jest.fn()}
            updateSelectedDate={jest.fn()}
            navigateTo={jest.fn()}
            deleteTimeRecord={jest.fn()}
            deleteTimeRecordConfirmDialogOpened={false}
            changeTimeRecordDeleteConfirmDialogOpeness={jest.fn()}
            match={{ url: '' }}
            intl={{ formatMessage: jest.fn() }}
          />
        </IntlProvider>
      </MemoryRouter>
    );
    expect(renderedComponent.html()).toMatchSnapshot();
  });
});
