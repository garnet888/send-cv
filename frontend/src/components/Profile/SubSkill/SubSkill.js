import React, { useState } from "react";
import { MdOutlineDeleteForever, MdEditNote } from "react-icons/md";
import CVcard from "../../../utils/CVcard/CVcard";
import Popup from "../../../utils/Popup/Popup";
import SubSkillModal from "./SubSkillModal";

const SubSkill = () => {
  const TITLE = "Нэмэлт ур чадвар";

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

      <SubSkillModal
        title={TITLE}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <ul className="jobSkills">
        {[...Array(8)].map((_, idx) => (
          <li key={idx} className="jobSkills__item">
            <label>Ачаалал даах</label>

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

export default SubSkill;
