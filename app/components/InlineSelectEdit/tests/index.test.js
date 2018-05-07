import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';

import InlineSelectEdit from '../index';
import InlineEdit, { STATE_EDITING, STATE_NORMAL } from '../../InlineEdit';

describe('<InlineSelectEdit />', () => {
  let onCommit;
  let onChange;
  let onDiscard;
  let placeholderMsg;
  let notSetMsg;
  let options;
  let state;
  let value;
  let componentWrapper;

  const renderComponent = () => shallow(
    <InlineSelectEdit
      onStateChange={jest.fn()}
      {...{ onCommit, onChange, onDiscard, options, placeholderMsg, notSetMsg, state, value }}
    />
  );

  beforeEach(() => {
    onCommit = jest.fn();
    onChange = jest.fn();
    onDiscard = jest.fn();
    placeholderMsg = 'placeholderMsg';
    notSetMsg = 'notSetMsg';
    options = [{ label: 'Abscsder', value: 'A' }, { label: 'Bytro', value: 'B' }];
  });

  describe('when in normal mode', () => {
    beforeEach(() => {
      state = STATE_NORMAL;
    });

    describe('when value is within provided options', () => {
      beforeEach(() => {
        value = options[0].value;
        componentWrapper = renderComponent();
      });

      it('renders the formatted value', () => {
        expect(componentWrapper.html()).toContain(options[0].label);
      });
    });

    describe('when value is not within provided options', () => {
      beforeEach(() => {
        value = 'blabla';
        componentWrapper = renderComponent();
      });

      it('renders the not set msg', () => {
        expect(componentWrapper.html()).toContain(notSetMsg);
      });
    });
  });

  describe('when in editing mode', () => {
    beforeEach(() => {
      state = STATE_EDITING;
    });

    describe('when value is undefined', () => {
      beforeEach(() => {
        value = null;
        componentWrapper = renderComponent();
      });

      it('renders placeholder message', () => {
        expect(componentWrapper.html()).toMatchSnapshot();
        expect(componentWrapper.html()).toContain(placeholderMsg);
      });
    });

    describe('when value is within provided options', () => {
      beforeEach(() => {
        value = options[0].value;
        componentWrapper = renderComponent();
      });

      it('renders the formatted value', () => {
        expect(componentWrapper.html()).toMatchSnapshot();
        expect(componentWrapper.html()).toContain(options.find((v) => v.value === value).label);
      });

      describe('when the value is changed in the input', () => {
        let newValue;

        beforeEach(() => {
          newValue = options[1].value;
          componentWrapper.find(InlineEdit).dive().find(Select).simulate('change', { value: newValue });
        });

        it('callbacks onChange properly', () => {
          expect(onChange).toHaveBeenCalledTimes(1);
          expect(onChange).toHaveBeenLastCalledWith(newValue);
        });
      });
    });
  });
});
