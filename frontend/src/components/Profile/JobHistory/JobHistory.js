import React, { useState } from "react";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";
import CVcard from "../../../utils/CVcard/CVcard";
import Popup from "../../../utils/Popup/Popup";
import JobHistoryModal from "./JobHistoryModal";

import "./jobHistory.scss";

const JobHistory = () => {
  const TITLE = "Ажлын туршлага";

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const deleteHandler = () => {
    console.log("Deleted");
  };

  return (
    <CVcard title={TITLE} setVisibleModal={setVisibleModal}>
      <Popup
        messageType="alert"
        messageText="Устгахдаа итгэлтэй байна уу?"
        visible={visibleAlert}
        onCancel={setVisibleAlert}
        onOk={deleteHandler}
      />

      <JobHistoryModal
        title={TITLE}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <div className="jobHistory">
        {[...Array(3)].map((_, idx) => (
          <ul key={idx} className="jobHistory__info">
            <li className="jobHistory__info-item">
              <b className="jobHistory__info-item-date">2019/08 - 2020/03</b>
            </li>

            <li className="jobHistory__info-item">
              <b>Байгууллагын нэр:</b>
              Garnet LLC
            </li>

            <li className="jobHistory__info-item">
              <b>Байгууллагын салбар:</b>
              Мэдээлэл технологи
            </li>

            <li className="jobHistory__info-item">
              <b>Албан тушаал:</b>
              Web Developer
            </li>

            <li className="jobHistory__info-item">
              <b>Цалин:</b>
              2'000'000₮
            </li>

            <div className="cvCard__actions absolute">
              <button
                className="cvCard__actions-btn"
                onClick={() => setVisibleModal(true)}
              >
                <MdEditNote />
              </button>
              <button
                className="cvCard__actions-btn delete"
                onClick={() => setVisibleAlert(true)}
              >
                <MdOutlineDeleteForever />
              </button>
            </div>
          </ul>
        ))}
      </div>
    </CVcard>
  );
};

export default JobHistory;
