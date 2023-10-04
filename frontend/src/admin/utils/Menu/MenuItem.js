import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { checkMenuOpened } from "../../lib/Functions";

const MenuItem = ({ item, smallMenu }) => {
  const { pathname } = useLocation();

  const [isOpened, setIsOpened] = useState(false);
  const [menuIsActive, setMenuIsActive] = useState(false);

  useEffect(() => {
    setMenuIsActive(false);
    checkMenuOpened(item, pathname, setIsOpened, setMenuIsActive);

    if (smallMenu && !menuIsActive) {
      setIsOpened(false);
    }
  }, [item, pathname, smallMenu, menuIsActive]);

  function iconChecker(icon, title) {
    let res = <b>{String(title).substring(0, 2)}</b>;

    if (icon) {
      res = icon;
    }

    return res;
  }

  if (item.children) {
    return (
      <div className={`adnMenu__item ${isOpened && "opened"}`}>
        <div
          className={`adnMenu__item-heading ${isOpened && "opened"} ${
            menuIsActive && "menuActive"
          }`}
          onClick={() => setIsOpened((val) => !val)}
        >
          <div className="adnMenu__item-heading-title">
            <span className="adnMenu__item-icon">
              {iconChecker(item.icon, item.title)}
            </span>
            <span className="adnMenu__item-name">{item.title}</span>
          </div>

          <BsChevronRight
            className={`adnMenu__item-arrow ${isOpened && "opened"}`}
          />
        </div>

        <div className={`adnMenu__item-content ${isOpened && "opened"}`}>
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} smallMenu={smallMenu} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink
        className={({ isActive }) =>
          `adnMenu__item plain ${isActive && "active"}`
        }
        to={`/admin${item.path}`}
        // onClick={() => setIsLoading(false)}
        // reloadDocument
      >
        <span className="adnMenu__item-icon">
          {iconChecker(item.icon, item.title)}
        </span>
        <span className="adnMenu__item-name">{item.title}</span>
      </NavLink>
    );
  }
};

export default MenuItem;
