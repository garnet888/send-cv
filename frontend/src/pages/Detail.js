import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useAuthContext } from "../context/AuthContext";
import Axios from "../Axios";
import CKeditor from "../admin/utils/Ckeditor";
import Loader from "../utils/Loader/Loader";
import Popup from "../utils/Popup/Popup";

const Detail = () => {
  const { authConfig, isLogin } = useAuthContext();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [userID, setUserID] = useState("");
  const [isSent, setIsSent] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const getIsSentCV = useCallback(
    (user_id) => {
      Axios.get(`/sent-cv/check/userID/${user_id}/jobID/${id}`)
        .then((res) => setIsSent(res.data.value))
        .catch(() => {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    },
    [id]
  );

  const getUserID = useCallback(() => {
    if (authConfig) {
      Axios.get("/auth/me", authConfig)
        .then((res) => {
          getIsSentCV(res.data.id);
          setUserID(res.data.id);
        })
        .catch(() => {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    }
  }, [authConfig, getIsSentCV]);

  const getCVDetail = useCallback(() => {
    Axios.get(`/jobs/${id}`)
      .then((res) => {
        getUserID();

        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, [id, getUserID]);

  useEffect(() => {
    getCVDetail();
  }, [getCVDetail]);

  const sentCVHandler = () => {
    if (isLogin) {
      const DATA = {
        userID,
        jobID: id,
      };

      Axios.post("/sent-cv", DATA, authConfig)
        .then((res) => {
          if (res.data.message === "success") {
            setPopupType("success");
            setPopupText("Таны анкет амжилттай илгээгдлээ");
            setVisiblePopup(true);
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
    } else {
      setPopupType("error");
      setPopupText("Та нэвтэрч орно уу!");
      setVisiblePopup(true);
    }
  };

  const popupOnOK = () => {
    if (popupType === "error") {
      setVisiblePopup(false);
    } else {
      window.location.reload();
    }
  };

  const renderSendBtn = () => {
    if (isLogin && isSent) {
      return <p className="detail__sentText">Та анкетаа илгээсэн байна</p>;
    } else {
      return (
        <button className="detail__sendCV" onClick={sentCVHandler}>
          Анкет илгээх
        </button>
      );
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="detail">
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={popupOnOK}
      />

      <div className="detail__heading">
        <h3 className="detail__heading-jobName">
          {data.name}
          <p className="detail__heading-jobName-salary">
            {`${new Intl.NumberFormat().format(
              data.min_salary
            )}₮ - ${new Intl.NumberFormat().format(data.max_salary)}₮`}{" "}
            / {data.job_type} / {data.time_type}
          </p>
        </h3>

        <p className="detail__heading-date">
          {moment(data.created_date).format("YYYY/MM/DD, HH:mm")}
        </p>
      </div>

      <div className="detail__text">
        <div className="detail__text-content">
          <b className="detail__text-content-title">
            Ажлын байрны зорилго/үүрэг:
          </b>

          <div className="detail__text-content-renderText">
            <CKeditor text={data.duty} disabled />
          </div>
        </div>

        <div className="detail__text-content">
          <b className="detail__text-content-title">Тавигдах шаардлага:</b>

          <div className="detail__text-content-renderText">
            <CKeditor text={data.requirement} disabled />
          </div>
        </div>
      </div>

      {renderSendBtn()}
    </div>
  );
};

export default Detail;
