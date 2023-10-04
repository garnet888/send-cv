import { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { BiSortDown, BiSortUp, BiSortAlt2 } from "react-icons/bi";
import { MdDeleteForever, MdOutlineMore } from "react-icons/md";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

export function renderActions({
  data_id,
  rowIdx,
  currentHref,
  navigate,
  showAlert,
  setDeletingRow,
  seeDetailOnClick,
  disableDeleteAct,
  disableSeeDetailAct,
}) {
  function _deleteOnClick() {
    setDeletingRow(rowIdx);
    showAlert(data_id, "Та устгахдаа итгэлтэй байна уу?");
  }

  function _seeDetailOnClick() {
    if (seeDetailOnClick) {
      seeDetailOnClick();
    } else {
      navigate(currentHref + "/form/" + data_id);
    }
  }

  return (
    <div
      className={`rcTable__actionsContainer ${
        disableDeleteAct || disableSeeDetailAct
          ? "rcTable__actionsContainer--disabledButton"
          : null
      }`}
    >
      {disableDeleteAct ? null : (
        <button
          key="delete"
          className="rcTable__actionsContainer-btn"
          onClick={() => _deleteOnClick()}
        >
          <MdDeleteForever className="deleteBtn" size={30} />
        </button>
      )}

      {disableSeeDetailAct ? null : (
        <button
          key="seeDetail"
          className="rcTable__actionsContainer-btn"
          onClick={() => _seeDetailOnClick()}
        >
          <MdOutlineMore className="seeDetailBtn" size={32} />
        </button>
      )}
    </div>
  );
}

export function RenderTable({
  data,
  columns,
  rowCount,
  perPage = rowCount ? rowCount : 10,
  addButton,
  deletingRow,
  disableSearch,
  disablePagination,
  disableRowCount,
  disableGotoPage,
}) {
  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    setGlobalFilter,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { globalFilter, pageIndex, pageSize },
  } = useTable(
    {
      data,
      columns,
      initialState: { pageSize: perPage },
      defaultColumn,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const tableMode = disablePagination ? rows : page;
  const isPhoto = columns.find((col) => col.accessor === "photo");

  function getRowCount() {
    const count = [10, 20, 30, 40, 50];
    let isDuplicate = false;

    for (const val of count) {
      if (perPage === val) {
        isDuplicate = true;
      }
    }

    if (isDuplicate === false) {
      count.push(perPage);
    }

    return count.sort((a, b) => {
      return a - b;
    });
  }

  function renderSortIcon({ column, func }) {
    let COLUMN = null;

    if (!column?.disableSortBy) {
      COLUMN = (
        <div className="rcTable__headerContainer-iconBox" {...func}>
          {column.isSorted ? (
            column.isSortedDesc ? (
              <BiSortUp />
            ) : (
              <BiSortDown />
            )
          ) : (
            <BiSortAlt2 />
          )}
        </div>
      );
    }

    return COLUMN;
  }

  return (
    <div className="rcTable">
      <div className="rcTable__heading">
        {disableSearch ? (
          <div />
        ) : (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}

        {addButton}
      </div>

      <div className={`tbContent ${isPhoto && "withPhoto"}`}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div className="rcTable__headerContainer">
                      {column.render("Header")}

                      {column.originalId
                        ? null
                        : renderSortIcon({
                            column,
                            func: column.getHeaderProps(
                              column.getSortByToggleProps()
                            ),
                          })}
                    </div>

                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {tableMode.map((row, idx) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  className={`${deletingRow === idx && "tbDeletingRow"}`}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {disablePagination || (
        <div className="rcTable__pagination">
          {disableRowCount || (
            <select
              className="rcTable__pagination-colCount"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {getRowCount().map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}ш мөр
                </option>
              ))}
            </select>
          )}

          <div className="rcTable__pagination-page">
            <button
              className="rcTable__pagination-page-btn"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              className="rcTable__pagination-page-btn"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <FaAngleLeft />
            </button>

            <b>
              {pageIndex + 1} / {pageOptions.length}
            </b>

            <button
              className="rcTable__pagination-page-btn"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <FaAngleRight />
            </button>
            <button
              className="rcTable__pagination-page-btn"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <FaAngleDoubleRight />
            </button>
          </div>

          {disableGotoPage || (
            <div className="rcTable__pagination-gotoPage">
              Хуудас:
              <input
                className="rcTable__pagination-gotoPage-pageNumber"
                type="number"
                min="1"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
