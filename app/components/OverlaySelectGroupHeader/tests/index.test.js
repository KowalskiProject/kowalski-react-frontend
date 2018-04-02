import React from 'react';
import { mount } from 'enzyme';
import OverlaySelectGroupHeader from '../index';

describe('<OverlaySelectGroupHeader />', () => {
  it('Expect render h4 element', () => {
    const renderedComponent = mount(
      <OverlaySelectGroupHeader>
        Some text
      </OverlaySelectGroupHeader>
    );
    expect(renderedComponent.find('h4').length).toEqual(1);
  });
});
