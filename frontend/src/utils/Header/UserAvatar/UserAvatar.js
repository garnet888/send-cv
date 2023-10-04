import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getFormattedName } from "../../../lib/Functions";
import Popup from "../../Popup/Popup";

import "./userAvatar.scss";

const _userIcn = require("../../../assets/user-icon.png");

const UserAvatar = () => {
  const avatarRef = useRef(null);

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);

  const hangleClickOutside = useCallback((e) => {
    if (avatarRef.current && avatarRef.current.contains(e.target)) {
      setVisibleMenu((val) => !val);
    } else {
      setVisibleMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", hangleClickOutside);
  }, [hangleClickOutside]);

  return (
    <div className="userAvatar">
      <Popup
        messageType="alert"
        messageText="Та гарахдаа итгэлтэй байна уу?"
        visible={visiblePopup}
        onOk={() => window.location.reload()}
        onCancel={setVisiblePopup}
      />

      <figure ref={avatarRef} className="userAvatar__photo">
        <b>{getFormattedName("firstname", "lastname")}</b>
        <img
          className={`userAvatar__photo-img ${"no_Avatar"}`}
          src={_userIcn}
          alt="no file"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = _userIcn;
          }}
        />
      </figure>

      <div className={`headerMenu user ${visibleMenu || "hidden"}`}>
        <NavLink
          className={({ isActive }) =>
            `headerMenu-item ${isActive && "active"}`
          }
          to="/my-cv"
        >
          Миний CV
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `headerMenu-item ${isActive && "active"}`
          }
          to="/sent-cv"
        >
          Илгээсэн CV
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `headerMenu-item ${isActive && "active"}`
          }
          to="/personal-info"
        >
          Хувийн мэдээлэл
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `headerMenu-item ${isActive && "active"}`
          }
          to="/change-password"
        >
          Нууц үгээ солих
        </NavLink>

        <button
          className="no-btn headerMenu-item signOutBtn"
          onClick={() => setVisiblePopup(true)}
        >
          Гарах
        </button>
      </div>
    </div>
  );
};

export default UserAvatar;
