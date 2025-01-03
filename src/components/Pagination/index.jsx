import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

export default function Pagination({ pages, per_page, onChangePage }) {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={per_page}
        pageCount={pages}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
