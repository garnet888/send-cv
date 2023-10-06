import React, { useCallback, useEffect, useState } from "react";
import Axios from "../../../Axios";
import Loader from "../../../utils/Loader/Loader";
import CVcard from "../../../utils/CVcard/CVcard";
import Popup from "../../../utils/Popup/Popup";
import EduCard from "./EduCard/EduCard";
import EducationModal from "./EducationModal";

import "./education.scss";

const Education = ({ onAdmin, userID }) => {
  const TITLE = "Боловсрол";

  const [allData, setAllData] = useState([]);
  const [eduLevels, setEduLevels] = useState([]);
  const [dataID, setDataID] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const getEduLevels = useCallback(() => {
    Axios.get("/cv-edu/get-levels")
      .then((res) => setEduLevels(res.data))
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, []);

  const getDATA = useCallback(() => {
    if (userID) {
      Axios.get(`/cv-edu/${userID}`)
        .then((res) => {
          getEduLevels();

          setAllData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    }
  }, [userID, getEduLevels]);

  useEffect(() => {
    getDATA();

    if (visibleModal === false) {
      setDataID(null);
    }
  }, [getDATA, visibleModal]);

  const showAlertMessage = (id) => {
    setPopupType("alert");
    setPopupText("Устгахдаа итгэлтэй байна уу?");
    setVisiblePopup(true);

    setDataID(id);
  };

  const deleteHandler = () => {
    Axios.delete(`/cv-edu/${dataID}`)
      .then((res) => {
        if (res.data.message === "success") {
          window.location.reload();
        } else {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        }
      })
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  };

  const popupOnOK = () => {
    if (popupType === "alert") {
      deleteHandler();
    } else {
      window.location.reload();
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CVcard
      onAdmin={onAdmin}
      title={TITLE}
      showAddModal={() => setVisibleModal(true)}
    >
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onCancel={setVisiblePopup}
        onOk={popupOnOK}
      />

      <EducationModal
        title={TITLE}
        userID={userID}
        dataID={dataID}
        eduLevels={eduLevels}
        setPopupType={setPopupType}
        setPopupText={setPopupText}
        setVisiblePopup={setVisiblePopup}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <div className="education">
        {allData.map((item, idx) => (
          <EduCard
            key={idx}
            onAdmin={onAdmin}
            data={item}
            getDataID={setDataID}
            setVisibleModal={setVisibleModal}
            showAlertMessage={showAlertMessage}
          />
        ))}
      </div>
    </CVcard>
  );
};

export default Education;
