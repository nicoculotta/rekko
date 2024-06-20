import React from "react";
import "./Button.css";

const Button = ({ children, onClick, variant, icon }) => {
  return (
    <button className={`button button__${variant}`} onClick={onClick}>
      {icon && <span className="button__icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
