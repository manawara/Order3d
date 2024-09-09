"use client";
import { useContextPagination } from "@/context/PaginationContext";
import { PaginationType } from "@/types/Pagination.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Pagination = ({ postsPerPage, countData }: PaginationType) => {
  const { pageNumber, handleNextPage, handlePrevPage, handleChoosePage } =
    useContextPagination();
  const totalPage = Math.ceil(countData / postsPerPage) - 1;
  const page = (pageNumber + 1) * postsPerPage;
  const records = page > countData ? countData : page;
  let startPage = Math.max(0, pageNumber - 1);
  let endPage = Math.min(totalPage, pageNumber + 2);
  if (endPage - startPage + 1 < 4) {
    if (startPage === 0) {
      endPage = Math.min(totalPage, startPage + 3);
    } else if (endPage === totalPage) {
      startPage = Math.max(1, endPage - 3);
    }
  }
  return (
    <div className="py-2 px-4 flex justify-between">
      <div>
        {pageNumber === 0 && countData === 0
          ? 0
          : pageNumber === 1
          ? 1
          : pageNumber * postsPerPage + 1}{" "}
        do {records} z {countData} wpisów
      </div>
      <div className="flex items-center">
        <div className="size-7 flex items-center">
          {pageNumber > 0 && (
            <button onClick={handlePrevPage}>
              <ChevronLeft />
            </button>
          )}
        </div>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageActual = startPage + index;

          return (
            <button
              onClick={() => handleChoosePage(pageActual)}
              key={pageActual}
              className={`px-3 hover:scale-105 bg-green rounded py-1 mx-1 ${
                pageActual === pageNumber
                  ? "font-bold bg-greenLight text-green"
                  : ""
              }`}
            >
              {pageActual + 1}
            </button>
          );
        })}
        <div className="size-7 flex items-center">
          {pageNumber < totalPage && (
            <button onClick={handleNextPage}>
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
