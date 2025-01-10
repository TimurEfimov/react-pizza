import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

type PaginationProps = {
  pages: number;
  per_page: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pages,
  per_page,
  onChangePage,
}) => {
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
};

export default Pagination;
