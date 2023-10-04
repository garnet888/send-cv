import React from "react";

const _robot = require("../assets/robot-not-found.png");

const NotFound = () => {
  return (
    <div className="notFound">
      <span className="notFound-text">Хуудас олдсонгүй</span>
      <img className="notFound-robot" src={_robot} alt="no file" />

      <a className="notFound-goHome" href="/">
        Нүүр хуудас луу шилжих
      </a>
    </div>
  );
};

export default NotFound;
