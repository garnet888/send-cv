import React, { useCallback, useEffect, useState } from "react";
import { MdPlaylistRemove } from "react-icons/md";
import Axios from "../../Axios";
import MyRadio from "../../ui/myRadio/MyRadio";
import Popup from "../../utils/Popup/Popup";
import Loader from "../../utils/Loader/Loader";

import "./jobMenu.scss";

const JobMenu = ({
  sortJobType,
  sortTimeType,
  setSortJobType,
  setSortTimeType,
}) => {
  const [jobTypes, setJobTypes] = useState([]);
  const [timeTypes, setTimeTypes] = useState([]);

  const [checkedVal, setCheckedVal] = useState("");

  const [isLoading, setIsLoading] = useState(true);
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
      .then((res) => {
        getJobTypes();

        setTimeTypes(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setPopupType("sys_error");
        setPopupText("");
        setVisiblePopup(true);
      });
  }, [getJobTypes]);

  useEffect(() => {
    getTimeTypes();
  }, [getTimeTypes]);

  const onChangeHanlder = (e) => {
    setCheckedVal(e.target.value);
    setSortTimeType(e.target.value);
  };

  const getJobTypeOptions = () => {
    let options = [];

    if (jobTypes) {
      options = [{ id: "", type: "Сонгох" }, ...jobTypes];

      return options.map((item, idx) => (
        <option key={idx} value={item.id}>
          {item.type}
        </option>
      ));
    }
  };

  const popupOnOK = () => {
    if (popupOnOK === "sys_error") {
      window.location.reload();
    } else {
      setVisiblePopup(false);
    }
  };

  const sortingClearHandler = () => {
    setCheckedVal("");

    setSortJobType("");
    setSortTimeType("");
  };

  return (
    <div className="jobMenu">
      <Popup
        messageType={popupType}
        messageText={popupText}
        visible={visiblePopup}
        onOk={() => popupOnOK()}
        onCancel={() => setVisiblePopup(false)}
      />

      {(sortJobType || sortTimeType) && (
        <button className="jobMenu__clearBtn" onClick={sortingClearHandler}>
          <MdPlaylistRemove />
        </button>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="jobMenu__types">
            <b className="jobMenu__types-title">Мэргэжлийн чиглэл</b>

            <select
              name="jobType"
              value={sortJobType}
              onChange={(e) => setSortJobType(e.target.value)}
            >
              {getJobTypeOptions()}
            </select>
          </div>

          <ul className="jobMenu__types">
            <b className="jobMenu__types-title">Ажиллах цагийн төрөл</b>

            {timeTypes.map((item, idx) => (
              <li key={idx} className="jobMenu__types-item">
                <MyRadio
                  label={item.type}
                  name="timeType"
                  value={item.id}
                  checked={checkedVal === String(item.id)}
                  onChange={onChangeHanlder}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default JobMenu;
