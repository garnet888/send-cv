import React, { useState } from "react";
import { ImSearch } from "react-icons/im";

import "./searchInput.scss";

const SearchInput = ({ setValue }) => {
  const [search, setSearch] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setValue(e.target.value);
    }
  };

  const onChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setValue("");
    }
  };

  return (
    <div className="searchInput">
      <input
        className="searchInput__input"
        placeholder="Хайх..."
        onKeyDown={handleKeyDown}
        onChange={onChange}
      />

      <button
        className="searchInput__button no-btn"
        onClick={() => setValue(search)}
      >
        <ImSearch fontSize={18} />
      </button>
    </div>
  );
};

export default SearchInput;
