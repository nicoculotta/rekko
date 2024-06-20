import React from "react";
import "./Checkbox.css";

const Checkbox = ({ onClick, children, id }) => {
  return (
    <div className="checkbox__wrapper">
      <label className="checkbox">
        <input type="checkbox" onChange={onClick} id={id} />
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
