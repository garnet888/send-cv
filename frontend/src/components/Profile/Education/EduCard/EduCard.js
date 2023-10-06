import React from "react";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";

import "./eduCard.scss";

const EduCard = ({ data, getDataID, setVisibleModal, showAlertMessage }) => {
  const showModal = () => {
    getDataID(data.id);
    setVisibleModal(true);
  };

  return (
    <ul className="eduCard">
      <li className="eduCard__info">
        <b className="eduCard__info-date">
          {data.enter_year && data.end_year
            ? `${data.enter_year} - ${data.end_year}`
            : "---"}
        </b>
      </li>

      <li className="eduCard__info">
        <b>Боловсролын зэрэг:</b>
        {data.level ? data.level : "---"}
      </li>

      <li className="eduCard__info">
        <b>Сургуулийн нэр:</b>
        {data.school_name ? data.school_name : "---"}
      </li>

      <li className="eduCard__info">
        <b>Эзэмшсэн мэргэжил:</b>
        {data.occupation ? data.occupation : "---"}
      </li>

      <li className="eduCard__info">
        <b>Голч дүн:</b>
        {data.gpa ? data.gpa : "---"}
      </li>

      <div className="cvCard__actions absolute">
        <button className="cvCard__actions-btn" onClick={showModal}>
          <MdEditNote />
        </button>
        <button
          className="cvCard__actions-btn delete"
          onClick={() => showAlertMessage(data.id)}
        >
          <MdOutlineDeleteForever />
        </button>
      </div>
    </ul>
  );
};

export default EduCard;
