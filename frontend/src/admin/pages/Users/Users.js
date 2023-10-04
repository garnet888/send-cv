import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../utils/Table/Table";

const Users = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const addButton = (
    <button className="outline-btn" onClick={() => navigate(pathname + "/form/add")}>
      Нэмэх
    </button>
  );

  const columns = [
    {
      Header: "Зураг",
      accessor: "photo",
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: "Овог",
      accessor: "name",
    },
    {
      Header: "Нэр",
      accessor: "username",
    },

    {
      Header: "И-Мэйл",
      accessor: "email",
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: "Утас",
      accessor: (data) => data.address.zipcode,
      // Cell: ({ value }) => <p style={{ minWidth: 400 }}>{value}</p>,
      disableSortBy: true,
      disableFilters: true,
    },
  ];

  return (
    <div>
      <Table
        currentHref={pathname}
        apiPath="/users"
        // apiSubPath={myID && `/byWriter/${myID}`}
        addButton={addButton}
        columns={columns}
      />
    </div>
  );
};

export default Users;
