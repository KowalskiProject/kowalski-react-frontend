import React from 'react';
import { shallow } from 'enzyme';
import Flatpickr from 'react-flatpickr';

import InlineDateEdit, { refCallback } from '../index';
import { STATE_EDITING, STATE_NORMAL } from '../../InlineEdit';
import { formatDate } from '../../../support/backend/formatters';

jest.useFakeTimers();

describe('<InlineDateEdit />', () => {
  let onCommit;
  let value;
  let component;
  let onStateChange;
  let onDiscard;
  let onChange;

  const renderComponent = () => shallow(
    <InlineDateEdit
      state={STATE_EDITING}
      {...{ onCommit, value, onStateChange, onDiscard, onChange }}
    />
  );

  beforeEach(() => {
    onCommit = jest.fn();
    onStateChange = jest.fn();
    onDiscard = jest.fn();
    onChange = jest.fn();
    value = formatDate(new Date(2014, 1, 1));
    component = renderComponent();
  });

  it('renders the datepicker', () => {
    expect(component.html()).toMatchSnapshot();
  });

  it('processes ref callback accordingly', () => {
    refCallback(null);
    refCallback({});

    const focus = jest.fn();
    refCallback({ node: { focus } });
    expect(focus).toHaveBeenCalled();
  });

  describe('when editing', () => {
    it('callbacks onChange correctly', () => {
      component.dive().find(Flatpickr).simulate('change', [value]);
      expect(onChange.mock.calls.length).toEqual(1);
      expect(onChange.mock.calls[0][0]).toEqual(value);
      expect(onCommit.mock.calls.length).toEqual(1);
    });

    it('callbacks onDiscard correctly', () => {
      component.dive().find(Flatpickr).simulate('close', [value]);
      jest.runAllTimers();
      expect(onDiscard.mock.calls.length).toEqual(1);
      expect(onStateChange.mock.calls.length).toEqual(1);
      expect(onStateChange.mock.calls[0][0]).toEqual(STATE_NORMAL);
    });
  });
});
