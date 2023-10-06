import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "../Axios";
import Popup from "../utils/Popup/Popup";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminConfig, setAdminConfig] = useState(null);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const itemKey = "ADMIN_TOKEN";

  useEffect(() => {
    const token = localStorage.getItem(itemKey);

    if (token) {
      setIsLogin(true);
      setAdminConfig({ headers: { token } });
    } else {
      setIsLogin(false);
      setAdminConfig(null);
    }
  }, []);

  function loginHandler({ username, password }) {
    setIsLoading(true);

    Axios.post("/admin/login", { username, password })
      .then((res) => {
        if (res.data) {
          const { token } = res.data;
          localStorage.setItem(itemKey, token);

          setIsLogin(true);
          window.location.reload();

          setAdminConfig({ headers: { token } });
        } else {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setPopupType("error");
          setPopupText(err.response.data.message);
          setVisiblePopup(true);
        } else {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        }
      });
  }

  const logoutHandler = () => {
    localStorage.removeItem(itemKey);
    setIsLogin(false);

    window.location.replace("/admin");
  };

  const popupOnOK = () => {
    if (popupType === "error") {
      setIsLoading(false);
      setVisiblePopup(false);
    } else {
      window.location.reload();
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isLoading,
        isLogin,
        adminConfig,
        loginHandler,
        logoutHandler,
      }}
    >
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={popupOnOK}
      />

      {children}
    </AdminContext.Provider>
  );
};
