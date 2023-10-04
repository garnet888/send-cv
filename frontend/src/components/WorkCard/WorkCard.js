import React from "react";

import "./workCard.scss";

const WorkCard = ({ id }) => {
  return (
    <a className="workCard" href={`/detail/${id}`}>
      <div className="workCard__info">
        <h3 className="workCard__text">Work's Name {parseInt(id) + 1}</h3>
        <p className="workCard__text">Job Type / Work Time Type</p>

        <p className="workCard__text">2.100.000₮ - 2.500.000₮</p>
      </div>

      <p className="workCard__text">10-р сарын 01, 13:04</p>
    </a>
  );
};

export default WorkCard;
