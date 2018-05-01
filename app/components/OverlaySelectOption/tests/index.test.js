import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import OverlaySelectOption from '../index';

const mountComponent = (selectedOption) => mount(
  <OverlaySelectOption {...{ selectedOption }}>
    Some text
  </OverlaySelectOption>
);

describe('<OverlaySelectOption />', () => {
  let renderedComponent;
  describe('when the option is selected', () => {
    beforeEach(() => {
      renderedComponent = mountComponent(true);
    });

    it('Renders one anchor tag blue colored', () => {
      expect(renderedComponent.html()).toMatchSnapshot();
      const anchors = renderedComponent.find('a');
      expect(anchors.length).toEqual(1);
      expect(anchors.first()).toHaveStyleRule('color', 'blue');
    });
  });

  describe('when the option is not selected', () => {
    beforeEach(() => {
      renderedComponent = mountComponent(false);
    });

    it('Renders one anchor not blue colored', () => {
      expect(renderedComponent.html()).toMatchSnapshot();
      const anchors = renderedComponent.find('a');
      expect(anchors.length).toEqual(1);
      expect(anchors.first()).not.toHaveStyleRule('color', 'blue');
    });
  });
});
