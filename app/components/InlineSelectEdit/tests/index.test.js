import React from 'react';
import { shallow } from 'enzyme';
import Select from 'react-select';

import InlineSelectEdit from '../index';
import InlineEdit, { STATE_EDITING, STATE_NORMAL } from '../../InlineEdit';

describe('<InlineSelectEdit />', () => {
  const onCommit = jest.fn();
  const onChange = jest.fn();
  const onDiscard = jest.fn();
  const placeholderMsg = 'placeholderMsg';
  const notSetMsg = 'notSetMsg';
  const options = [{ label: 'Abscsder', value: 'A' }, { label: 'Bytro', value: 'B' }];
  let state;
  let value;
  let componentWrapper;

  const renderComponent = () => shallow(
    <InlineSelectEdit
      onStateChanged={jest.fn()}
      {...{ onCommit, onChange, onDiscard, options, placeholderMsg, notSetMsg, state, value }}
    />
  );

  describe('when on normal state', () => {
    beforeEach(() => { state = STATE_NORMAL; });

    describe('when value is in provided options', () => {
      beforeEach(() => {
        value = options[0].value;
        componentWrapper = renderComponent();
      });

      it('renders the formatted value', () => {
        expect(componentWrapper.html()).toContain(options.find((v) => v.value === value).label);
      });
    });

    describe('when value is empty', () => {
      beforeEach(() => {
        value = '';
        componentWrapper = renderComponent();
      });

      it('renders not set msg', () => {
        expect(componentWrapper.html()).toMatchSnapshot();
        expect(componentWrapper.html()).toContain(notSetMsg);
      });
    });
  });

  describe('when on editing state', () => {
    beforeEach(() => { state = STATE_EDITING; });

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
        const newValue = options[1].value;

        beforeEach(() => {
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
