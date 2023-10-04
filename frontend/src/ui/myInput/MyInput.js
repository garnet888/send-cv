import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./myInput.scss";

const MyInput = ({
  id,
  name,
  placeholder,
  value,
  type = "",
  onChange,
  onBlur,
  touched,
  errorText,
  isTextarea = false,
  rows,
}) => {
  const [shownPassword, setShownPassword] = useState(false);

  const renderInput = (onPass) => {
    if (type === "password") {
      type = shownPassword ? "text" : "password";
    }

    return isTextarea ? (
      <textarea
        name={name}
        value={value}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
      />
    ) : (
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        className={onPass && "no-npt"}
      />
    );
  };

  return (
    <div className="myInput">
      {type === "password" ? (
        <div className="myInput__pass convert-npt">
          {renderInput(true)}

          <button
            className="no-btn"
            type="button"
            onClick={() => setShownPassword((val) => !val)}
          >
            {shownPassword ? (
              <FaEyeSlash size={18} color="darkgray" />
            ) : (
              <FaEye size={18} color="darkgray" />
            )}
          </button>
        </div>
      ) : (
        renderInput()
      )}

      {touched && errorText && (
        <label className="myInput__errorText">{errorText}</label>
      )}
    </div>
  );
};

export default MyInput;
