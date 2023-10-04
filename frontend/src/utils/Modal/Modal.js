import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";

import "./modal.scss";

const Modal = ({ children, visible, onCancel }) => {
  const modalRef = useRef(null);

  const closeOnClick = (e) => {
    if (modalRef.current === e.target) {
      onCancel(false);
    }
  };

  return (
    visible && (
      <div ref={modalRef} className="modal" onClick={closeOnClick}>
        <div className="modal__content">
          <button
            className="modal__content-closeBtn no-btn"
            onClick={() => onCancel(false)}
          >
            <IoClose size={24} color="red" />
          </button>

          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
