import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../utils/Table/Table";

const Jobs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const addButton = (
    <button
      className="outline-btn"
      onClick={() => navigate(pathname + "/form/add")}
    >
      Нэмэх
    </button>
  );

  const columns = [
    {
      Header: "Нэр",
      accessor: "name",
    },
    {
      Header: "Ажиллах цагийн төрөл",
      accessor: "time_type",
      disableSortBy: true,
    },

    {
      Header: "Ажлын чиглэл",
      accessor: "job_type",
      disableSortBy: true,
    },
    {
      Header: "Доод цалин",
      accessor: "min_salary",
      Cell: ({ value }) => new Intl.NumberFormat().format(value) + "₮",
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: "Дээд цалин",
      accessor: "max_salary",
      Cell: ({ value }) => new Intl.NumberFormat().format(value) + "₮",
      disableSortBy: true,
      disableFilters: true,
    },
  ];

  return (
    <Table
      currentHref={pathname}
      apiPath="/jobs"
      addButton={addButton}
      columns={columns}
      disableSearch
    />
  );
};

export default Jobs;
