import React, { useRef, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";

import "./jobSortToggle.scss";

const JobSortToggle = () => {
  const drawerRef = useRef();
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const closeToggleOnClick = (e) => {
    if (setVisibleDrawer && drawerRef.current === e.target) {
      setVisibleDrawer(false);
    }
  };

  return (
    <div className="jobSortToggle">
      <button
        className="jobSortToggle__toggleBtn"
        onClick={() => setVisibleDrawer(true)}
      >
        <BiCategoryAlt />
      </button>

      <div
        ref={drawerRef}
        className={`jobSortToggle__drawer ${visibleDrawer && "shownDrawer"}`}
        onClick={closeToggleOnClick}
      >
        <div className="drawerPanel"></div>
      </div>
    </div>
  );
};

export default JobSortToggle;
