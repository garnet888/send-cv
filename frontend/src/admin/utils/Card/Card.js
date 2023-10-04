import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./card.scss";

const Card = ({ children, centered = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={`adnCard ${centered && "centered"}`}>
      <h3 className="adnCard__heading">
        <button
          className="adnCard__heading-goBack"
          onClick={() => navigate(-1)}
        >
          Буцах
        </button>

        <label className="adnCard__heading-title">
          {id === "add" ? "Нэмэх хэсэг" : "Засах хэсэг"}
        </label>
      </h3>

      <div className="adnCard__content">{children}</div>
    </div>
  );
};

export default Card;
