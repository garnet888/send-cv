import React, { useState } from "react";
import { MdEditNote } from "react-icons/md";
import CVcard from "../../../utils/CVcard/CVcard";
import PlanningJobModal from "./PlanningJobModal";

import "./planningJob.scss";

const PlanningJob = () => {
  const TITLE = "Ажиллахаар төлөвлөж буй ажлын байр";

  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <CVcard title={TITLE} disableAdd>
      <PlanningJobModal
        title={TITLE}
        visible={visibleModal}
        onCancel={setVisibleModal}
      />

      <ul className="planningJob">
        <li className="planningJob__info">
          <b>Хүсэж буй цалин:</b>
          2'100'000₮ - 2'500'000₮
        </li>

        <li className="planningJob__info">
          <b>Ажиллах төрөл:</b>
          Бүтэн цагийн
        </li>

        <li className="planningJob__info">
          <b>Ажиллахаар төлөвлөж буй чиглэл:</b>
          Мэдээлэл технологи
        </li>

        <button
          className="planningJob__editBtn"
          onClick={() => setVisibleModal(true)}
        >
          <MdEditNote />
        </button>
      </ul>
    </CVcard>
  );
};

export default PlanningJob;
