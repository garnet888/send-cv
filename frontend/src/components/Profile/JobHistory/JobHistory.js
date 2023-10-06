import React, { useCallback, useEffect, useState } from "react";
import Axios from "../../../Axios";
import Loader from "../../../utils/Loader/Loader";
import CVcard from "../../../utils/CVcard/CVcard";
import Popup from "../../../utils/Popup/Popup";
import JobHistoryModal from "./JobHistoryModal";
import HistoryCard from "./HistoryCard/HistoryCard";

import "./jobHistory.scss";

const JobHistory = ({ userID }) => {
  const TITLE = "Ажлын туршлага";

  const [allData, setAllData] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [dataID, setDataID] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const getJobTypes = useCallback(() => {
    Axios.get("/jobs/job-types")
      .then((res) => {
        setJobTypes(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, []);

  const getDATA = useCallback(() => {
    if (userID) {
      Axios.get(`/cv-job-his/${userID}`)
        .then((res) => {
          getJobTypes();

          setAllData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    }
  }, [userID, getJobTypes]);

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
    Axios.delete(`/cv-job-his/${dataID}`)
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

      <JobHistoryModal
        title={TITLE}
        userID={userID}
        dataID={dataID}
        jobTypes={jobTypes}
        setPopupType={setPopupType}
        setPopupText={setPopupText}
        setVisiblePopup={setVisiblePopup}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <div className="jobHistory">
        {allData.map((item, idx) => (
          <HistoryCard
            key={idx}
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

export default JobHistory;
