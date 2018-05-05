import React from 'react';
import { mount } from 'enzyme';
import Flatpickr from 'react-flatpickr';
import { format } from 'date-fns';

import InlineDateEdit, { onDatePickerChange, onDatePickerClose } from '../index';
import InlineEdit from '../../InlineEdit';

const renderComponent = ({ onCommit = jest.fn(), value, saving } = {}) => mount(
  <InlineDateEdit {...{ onCommit, value, saving }} />
);

jest.useFakeTimers();

describe('<InlineDateEdit />', () => {
  it('renders', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.html()).toMatchSnapshot();
  });

  describe('when saving', () => {
    it('renders', () => {
      const date = new Date(2014, 1, 1);
      const renderedComponent = renderComponent({ saving: true, value: format(date) });
      const inlineEditComponent = renderedComponent.find(InlineEdit);
      // Change state to 'editing'
      inlineEditComponent.simulate('click');
      expect(renderedComponent.html()).toMatchSnapshot();
    });
  });

  describe('when editing', () => {
    const date = new Date(2014, 1, 1);

    it('renders the datepicker', () => {
      const inlineDateComponent = renderComponent({ value: format(date) });
      const inlineEditComponent = inlineDateComponent.find(InlineEdit);
      // Change state to 'editing'
      inlineEditComponent.simulate('click');
      const datepicker = inlineDateComponent.find(Flatpickr);
      expect(datepicker.html()).toMatchSnapshot();
    });

    it('callbacks onChange correctly', () => {
      const onChange = jest.fn();
      const newValue = new Date(2014, 1, 1);
      onDatePickerChange(onChange)([newValue]);
      expect(onChange.mock.calls.length).toEqual(1);
      expect(onChange.mock.calls[0][0]).toEqual(newValue);
    });

    it('callbacks onCommit correctly', () => {
      const onCommit = jest.fn();
      onDatePickerClose(onCommit)();
      jest.runAllTimers();
      expect(onCommit.mock.calls.length).toEqual(1);
      expect(onCommit.mock.calls[0][0]).toEqual(undefined);
    });
  });
});
