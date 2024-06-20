import React from "react";
import "./Navigation.css";
import { BsArrowLeft } from "react-icons/bs";

const Navigation = ({ hasArrow, onClick }) => {
  return (
    <div className="nav__wrapper">
      {hasArrow && (
        <button onClick={onClick} className="nav__button-back">
          <BsArrowLeft />
        </button>
      )}
      <span>Rekko</span>
    </div>
  );
};

export default Navigation;
