import React, { useState } from "react";
import Axios from "../../../Axios";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

import "./changeAvatarModal.scss";

const _userIcn = require("../../../assets/user-icon.png");

const ChangeAvatarModal = ({
  authConfig,
  data,
  avatar,
  setVisibleSysError,
  visible,
  onCancel,
}) => {
  const [photo, setPhoto] = useState(avatar);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const saveHandler = () => {
    setBtnIsLoading(true);

    const DATA = {
      ...data,
      photo: photo,
      birthDate: data.birth_date,
    };

    Axios.put("/users/update", DATA, authConfig)
      .then((res) => {
        if (res.data.message === "success") {
          window.location.reload();
        } else {
          setVisibleSysError(true);
        }
      })
      .catch(() => setVisibleSysError(true));
  };

  return (
    <Modal visible={visible} onCancel={() => onCancel(btnIsLoading)}>
      <div className="changeAvatarModal">
        <b className="changeAvatarModal__title">Зураг солих</b>

        <img
          className="changeAvatarModal__avatar"
          src={photo ? photo : _userIcn}
          alt="no file"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = _userIcn;
          }}
        />
        <input
          placeholder="Зурагны линк"
          onChange={(e) => setPhoto(e.target.value)}
        />

        {btnIsLoading ? (
          <Loader mini />
        ) : (
          <button onClick={saveHandler}>Хадгалах</button>
        )}
      </div>
    </Modal>
  );
};

export default ChangeAvatarModal;
