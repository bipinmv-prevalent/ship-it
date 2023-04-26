import React, { useCallback } from "react";

const Pagination = ({
  pageOptions,
  pageIndex,
  gotoPage,
  pageSizes,
  setPageSize,
  pageSize,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  pageCount,
  totalCount,
}) => {
  const getPageNumbers = useCallback(() => {
    const pages = [];
    const totalPages = pageOptions.length;
    if (totalPages === 0) {
      return pages;
    }
    const items = totalPages < 2 ? 1 : 2;
    const currentUiPage = pageIndex + 1;
    let currentPage = pageIndex + 1;

    if (currentPage + items > totalPages) {
      const diff = totalPages - (currentPage + items);
      currentPage = currentPage + diff;
    }
    for (let i = currentPage; i <= currentPage + items; i++) {
      if (i !== 0) {
        pages.push(
          <button
            key={i.toString()}
            className={"page-number-btn " + (i === currentUiPage ? "active" : "")}
            onClick={() => gotoPage(i - 1)}
          >
            {i}
          </button>
        );
      }
    }
    return pages;
  }, [gotoPage, pageIndex, pageOptions.length]);

  const getPageCountText = () => {
    const currentpageStartCount = pageIndex * pageSize + 1;
    const currentPageEndCount = pageIndex * pageSize + pageSize;

    return ` ${currentpageStartCount} to ${currentPageEndCount > totalCount ? totalCount : currentPageEndCount
      }`;
  };

  return (
    <div className="pagination py-2 d-flex justify-content-between flex-wrap">
      <div className="mb-2">
        {pageSizes.map(ps => (
          <button
            key={ps}
            className={"page-number-btn " + (ps === pageSize ? "active" : "")}
            disabled={pageOptions.length === 0}
            onClick={() => setPageSize(ps)}
          >
            {ps}
          </button>
        ))}
        {totalCount > 0 && (
          <span className="u-font-white u-font-12 vertical-align-middle">
            {" "}
            Showing rows
            {" " + getPageCountText()} of {totalCount}
          </span>
        )}
      </div>

      <div>
        <button className="page-number-btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button className="page-number-btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        {getPageNumbers()}
        <button className="page-number-btn" onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button className="page-number-btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default React.memo(Pagination);
