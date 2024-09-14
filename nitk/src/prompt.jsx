import React, { useState } from 'react';
import './Prompt.css'; // Import the CSS file

const Prompt = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Don't render the prompt if it's not open

  return (
    <div className="prompt-overlay">
      <div className="prompt-container">
        <h2>Prompt Title</h2>
        <p>Are you sure you want to proceed?</p>
        <div className="prompt-buttons">
          <button className="confirm-button" onClick={onConfirm}>Confirm</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
