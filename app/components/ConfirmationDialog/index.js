/**
*
* ConfirmationDialog
*
*/

import React from 'react';
import PropTypes from 'prop-types';

function ConfirmationDialog({ message, onCancel, onConfirm, isActive }) {
  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirmation</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          { message }
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={onConfirm}>Confirm</button>
          <button className="button" onClick={onCancel}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default ConfirmationDialog;
