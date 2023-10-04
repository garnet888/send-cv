import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

import "./authActions.scss";

const AuthActions = () => {
  const loginIcnRef = useRef(null);
  const navigate = useNavigate();

  const [visibleMenu, setVisibleMenu] = useState(false);

  const hangleClickOutside = useCallback((e) => {
    if (loginIcnRef.current && loginIcnRef.current.contains(e.target)) {
      setVisibleMenu((val) => !val);
    } else {
      setVisibleMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", hangleClickOutside);
  }, [hangleClickOutside]);

  return (
    <div className="authActions">
      <span className="authActions__buttons">
        <button onClick={() => navigate("/login")}>Нэвтрэх</button>
        <button className="outline-btn" onClick={() => navigate("/signup")}>
          Бүртгүүлэх
        </button>
      </span>

      <div className="authActions__onMobile">
        <button
          ref={loginIcnRef}
          className="no-btn authActions__onMobile-iconBtn"
        >
          <BiLogIn color="white" />
        </button>

        <div className={`headerMenu actions ${visibleMenu || "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              `headerMenu-item ${isActive && "active"}`
            }
            to="/login"
          >
            Нэвтрэх
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `headerMenu-item ${isActive && "active"}`
            }
            to="/signup"
          >
            Бүртгүүлэх
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AuthActions;
