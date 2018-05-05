import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import InlineEdit, { STATE_EDITING, STATE_SAVING } from '../index';

const renderComponent = (props = {}) => shallow(
  <InlineEdit onCommit={jest.fn()} renderEditComponent={jest.fn()} {...props} />
);

describe('<InlineEdit />', () => {
  describe('when in normal state', () => {
    it('renders', () => {
      const renderedComponent = renderComponent();
      expect(renderedComponent.html()).toMatchSnapshot();
    });

    it('becomes outlined on mouseEnter', () => {
      const renderedComponent = renderComponent();
      expect(renderedComponent).not.toHaveStyleRule('outline', /solid/);
      renderedComponent.simulate('mouseEnter');
      expect(renderedComponent).toHaveStyleRule('outline', /solid/);
    });
  });

  describe('when is hovered', () => {
    let renderedComponent;

    beforeEach(() => {
      renderedComponent = renderComponent();
      renderedComponent.simulate('mouseEnter');
    });

    it('renders outlined', () => {
      expect(renderedComponent).toHaveStyleRule('outline', /solid/);
      expect(renderedComponent.html()).toMatchSnapshot();
    });

    it('goes to editing state on click', () => {
      renderedComponent.simulate('click');
    });

    it('goes to normal state on mouseLeave', () => {
      expect(renderedComponent).toHaveStyleRule('outline', /solid/);
      expect(renderedComponent.html()).toMatchSnapshot();
    });

    it('removes outline when mouse leaves', () => {
      const renderedComponent = renderComponent();
      renderedComponent.simulate('mouseEnter');
      expect(renderedComponent).toHaveStyleRule('outline', /solid/);
      renderedComponent.simulate('mouseLeave');
      expect(renderedComponent).not.toHaveStyleRule('outline', /solid/);
    });
  });

  describe('when editing content', () => {
    it('renders itself outlined and calls renderEditComponent', () => {
      const renderEditComponent = jest.fn();
      const renderedComponent = renderComponent({ value: 'one', renderEditComponent });
      renderedComponent.simulate('click');
      expect(renderedComponent).toHaveStyleRule('outline', /solid/);
      expect(renderEditComponent.mock.calls.length).toBe(1);
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('content', 'one');
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('onCommit');
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('onDiscard');
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('onChange');
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('stateName', STATE_EDITING);
      expect(renderedComponent.html()).toMatchSnapshot();
    });
  });

  describe('when saving content', () => {
    it('renders', () => {
      const renderEditComponent = jest.fn();
      const renderedComponent = renderComponent({ value: 'one', displayEditElementWhenSaving: true, renderEditComponent });
      renderedComponent.simulate('click');
      expect(renderEditComponent.mock.calls.length).toBe(1);
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('stateName', STATE_EDITING);
      renderEditComponent.mock.calls[0][0].onChange('two');
      renderEditComponent.mock.calls[0][0].onCommit();
      renderedComponent.setProps({ saving: true });
      expect(renderedComponent).not.toHaveStyleRule('outline', /solid/);
      expect(renderEditComponent.mock.calls.length).toBe(2);
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('content', 'two');
      expect(renderEditComponent.mock.calls[0][0]).toHaveProperty('stateName', STATE_SAVING);
    })
  });


  describe('when receiving new value', () => {
    it('updates the content accordingly', () => {
      const renderedComponent = renderComponent({ value: 'one' });
      expect(renderedComponent.state().content).toBe('one');
      renderedComponent.setProps({ value: 'newValue' });
      expect(renderedComponent.state().content).toBe('newValue');
    });
  });

  // describe('when receiving new saving status', () => {
  //   it('updates the state accordingly', () => {
  //     const renderedComponent = renderComponent({ value: 'one' });
  //     expect(renderedComponent.state().content).toBe('one');
  //     renderedComponent.setProps({ value: 'newValue' });
  //     expect(renderedComponent.state().content).toBe('newValue');
  //     renderedComponent.setProps({ saving: true });
  //     expect(renderedComponent.state().name).toBe(STATE_SAVING);
  //   });
  // });

  // describe('contentChanged', () => {
  //   it('updates the state accordingly', () => {
  //     const renderedComponent = renderComponent({ value: 'one' });
  //     expect(renderedComponent.state().content).toBe('one');
  //     renderedComponent.instance().contentChanged('new');
  //     expect(renderedComponent.state().content).toBe('new');
  //   });
  // });

  // describe('hover', () => {
  //   describe('when state is already hovered', () => {
  //     it('updates the state accordingly', () => {

  //     });
  //   });

  //   describe('when state is not hovered', () => {

  //   });

  //   it('updates the state accordingly', () => {
  //     const renderedComponent = renderComponent({ value: 'one' });
  //     expect(renderedComponent.state().content).toBe('one');
  //     renderedComponent.instance().contentChanged('new');
  //     expect(renderedComponent.state().content).toBe('new');
  //   });
  // });
});
