import React from 'react';
import './Toggle.css';

const Toggle = ({ checked, onChange, disabled = false, label, id }) => {
  return (
    <div className="toggle-container">
      {label && <label htmlFor={id} className="toggle-label">{label}</label>}
      <div className={`toggle-switch ${disabled ? 'disabled' : ''}`}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="toggle-input"
        />
        <label htmlFor={id} className="toggle-slider">
          <span className="toggle-button"></span>
        </label>
      </div>
      <span className={`toggle-status ${checked ? 'active' : 'inactive'}`}>
        {checked ? 'Ativo' : 'Inativo'}
      </span>
    </div>
  );
};

export default Toggle;