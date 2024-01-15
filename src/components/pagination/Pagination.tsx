import "./Pagination.css";
import React from "react";
import { PaginationProps } from "./type";

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li className="page-item" key={i}>
          <a
            className="page-link"
            onClick={() => onPageChange(i)}
            style={{
              cursor: "pointer",
              fontWeight: currentPage === i ? "bold" : "normal",
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              &#60;
            </a>
          </li>

          {renderPageNumbers()}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <a
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              &#62;
            </a>
          </li>
        </ul>
      </nav>
      <select
        id="species"
        onChange={(e) => {
          onItemsPerPageChange?.(+e.target.value);
        }}
        value={itemsPerPage || 10}
      >
        {[10, 20, 50].map(itemsPerPage => (
          <option key={itemsPerPage} value={itemsPerPage}>
            {itemsPerPage}
          </option>
        ))}
      </select>
    </>
  );
};

export default Pagination;
