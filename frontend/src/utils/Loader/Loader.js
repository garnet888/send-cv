import React from "react";

import "./loader.scss";

const Loader = ({ mini = false }) => {
  return (
    <div className={`loader ${mini && "mini"}`}>
      <div className="spinner" />
    </div>
  );
};

export default Loader;
