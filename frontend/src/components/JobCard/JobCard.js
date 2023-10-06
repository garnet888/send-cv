import React from "react";

import "./jobCard.scss";

const JobCard = ({ id }) => {
  return (
    <a className="jobCard" href={`/detail/${id}`}>
      <div className="jobCard__info">
        <h3 className="jobCard__title">Job's Name {parseInt(id) + 1}</h3>
        <p>Job Type / Work time type</p>

        <p>2.100.000₮ - 2.500.000₮</p>
      </div>

      <p>10-р сарын 01, 13:04</p>
    </a>
  );
};

export default JobCard;
