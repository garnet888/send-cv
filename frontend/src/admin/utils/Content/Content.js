import React from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import ROUTES from "../../routes";
import { getRouteFromTree } from "../../lib/Functions";
import { scrollToTop } from "../../../lib/Functions";
import UserForm from "../../pages/Users/UserForm";
import ReceivedCVForm from "../../pages/ReceivedCVs/ReceivedCVForm";
import WorkForm from "../../pages/Works/WorkForm";

import "./content.scss";

const Content = ({ smallMenu }) => {
  scrollToTop();

  const usersPaths = useRoutes([
    { path: "/users/add", element: <UserForm /> },
    { path: "/users/form/:id", element: <UserForm /> },
  ]);

  const cvsPaths = useRoutes([
    { path: "/received-cvs/add", element: <ReceivedCVForm /> },
    { path: "/received-cvs/form/:id", element: <ReceivedCVForm /> },
  ]);

  const worksPaths = useRoutes([
    { path: "/works/add", element: <WorkForm /> },
    { path: "/works/form/:id", element: <WorkForm /> },
  ]);

  const getRouteFromMenuItem = () => {
    return ROUTES.map((item, index) => getRouteFromTree(item, index, Route));
  };

  return (
    <main className={`content ${smallMenu && "bigContent"}`}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/users" />}
          loader={"Loading..."}
        />

        {getRouteFromMenuItem()}
      </Routes>

      {usersPaths}
      {cvsPaths}
      {worksPaths}
    </main>
  );
};

export default Content;
