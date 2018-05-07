import React from 'react';
import { mount } from 'enzyme';

import Modal from '../index';

describe('<Modal />', () => {
  let modalText;
  let onDismiss;
  let active;
  let renderedComponent;

  beforeEach(() => {
    modalText = 'teste';
    onDismiss = jest.fn();
  });

  const renderComponent = () => mount(
    <Modal active={active} onDismiss={onDismiss}>
      { modalText }
    </Modal>
  );

  describe('when it is active', () => {
    beforeEach(() => {
      active = true;
      renderedComponent = renderComponent();
    });

    it('renders', () => {
      expect(renderedComponent.html()).toMatchSnapshot();
    });

    it('unmounts', () => {
      renderedComponent.unmount();
    });

    it('dismisses on esc key press', () => {
      renderedComponent.instance().dismissOnEsc({ keyCode: 10 });
      expect(onDismiss).not.toHaveBeenCalled();
      renderedComponent.instance().dismissOnEsc({ keyCode: 27 });
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe('when it is not active', () => {
    beforeEach(() => {
      active = false;
      renderedComponent = renderComponent();
    });

    it('does not render', () => {
      expect(renderedComponent.html()).toMatchSnapshot();
    });
  });
});
