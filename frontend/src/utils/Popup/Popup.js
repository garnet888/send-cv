import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";

import "./popup.scss";

const Popup = ({
  messageType = "",
  messageText = "",
  visible,
  onOk,
  onCancel,
}) => {
  const popupRef = useRef(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (!visible) {
      setIsLoading(false);
    }
  }, [visible]);

  const closeOnClick = (e) => {
    if (!isLoading && messageType === "alert") {
      if (onCancel && popupRef.current === e.target) {
        onCancel(false);
      }
    }
  };

  const yesOnClick = () => {
    setIsLoading(true);
    onOk();
  };

  const noOnClick = () => {
    setIsLoading(false);
    onCancel && onCancel(false);
  };

  const getMessageText = () => {
    if (!messageText) {
      switch (messageType) {
        case "success":
          messageText = "Амжилттай";
          break;
        case "alert":
          messageText = "Итгэлтэй байна уу?";
          break;
        case "error":
          messageText = "Алдаа гарлаа. Дахин оролдоно уу.";
          break;
        case "sys_error":
          messageText = "Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.";
          break;
        default:
          messageText = "";
      }
    }

    return messageText;
  };

  return (
    visible && (
      <div ref={popupRef} className="popup" onClick={closeOnClick}>
        <div className={`popup__content ${messageType}`}>
          <p className="popup__content-message">{getMessageText()}</p>

          {isLoading ? (
            <Loader mini />
          ) : (
            <span className="popup__content-bottom">
              <button className="yesButton" onClick={() => yesOnClick()}>
                {messageType === "alert" ? "Тийм" : "Ойлголоо"}
              </button>

              {messageType === "alert" && (
                <button className="noButton" onClick={() => noOnClick()}>
                  Үгүй
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    )
  );
};

export default Popup;
