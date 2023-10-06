import React from "react";
import "./myRadio.scss";

const MyRadio = ({ label, name, value, checked, onChange }) => {
  return (
    <div className="myRadio">
      <input
        className="myRadio-radio"
        id={label}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />

      <label className="myRadio-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default MyRadio;
