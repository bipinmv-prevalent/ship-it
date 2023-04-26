import { Fragment } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import Pagination from "./Pagination";
import '../styles/Table.css';

const Table = ({
  columns,
  data,
  loading,
  pageCount: controlledPageCount = 0,
  maxHeight = "",
  pageSizes = [],
  hiddenColumns = [],
  sorted = true,
  totalCount = 0,
  manualPagination = false,
  disablePagination = false,
  manualSortBy = true,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: pageSizes[0],
        hiddenColumns,
      },
      manualPagination,
      manualSortBy,
      pageCount: controlledPageCount,
      disableSortBy: !sorted,
    },
    useSortBy,
    usePagination
  );

  return loading ? (
    <div className="d-flex align-items-center justify-content-center">
      <span className="spin"></span>
    </div>
  ) : (
    <>
      <div className="dark-scroll" style={{ maxHeight, overflow: "auto" }}>
        <table className="table mb-0" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index.toString()} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    key={columnIndex.toString()}
                    {...column.getHeaderProps([
                      column.getSortByToggleProps(),
                      {
                        style: column.style ?? "",
                      },
                    ])}
                  >
                    {column.render("Header")}
                    {sorted && (
                      <span
                        className={
                          column.isSorted
                            ? column.isSortedDesc
                              ? "col-asc"
                              : "col-desc"
                            : column.disableSortBy
                              ? ""
                              : "col-unsort"
                        }
                      ></span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {data?.length > 0 ? (
              page.map((row, i) => {
                prepareRow(row);
                const rowProps = row.getRowProps();
                return (
                  <Fragment key={rowProps.key}>
                    <tr key={i.toString()} {...rowProps} className={row.isExpanded && "expanded"}>
                      {row.cells.map(cell => (
                        <td key={cell.value} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan={columns.length}>
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pageSizes[0] && !disablePagination && (
        <Pagination
          gotoPage={gotoPage}
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          setPageSize={setPageSize}
          nextPage={nextPage}
          pageSizes={pageSizes}
          totalCount={totalCount}
        />
      )}
    </>
  );
}

export default Table;