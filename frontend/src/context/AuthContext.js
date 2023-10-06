import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios";
import Popup from "../utils/Popup/Popup";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authConfig, setAuthConfig] = useState(null);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const authKey = "USER_TOKEN";

  useEffect(() => {
    const token = localStorage.getItem(authKey);

    if (token) {
      setIsLogin(true);
      setAuthConfig({ headers: { token } });
    } else {
      setIsLogin(false);
      setAuthConfig(null);
    }
  }, []);

  function loginHandler({ email, password, noGoto }) {
    setIsLoading(true);

    Axios.post("/auth/login", { email, password })
      .then((res) => {
        if (res.data) {
          const { token } = res.data;
          localStorage.setItem(authKey, token);

          setIsLogin(true);
          noGoto || navigate("/my-cv");

          setAuthConfig({ headers: { token } });
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
    localStorage.removeItem(authKey);
    setIsLogin(false);

    navigate("/");
    window.location.reload();
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
    <AuthContext.Provider
      value={{
        isLoading,
        isLogin,
        authConfig,
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
    </AuthContext.Provider>
  );
};
