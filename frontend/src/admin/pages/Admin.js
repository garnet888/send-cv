import React, { useState } from "react";
import Header from "../utils/Header/Header";
import Menu from "../utils/Menu/Menu";
import Content from "../utils/Content/Content";

const Admin = () => {
  const [smallMenu, setSmallMenu] = useState(false);

  return (
    <main className="admin">
      <Header smallMenu={smallMenu} setSmallMenu={setSmallMenu} />
      <Menu smallMenu={smallMenu} />
      <Content smallMenu={smallMenu} />
    </main>
  );
};

export default Admin;
