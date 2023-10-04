import React, { useState } from "react";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";
import CVcard from "../../../utils/CVcard/CVcard";
import Popup from "../../../utils/Popup/Popup";
import EducationModal from "./EducationModal";

import "./education.scss";

const Education = () => {
  const TITLE = "Боловсрол";

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

      <EducationModal
        title={TITLE}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <div className="education">
        {[...Array(3)].map((_, idx) => (
          <ul key={idx} className="education__info">
            <li className="education__info-item">
              <b className="education__info-item-date">2016 - 2020</b>
            </li>

            <li className="education__info-item">
              <b>Боловсролын зэрэг:</b>
              Бакалавр
            </li>

            <li className="education__info-item">
              <b>Сургуулийн нэр:</b>
              ШУТИС
            </li>

            <li className="education__info-item">
              <b>Эзэмшсэн мэргэжил:</b>
              Мэдээлэл технологи
            </li>

            <li className="education__info-item">
              <b>Голч дүн:</b>
              2.5
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

export default Education;
