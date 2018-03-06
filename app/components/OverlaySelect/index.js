/**
*
* OverlaySelect
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  position: fixed;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  opacity: 0.95;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OverlaySelectInnerContentContainer = styled.div`
  margin-top: 1rem;
`;

class OverlaySelect extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    document.addEventListener('keydown', this.dismissOnEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.dismissOnEsc, false);
  }

  dismissOnEsc = (event) => {
    if (event.keyCode === 27) {
      this.props.onDismiss();
    }
  };

  render() {
    const { title, children, opened, onOptionSelect, onDismiss, ...other } = this.props;

    if (!opened) {
      return <div></div>;
    }

    const wrappedOnOptionSelect = (value) => {
      onOptionSelect(value);
      this.props.onDismiss();
    };

    return (
      <Overlay>
        <h3>{title}</h3>
        <OverlaySelectInnerContentContainer>
          {React.Children.map(children, ((child) =>
            React.cloneElement(child, {
              onOptionSelect: wrappedOnOptionSelect,
              ...other,
            })
          ))}
        </OverlaySelectInnerContentContainer>
      </Overlay>
    );
  }
}

OverlaySelect.propTypes = {
  children: PropTypes.any,
  onOptionSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.any,
  title: PropTypes.string,
  opened: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default OverlaySelect;
