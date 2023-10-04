import React from "react";

import "./workCard.scss";

const _exLogo1 =
  "https://t4.ftcdn.net/jpg/02/04/59/29/360_F_204592965_Xgu7wwQEj8QSnmI0HALnFzyBAIUOMz0j.jpg";
const _exLogo2 =
  "https://logo.com/image-cdn/images/kts928pd/production/9b98774a34ba33e8298f12960875c0796b7b0a66-900x550.png?w=1080&q=72";

const WorkCard = ({ id }) => {
  return (
    <a className="workCard" href={`/detail/${id}`}>
      <img
        className="workCard__logo"
        src={id % 2 === 0 ? _exLogo1 : _exLogo2}
        alt="no file"
      />

      <div className="workCard__info">
        <p className="workCard__info-comName">
          Organization's Name {parseInt(id) + 1}
        </p>

        <h3>Work's Name {parseInt(id) + 1}</h3>

        <p className="workCard__info-salary">2.100.000₮ - 2.500.000₮</p>
      </div>

      <p className="workCard__date">10-р сарын 01, 13:04</p>
    </a>
  );
};

export default WorkCard;
