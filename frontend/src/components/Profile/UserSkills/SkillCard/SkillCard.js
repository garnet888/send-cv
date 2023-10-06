import React from "react";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";

import "./skillCard.scss";

const SkillCard = ({
  type = "job",
  onAdmin,
  data,
  getDataID,
  setVisibleModal,
  showAlertMessage,
}) => {
  const showModal = () => {
    getDataID(data.id);
    setVisibleModal(true);
  };

  return (
    <li className="skillCard">
      {type === "job" ? (
        <p>
          <b>{data.skill}</b> - {data.level}%
        </p>
      ) : (
        <label>{data.skill}</label>
      )}

      {onAdmin || (
        <div className="cvCard__actions">
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
      )}
    </li>
  );
};

export default SkillCard;
