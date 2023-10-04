import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import ROUTES from "../../routes";
import { getValueFromTree } from "../../lib/Functions";
import Modal from "../../../utils/Modal/Modal";

import "./header.scss";

const _logo = require("../../../assets/logo.png");

const Header = ({ smallMenu, setSmallMenu }) => {
  const { pathname } = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  function getMenuItemHeading() {
    return ROUTES.map((item) =>
      getValueFromTree(item, pathname, "title", "heading")
    );
  }

  function messageOnOK() {
    localStorage.removeItem("adminAuth");
    window.location.replace("/admin");
  }

  return (
    <header className="adnHeader">
      <Modal
        messageType="alert"
        messageText="Та гарахдаа итгэлтэй байна уу?"
        visible={showMessage}
        onOk={messageOnOK}
        onCancel={() => setShowMessage(false)}
      />

      <div className="adnHeader__heading">
        <div
          className="adnMenuToggle"
          onClick={() => setSmallMenu((val) => !val)}
        >
          <div className="toggleLine" />
          <div className={`toggleLine middle ${smallMenu && "short"}`} />
          <div className={`toggleLine bottom ${smallMenu && "short"}`} />
        </div>

        <a className="adnHeader__heading-logo" href="/">
          <img src={_logo} alt="no file" />
          GARNET
        </a>
      </div>

      <div className="adnHeader__body">
        <h3 className="adnHeader__body-title">{getMenuItemHeading()}</h3>

        <button
          className="adnHeader__body-logout"
          onClick={() => setShowMessage(true)}
        >
          <RiLogoutCircleRLine />
        </button>
      </div>
    </header>
  );
};

export default Header;
