import React from "react";
import moment from "moment/moment";

import "./jobCard.scss";

const JobCard = ({ data }) => {
  return (
    <a className="jobCard" href={`/detail/${data.id}`}>
      <div className="jobCard__info">
        <h3 className="jobCard__title">{data.name}</h3>
        <p>
          {data.job_type} / {data.time_type}
        </p>

        <p>{`${new Intl.NumberFormat().format(
          data.min_salary
        )}₮ - ${new Intl.NumberFormat().format(data.max_salary)}₮`}</p>
      </div>

      <p>{moment(data.created_date).format("YYYY/MM/DD, HH:mm")}</p>
    </a>
  );
};

export default JobCard;
