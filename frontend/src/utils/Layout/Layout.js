import React from "react";
import Header from "../Header/Header";

import "./layout.scss";

const Layout = ({ children }) => {
  return (
    <section className="layout">
      <Header />

      <main className="layout__content">{children}</main>
    </section>
  );
};

export default Layout;
