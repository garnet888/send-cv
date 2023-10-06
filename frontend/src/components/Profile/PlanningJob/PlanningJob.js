import React, { useCallback, useEffect, useState } from "react";
import { MdEditNote } from "react-icons/md";
import Axios from "../../../Axios";
import Loader from "../../../utils/Loader/Loader";
import CVcard from "../../../utils/CVcard/CVcard";
import Popup from "../../../utils/Popup/Popup";
import PlanningJobModal from "./PlanningJobModal";

import "./planningJob.scss";

const PlanningJob = ({ onAdmin, userID }) => {
  const TITLE = "Ажиллахаар төлөвлөж буй ажлын байр";

  const [data, setData] = useState({});
  const [jobTypes, setJobTypes] = useState([]);
  const [timeTypes, setTimeTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const [popupType, setPopupType] = useState("");
  const [popupText, setPopupText] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(false);

  const getJobTypes = useCallback(() => {
    Axios.get("/jobs/job-types")
      .then((res) => setJobTypes(res.data))
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, []);

  const getTimeTypes = useCallback(() => {
    Axios.get("/jobs/wk-time-types")
      .then((res) => setTimeTypes(res.data))
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, []);

  const getDATA = useCallback(() => {
    if (userID) {
      Axios.get(`/plan-job/${userID}`)
        .then((res) => {
          getJobTypes();
          getTimeTypes();

          setData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setPopupType("sys_error");
          setPopupText("");
          setVisiblePopup(true);
        });
    }
  }, [userID, getJobTypes, getTimeTypes]);

  useEffect(() => {
    getDATA();
  }, [getDATA]);

  const popupOnOK = () => {
    if (popupOnOK === "sys_error") {
      window.location.reload();
    } else {
      setVisiblePopup(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CVcard title={TITLE} disableAdd>
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={() => popupOnOK()}
        onCancel={() => setVisiblePopup(false)}
      />

      <PlanningJobModal
        title={TITLE}
        userID={userID}
        data={data}
        jobTypes={jobTypes}
        timeTypes={timeTypes}
        setPopupType={setPopupType}
        setPopupText={setPopupText}
        setVisiblePopup={setVisiblePopup}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <ul className="planningJob">
        <li className="planningJob__info">
          <b>Хүсэж буй цалин:</b>

          {data.min_salary && data.max_salary
            ? `${new Intl.NumberFormat().format(
                data.min_salary
              )}₮ - ${new Intl.NumberFormat().format(data.max_salary)}₮`
            : "---"}
        </li>

        <li className="planningJob__info">
          <b>Ажиллах цагийн төрөл:</b>
          {data.time_type ? data.time_type : "---"}
        </li>

        <li className="planningJob__info">
          <b>Ажиллахаар төлөвлөж буй чиглэл:</b>
          {data.job_type ? data.job_type : "---"}
        </li>

        {onAdmin || (
          <button
            className="planningJob__editBtn"
            onClick={() => setVisibleModal(true)}
          >
            <MdEditNote />
          </button>
        )}
      </ul>
    </CVcard>
  );
};

export default PlanningJob;
