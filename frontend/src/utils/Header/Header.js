import React from "react";
import AuthActions from "./AuthActions/AuthActions";
import UserAvatar from "./UserAvatar/UserAvatar";

import "./header.scss";

const _logo = require("../../assets/logo.png");

const Header = () => {
  const isLogin = true;

  return (
    <header className="header">
      <section className="header__section">
        <a href="/">
          <figure className="header__section-logoFig">
            <img
              className="header__section-logoFig-img"
              src={_logo}
              alt="no file"
            />
            <figcaption className="header__section-logoFig-txt">
              GARNET
            </figcaption>
          </figure>
        </a>

        {isLogin ? <UserAvatar /> : <AuthActions />}
      </section>
    </header>
  );
};

export default Header;
