import React from "react";

import "./cvCard.scss";

const CVcard = ({ children, title = "", showAddModal, disableAdd = false }) => {
  return (
    <div className="cvCard">
      <div className="cvCard__heading">
        <h3 className="cvCard__heading-title">{title}</h3>

        {disableAdd || (
          <button className="cvCard__heading-addBtn" onClick={showAddModal}>
            +
          </button>
        )}
      </div>

      <div className="cvCard__content">{children}</div>
    </div>
  );
};

export default CVcard;
