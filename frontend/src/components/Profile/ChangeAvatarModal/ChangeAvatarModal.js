import React, { useState } from "react";
import Modal from "../../../utils/Modal/Modal";
import Loader from "../../../utils/Loader/Loader";

import "./changeAvatarModal.scss";

const ChangeAvatarModal = ({ avatar, visible, onCancel }) => {
  const [imgURL, setImgURL] = useState(avatar);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  const saveHandler = () => {
    setBtnIsLoading(false);

    console.log("Avatar URL=>", imgURL);
  };

  return (
    <Modal visible={visible} onCancel={() => onCancel(btnIsLoading)}>
      <div className="changeAvatarModal">
        <b className="changeAvatarModal__title">Зураг солих</b>

        <img className="changeAvatarModal__avatar" src={imgURL} alt="no file" />
        <input
          placeholder="Зурагны линк"
          onChange={(e) => setImgURL(e.target.value)}
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
