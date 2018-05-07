import React from 'react';
import { mount } from 'enzyme';

import InlineLabelEdit from '../index';
import { STATE_EDITING } from '../../InlineEdit';

describe('<InlineLabelEdit />', () => {
  let onCommit;
  let onChange;
  let onDiscard;
  let value;
  let componentWrapper;

  const renderComponent = () => mount(
    <InlineLabelEdit
      state={STATE_EDITING}
      onStateChange={jest.fn()}
      {...{ onCommit, onChange, onDiscard, value }}
    />
  );

  beforeEach(() => {
    onCommit = jest.fn();
    onChange = jest.fn();
    onDiscard = jest.fn();
    value = 'my testing label initial value';
    componentWrapper = renderComponent();
  });

  it('renders the value', () => {
    expect(componentWrapper.html()).toMatchSnapshot();
    expect(componentWrapper.html()).toContain(value);
  });

  describe('when the value is changed in the input', () => {
    const newValue = 'my new testing label';

    beforeEach(() => {
      componentWrapper.find('input').simulate('change', { target: { value: newValue } });
    });

    it('callback onChange properly', () => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(newValue);
    });
  });

  // it('callbacks onStateChange with STATE_HOVERED on mouseEnter', () => {
  //   const componentWrapper = renderComponent();
  //   componentWrapper.simulate('mouseEnter');
  //   expect(onStateChanged).toHaveBeenCalledTimes(1);
  //   expect(onStateChanged).toHaveBeenLastCalledWith(STATE_HOVERED);
  // });
});
