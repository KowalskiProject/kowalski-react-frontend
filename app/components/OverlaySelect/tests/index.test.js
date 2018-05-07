import React from 'react';
import { mount } from 'enzyme';

import OverlaySelect from '../index';
import OverlaySelectGroup from '../../OverlaySelectGroup';
import OverlaySelectGroupHeader from '../../OverlaySelectGroupHeader';
import OverlaySelectOption from '../../OverlaySelectOption';

describe('<OverlaySelect />', () => {
  let children;
  let onOptionSelect;
  let selectedOption;
  let title;
  let opened;
  let onDismiss;
  let renderedComponent;

  beforeEach(() => {
    onOptionSelect = jest.fn();
    onDismiss = jest.fn();
    title = 'My Select is here!';
  });

  const renderComponent = () => mount(
    <OverlaySelect {...{ onOptionSelect, selectedOption, title, opened, onDismiss }}>
      { children }
    </OverlaySelect>
  );

  describe('when opened', () => {
    beforeEach(() => {
      opened = true;
    });

    describe('when having some children', () => {
      beforeEach(() => {
        children = [
          <OverlaySelectGroup key={1}>
            <OverlaySelectGroupHeader title="teste" />
            <OverlaySelectOption value={1} />
          </OverlaySelectGroup>,
          <OverlaySelectGroup key={2}>
            <OverlaySelectGroupHeader title="teste2" />
            <OverlaySelectOption>2</OverlaySelectOption>
          </OverlaySelectGroup>,
        ];
        selectedOption = 2;
        renderedComponent = renderComponent();
      });

      it('renders', () => {
        expect(renderedComponent.html()).toMatchSnapshot();
        expect(renderedComponent.html()).toContain(title);
      });

      it('unmounts', () => {
        renderedComponent.unmount();
      });

      it('calls onDismiss on esc press', () => {
        renderedComponent.instance().dismissOnEsc({ keyCode: 10 });
        expect(onDismiss).not.toHaveBeenCalled();
        renderedComponent.instance().dismissOnEsc({ keyCode: 27 });
        expect(onDismiss).toHaveBeenCalled();
      });

      it('callbacks onOptionSelect when event is fired from children', () => {
        renderedComponent.find('a').first().simulate('click');
        expect(onOptionSelect).toHaveBeenCalledWith(1);
      });
    });

    describe('without children', () => {
      beforeEach(() => {
        children = [];
        renderedComponent = renderComponent();
      });

      it('renders', () => {
        expect(renderedComponent.html()).toMatchSnapshot();
        expect(renderedComponent.html()).toContain(title);
      });
    });
  });

  describe('when not opened', () => {
    beforeEach(() => {
      opened = false;
      renderedComponent = renderComponent();
    });

    it('does not render', () => {
      expect(renderedComponent.html()).toMatchSnapshot();
      expect(renderedComponent.html()).not.toContain(title);
    });
  });
});
