import React, { useState, useEffect } from 'react';
import '../style/simonButton.scss';

function SimonButton({ color, activeId, id, step, handleAttempt, clickable }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (activeId === id) {
      setActive(true);
    }
    const timeout = setTimeout(() => {
      setActive(false);
    }, 500)

    return () => clearTimeout(timeout);
  }, [step])

  const handleClick = () => {
    if (clickable) {
      handleAttempt(id);
    }
  }

  return (
    <div className="simon-container">
      <button
        disabled={!clickable}
        className={`simon-button ${color} ${active ? "activated" : ""} ${clickable ? "clickable" : ""}`}
        onClick={handleClick}>
      </button>
    </div>
  )
}

export default SimonButton;
