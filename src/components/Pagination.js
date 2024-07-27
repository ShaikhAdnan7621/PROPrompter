"use client";
import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-2">
      <ul className="flex gap-2">
        {currentPage > 1 && (
          <li>
            <button
              className="h-full px-3 py-1 rounded bg-green-700 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <AiFillCaretLeft className="text-xl"  />
            </button>
          </li>
        )}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`px-3 py-1 rounded ${currentPage === pageNumber
                  ? "bg-green-700 text-white"
                  : "bg-green-700 text-white hover:bg-green-700"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              className="h-full px-3 py-1 rounded bg-green-700 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <AiFillCaretRight className="text-xl" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;