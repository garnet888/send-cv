import React from "react";
import moment from "moment/moment";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";

import "./historyCard.scss";

const HistoryCard = ({
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
    <ul className="historyCard">
      <li className="historyCard__info">
        <b className="historyCard__info-date">
          {data.enter_date && data.leave_date
            ? `${moment(data.enter_date).format("YYYY/MM")} - ${moment(
                data.leave_date
              ).format("YYYY/MM")}`
            : "---"}
        </b>
      </li>

      <li className="historyCard__info">
        <b>Байгууллагын нэр:</b>
        {data.company_name ? data.company_name : "---"}
      </li>

      <li className="historyCard__info">
        <b>Байгууллагын салбар:</b>
        {data.job_type ? data.job_type : "---"}
      </li>

      <li className="historyCard__info">
        <b>Албан тушаал:</b>
        {data.job_position ? data.job_position : "---"}
      </li>

      <li className="historyCard__info">
        <b>Цалин:</b>
        {data.salary
          ? new Intl.NumberFormat().format(data.salary) + "₮"
          : "---"}
      </li>

      {onAdmin || (
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
      )}
    </ul>
  );
};

export default HistoryCard;
