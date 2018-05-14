import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import FaPencil from 'react-icons/lib/fa/pencil';
import { ClipLoader } from 'react-spinners';

import InlineEdit, { STATE_EDITING, STATE_SAVING, STATE_NORMAL, STATE_HOVERED } from '../index';
import EditActions from '../EditActions';

describe('<InlineEdit />', () => {
  let onCommit;
  let onChange;
  let onDiscard;
  let placeholderMsg;
  let renderEditComponent;
  let notSetMsg;
  let onStateChanged;
  let tooltipText;
  let state;
  let value;
  let renderedComponent;

  const renderComponent = () => mount(
    <InlineEdit
      {...{
        onCommit,
        onChange,
        onDiscard,
        placeholderMsg,
        notSetMsg,
        state,
        value,
        onStateChanged,
        tooltipText,
      }}
    >
      { renderEditComponent }
    </InlineEdit>
  );

  beforeEach(() => {
    onCommit = jest.fn();
    onChange = jest.fn();
    onDiscard = jest.fn();
    placeholderMsg = 'placeholderMsg';
    renderEditComponent = jest.fn();
    notSetMsg = 'notSetMsg';
    onStateChanged = jest.fn();
    tooltipText = 'click for editing';
  });

  describe('when in normal state', () => {
    beforeEach(() => { state = STATE_NORMAL; });

    describe('when with empty value', () => {
      beforeEach(() => {
        value = '';
        renderedComponent = renderComponent();
      });

      it('renders not set message', () => {
        expect(renderedComponent.html()).toContain(notSetMsg);
      });
    });

    describe('when with non empty value', () => {
      beforeEach(() => {
        value = 'something';
        renderedComponent = renderComponent();
      });

      it('renders the value with an outline', () => {
        expect(renderedComponent.html()).toMatchSnapshot();
        expect(renderedComponent.html()).toContain(value);
        expect(renderedComponent).not.toHaveStyleRule('outline', /solid/);
      });

      it('do not render children', () => {
        expect(renderEditComponent).not.toBeCalled();
      });

      it('does not render edit actions component', () => {
        expect(renderedComponent.find(EditActions).length).toBe(0);
      });

      describe('when mouse is entered', () => {
        beforeEach(() => { renderedComponent.simulate('mouseEnter'); });

        it('callbacks onStateChange with STATE_HOVERED', () => {
          expect(onStateChanged).toBeCalledWith(STATE_HOVERED);
        });
      });
    });
  });

  describe('when in hovered state', () => {
    beforeEach(() => {
      value = 'something';
      state = STATE_HOVERED;
      renderedComponent = renderComponent();
    });

    it('renders with an outline', () => {
      expect(renderedComponent.html()).toMatchSnapshot();
      expect(renderedComponent).toHaveStyleRule('outline', /solid/);
    });

    it('does not render children', () => {
      expect(renderEditComponent).not.toBeCalled();
    });

    it('renders a pencil icon but not a loading one', () => {
      expect(renderedComponent.find(ClipLoader).length).toBe(0);
      expect(renderedComponent.find(FaPencil).length).toBe(1);
    });

    it('does not render edit actions component', () => {
      expect(renderedComponent.find(EditActions).length).toBe(0);
    });

    describe('when mouse is left', () => {
      beforeEach(() => { renderedComponent.simulate('mouseLeave'); });

      it('callbacks onStateChange with STATE_NORMAL', () => {
        expect(onStateChanged).toBeCalledWith(STATE_NORMAL);
      });
    });

    describe('when mouse is turned down', () => {
      beforeEach(() => { renderedComponent.simulate('mouseDown'); });

      it('callbacks onStateChange with STATE_EDITING', () => {
        expect(onStateChanged).toBeCalledWith(STATE_EDITING);
      });
    });
  });

  describe('when in edit state', () => {
    beforeEach(() => {
      value = 'something';
      state = STATE_EDITING;
      renderedComponent = renderComponent();
    });

    it('renders with an outline', () => {
      expect(renderedComponent.html()).toMatchSnapshot();
      expect(renderedComponent).toHaveStyleRule('outline', /solid/);
    });

    it('renders children', () => {
      expect(renderEditComponent).toBeCalled();
    });

    it('renders edit actions component', () => {
      expect(renderedComponent.find(EditActions).length).toBe(1);
    });
  });

  describe('when in saving state', () => {
    beforeEach(() => {
      value = 'something';
      state = STATE_SAVING;
      renderedComponent = renderComponent();
    });

    it('renders a loading icon but not a pencil one', () => {
      expect(renderedComponent.find(ClipLoader).length).toBe(1);
      expect(renderedComponent.find(FaPencil).length).toBe(0);
    });

    it('renders value in italic', () => {
      const textContainer = renderedComponent.findWhere((node) => node.text() === value).last();
      expect(textContainer).toHaveStyleRule('font-style', 'italic');
    });

    it('does not render children', () => {
      expect(renderEditComponent).not.toBeCalled();
    });

    it('does not render edit actions component', () => {
      expect(renderedComponent.find(EditActions).length).toBe(0);
    });
  });
});
