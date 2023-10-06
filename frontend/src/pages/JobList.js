import React, { useEffect, useState } from "react";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import ReactPaginate from "react-paginate";
import SearchInput from "../ui/searchInput/SearchInput";
import JobCard from "../components/JobCard/JobCard";
import JobMenu from "../components/JobMenu/JobMenu";

const JobList = () => {
  /* ========== Paginate  =================================== */
  const perPage = 10;
  const [dataLength, setDataLength] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (e) => {
    // setIsLoading(true);
    const newOffset = (e.selected * perPage) % dataLength;

    setCurrentPage(newOffset);
  };
  /* ======================================================== */

  useEffect(() => {
    setDataLength(20);
  }, [currentPage]);

  return (
    <div className="jobList">
      <JobMenu />

      <div className="jobList__content">
        <div className="jobList__content-search">
          <SearchInput />
        </div>

        {[...Array(dataLength - perPage)].map((_, idx) => (
          <JobCard key={idx} id={idx} />
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
