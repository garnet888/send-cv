import React, { useState } from "react";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";
import CVcard from "../../../utils/CVcard/CVcard";
import Popup from "../../../utils/Popup/Popup";
import JobSkillModal from "./JobSkillModal";

import "./jobSkills.scss";

const JobSkill = () => {
  const TITLE = "Мэргэжлийн ур чадвар";

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const deleteHandler = () => {
    console.log("Deleted");
  };

  return (
    <CVcard title={TITLE} setVisibleModal={setVisibleModal}>
      <Popup
        messageType="alert"
        messageText="Устгахдаа итгэлтэй байна уу?"
        visible={visibleAlert}
        onCancel={setVisibleAlert}
        onOk={deleteHandler}
      />

      <JobSkillModal
        title={TITLE}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <ul className="jobSkills">
        {[...Array(8)].map((_, idx) => (
          <li key={idx} className="jobSkills__item">
            <p>
              <b>React JS</b> - 80%
            </p>

            <div className="cvCard__actions">
              <button
                className="cvCard__actions-btn"
                onClick={() => setVisibleModal(true)}
              >
                <MdEditNote />
              </button>
              <button
                className="cvCard__actions-btn delete"
                onClick={() => setVisibleAlert(true)}
              >
                <MdOutlineDeleteForever />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </CVcard>
  );
};

export default JobSkill;
