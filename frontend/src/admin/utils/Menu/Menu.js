import React from "react";
// import { VscCollapseAll } from "react-icons/vsc";
import ROUTES from "../../routes";
import MenuItem from "./MenuItem";

import "./menu.scss";

const Menu = ({ smallMenu }) => {
  return (
    <aside className={smallMenu ? "adnAside small" : "adnAside"}>
      <nav className="adnNavbar">
        <ul className="adnMenu">
          {/* <button
            className="collapseAll"
            onClick={() => window.location.reload()}
          >
            <VscCollapseAll fontSize={18} />
          </button> */}

          {ROUTES.map((item, index) => (
            <MenuItem key={index} item={item} smallMenu={smallMenu} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
