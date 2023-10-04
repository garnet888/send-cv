import React from "react";
import { BiSearch } from "react-icons/bi";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <div className="rcTable__headerContainer-filterCol">
      <BiSearch />

      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default ColumnFilter;
