import React from "react";
import { Button } from "./Button";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const handlePageChange = (page) => {
    if (!onPageChange) return;
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage === currentPage) return;
    onPageChange(nextPage);
  };

  return (
    <div className="flex items-center gap-2" role="navigation" aria-label="Pagination">
      <Button
        type="button"
        variant="outline"
        className="h-auto px-3 py-1.5 rounded-[3px] border border-[#0000004c]"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-[11px]">
          Previous
        </span>
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === currentPage ? "default" : "outline"}
          className={`h-auto px-3 py-1.5 rounded-[3px] ${
            page === currentPage ? "bg-[#09111e] text-white" : "border border-[#0000004c]"
          }`}
          onClick={() => handlePageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          <span className="[font-family:'Poppins',Helvetica] font-medium text-[11px]">
            {page}
          </span>
        </Button>
      ))}
      <Button
        type="button"
        variant="outline"
        className="h-auto px-3 py-1.5 rounded-[3px] border border-[#0000004c]"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="[font-family:'Poppins',Helvetica] font-medium text-[#000000] text-[11px]">
          Next
        </span>
      </Button>
    </div>
  );
};
