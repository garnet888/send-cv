import React, { useEffect, useState } from "react";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import ReactPaginate from "react-paginate";
import SearchInput from "../ui/searchInput/SearchInput";
import JobCard from "../components/JobCard/JobCard";
import JobMenu from "../components/JobMenu/JobMenu";
import Axios from "../Axios";

const JobList = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [sortJobType, setSortJobType] = useState("");
  const [sortTimeType, setSortTimeType] = useState("");

  /* ========== Paginate  =================================== */
  const perPage = 10;
  const [dataLength, setDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (e) => {
    setIsLoading(true);
    const newOffset = (e.selected * perPage) % dataLength;

    setCurrentPage(newOffset);
  };
  /* ======================================================== */

  useEffect(() => {
    const DATA = {
      searchValue,
      jobTypeID: sortJobType,
      timeTypeID: sortTimeType,
      offset: currentPage,
      limit: perPage,
    };

    Axios.post("/jobs/get-sorting", DATA)
      .then((res) => {
        if (res.data) {
          const { data } = res;

          setData(data);
          setDataLength(data[0].total_count);

          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  }, [searchValue, sortJobType, sortTimeType, currentPage, perPage]);

  return (
    <div className="jobList">
      <JobMenu
        daraaArilga={isLoading}
        sortJobType={sortJobType}
        sortTimeType={sortTimeType}
        setSortJobType={setSortJobType}
        setSortTimeType={setSortTimeType}
      />

      <div className="jobList__content">
        <div className="jobList__content-search">
          <SearchInput value={searchValue} setValue={setSearchValue} />
        </div>

        {data.map((item, idx) => (
          <JobCard key={idx} data={item} />
        ))}

        <ReactPaginate
          breakLabel="..."
          nextLabel={<TiChevronRight color="white" />}
          previousLabel={<TiChevronLeft color="white" />}
          pageRangeDisplayed={window.innerWidth <= 430 ? 2 : 5}
          pageCount={Math.ceil(dataLength / perPage)}
          onPageChange={handlePageClick}
          /*======== CLASSNAMES ======================*/
          containerClassName="pagiContainer"
          nextClassName="pagiContainer__nextBtn"
          previousClassName="pagiContainer__prevBtn"
          activeLinkClassName="pagiContainer__active"
          disabledClassName="pagiContainer__disabled"
          pageLinkClassName="pagiContainer__page"
          breakLinkClassName="pagiContainer__break"
          /*==========================================*/
        />
      </div>
    </div>
  );
};

export default JobList;
