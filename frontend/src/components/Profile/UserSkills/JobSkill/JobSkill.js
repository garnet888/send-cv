import React, { useEffect, useState } from "react";
import Axios from "../../../../Axios";
import Loader from "../../../../utils/Loader/Loader";
import CVcard from "../../../../utils/CVcard/CVcard";
import Popup from "../../../../utils/Popup/Popup";
import JobSkillModal from "./JobSkillModal";
import SkillCard from "../SkillCard/SkillCard";

import "../userSkills.scss";

const JobSkill = ({ userID }) => {
  const TITLE = "Мэргэжлийн ур чадвар";

  const [allData, setAllData] = useState([]);
  const [dataID, setDataID] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  useEffect(() => {
    if (userID) {
      Axios.get(`/cv-job-skill/${userID}`)
        .then((res) => {
          setAllData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    }

    if (visibleModal === false) {
      setDataID(null);
    }
  }, [userID, visibleModal]);

  const showAlertMessage = (id) => {
    setPopupType("alert");
    setPopupText("Устгахдаа итгэлтэй байна уу?");
    setVisiblePopup(true);

    setDataID(id);
  };

  const deleteHandler = () => {
    Axios.delete(`/cv-job-skill/${dataID}`)
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
    <CVcard title={TITLE} showAddModal={() => setVisibleModal(true)}>
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onCancel={setVisiblePopup}
        onOk={popupOnOK}
      />

      <JobSkillModal
        title={TITLE}
        userID={userID}
        dataID={dataID}
        setPopupType={setPopupType}
        setPopupText={setPopupText}
        setVisiblePopup={setVisiblePopup}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <ul className="userSkills">
        {allData.map((item, idx) => (
          <SkillCard
            key={idx}
            data={item}
            getDataID={setDataID}
            setVisibleModal={setVisibleModal}
            showAlertMessage={showAlertMessage}
          />
        ))}
      </ul>
    </CVcard>
  );
};

export default JobSkill;
