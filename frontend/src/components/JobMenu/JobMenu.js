import React from "react";
import { MdPlaylistRemove } from "react-icons/md";
import MyRadio from "../../ui/myRadio/MyRadio";

import "./jobMenu.scss";

const JobMenu = () => {
  return (
    <div className="jobMenu">
      <button className="jobMenu__clearBtn">
        <MdPlaylistRemove />
      </button>

      <div className="jobMenu__types">
        <b className="jobMenu__types-title">Мэргэжлийн чиглэл</b>

        <select name="jobType">
          <option value="Оёдол, сүлжмэл, ноос ноолуурын үйлдвэрлэл">
            Оёдол, сүлжмэл, ноос ноолуурын үйлдвэрлэл
          </option>

          {[...Array(15)].map((_, idx) => (
            <option key={idx} value={"Олон улсын харилцаа " + idx}>
              {"Олон улсын харилцаа " + idx}
            </option>
          ))}
        </select>
      </div>

      <ul className="jobMenu__types">
        <b className="jobMenu__types-title">Ажиллах цагийн төрөл</b>

        <li className="jobMenu__types-item">
          <MyRadio label="Бүтэн цагийн" name="timeType" value="Бүтэн цагийн" />
        </li>
        <li className="jobMenu__types-item">
          <MyRadio label="Ээлжийн" name="timeType" value="Ээлжийн" />
        </li>
        <li className="jobMenu__types-item">
          <MyRadio label="Цагийн" name="timeType" value="Цагийн" />
        </li>
        <li className="jobMenu__types-item">
          <MyRadio label="Улирлын" name="timeType" value="Улирлын" />
        </li>
        <li className="jobMenu__types-item">
          <MyRadio label="Гэрээт" name="timeType" value="Гэрээт" />
        </li>
        <li className="jobMenu__types-item">
          <MyRadio label="Зайнаас" name="timeType" value="Зайнаас" />
        </li>
      </ul>
    </div>
  );
};

export default JobMenu;
