import React from 'react';
import { shallow } from 'enzyme';

import InlineTextEdit, { TextArea } from '../index';
import { STATE_EDITING } from '../../InlineEdit';

describe('<InlineTextEdit />', () => {
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
    <InlineTextEdit
      onStateChange={jest.fn()}
      {...{ onCommit, onChange, onDiscard, options, placeholderMsg, notSetMsg, state, value }}
    />
  );

  beforeEach(() => {
    onCommit = jest.fn();
    onChange = jest.fn();
    onDiscard = jest.fn();
    placeholderMsg = jest.fn();
    notSetMsg = 'Not set';
    options = jest.fn();
    state = STATE_EDITING;
    value = 'text test';
    componentWrapper = renderComponent();
  });

  it('render', () => {
    expect(componentWrapper.html()).toMatchSnapshot();
    expect(componentWrapper.html()).toContain(value);
  });

  it('callbacks properly onChange', () => {
    const newValue = 'text xest';
    componentWrapper.dive().find(TextArea).simulate('change', { target: { value: newValue } });
    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange.mock.calls[0][0]).toEqual(newValue);
  });

  it('callbacks properly onCommit', () => {
    componentWrapper.dive().find(TextArea).simulate('blur');
    expect(onCommit.mock.calls.length).toEqual(1);
  });
});
