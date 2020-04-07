import React from 'react';
import '../style/modal.scss';

function Modal({ active, attempts, close }) {

  const handleClose = () => {
    close();
  }

  return (
    <div className="modal">
      <div onClick={handleClose} className={`modal-background ${active ? "show-modal" : ""}`}></div>
      <div className={`modal-dialog ${active ? "show-dialog" : ""}`}>
        <h2>Game Over</h2>
        <h3>Your score: {attempts}</h3>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}

export default Modal;
