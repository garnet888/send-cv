import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { getFormattedName } from "../../../lib/Functions";
import { useAuthContext } from "../../../context/AuthContext";
import Axios from "../../../Axios";
import Popup from "../../Popup/Popup";

import "./userAvatar.scss";

const _userIcn = require("../../../assets/user-icon.png");

const UserAvatar = () => {
  const { authConfig, logoutHandler } = useAuthContext();
  const avatarRef = useRef(null);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
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

    Axios.get("/auth/me", authConfig)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, [hangleClickOutside, authConfig]);

  const showAlertMessage = () => {
    setPopupType("alert");
    setPopupText("Та гарахдаа итгэлтэй байна уу?");
    setVisiblePopup(true);
  };

  const popupOnOK = () => {
    if (popupType === "alert") {
      logoutHandler();
    } else {
      window.location.reload();
    }
  };

  const popupOnCancel = () => {
    if (popupType === "alert") {
      setVisiblePopup(false);
    }
  };

  return (
    isLoading || (
      <div className="userAvatar">
        <Popup
          messageType={popupType}
          messageText={popupText}
          visible={visiblePopup}
          onOk={popupOnOK}
          onCancel={popupOnCancel}
        />

        <figure ref={avatarRef} className="userAvatar__photo">
          <b>{getFormattedName(data.firstname, data.lastname)}</b>
          <img
            className={`userAvatar__photo-img ${"no_Avatar"}`}
            src={data.photo ? data.photo : _userIcn}
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
            to="/personal-info"
          >
            Хувийн мэдээлэл
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `headerMenu-item ${isActive && "active"}`
            }
            to="/my-cv"
          >
            Миний анкет
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `headerMenu-item ${isActive && "active"}`
            }
            to="/sent-cv"
          >
            Илгээсэн анкет
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
            onClick={showAlertMessage}
          >
            Гарах
          </button>
        </div>
      </div>
    )
  );
};

export default UserAvatar;
