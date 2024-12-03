import React from "react";
import Icons from "./Icons";

type PaginationProps = {
  id: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  displayRange?: number; // Optional prop, as it is not used directly in your code
};

const Pagination: React.FC<PaginationProps> = ({
  id,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      pages.push(1);
      if (startPage > 2) pages.push("ellipsis-left");
      for (
        let i = Math.max(2, startPage);
        i <= Math.min(endPage, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }
      if (endPage < totalPages - 1) pages.push("ellipsis-right");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  const handlePageClick = (
    pageNumber: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    onPageChange(pageNumber);
    if (!window.location.pathname.includes("organizer")) {
      scrollToElement();
    }
  };

  const scrollToElement = () => {
    if (window.location.pathname !== "/") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      setTimeout(() => {
        const element = document.getElementById("event");
        if (element) {
          const offsetPosition = element.offsetTop - 78;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  return (
    <div className="flex items-center justify-center pagination">
      <button
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
            if (!window.location.pathname.includes("organizer")) {
              scrollToElement();
            }
          }
        }}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 ${
          id === "type1"
            ? "text-white rounded-sm bg-secondary"
            : "rounded-[2px] bg-[#F4F4F5]"
        }`}
      >
        <Icons
          variant="prev"
          strokeColor={
            currentPage === 1 ? "#808080" : id === "type1" ? "white" : "#212529"
          }
        />
      </button>

      {pages.map((page, index) => {
        if (page === "ellipsis-left" || page === "ellipsis-right") {
          return (
            <span
              className={`${id === "type1" ? "mx-2 " : "mx-1 text-[#DB0279]"}`}
              key={index}
            >
              ....
            </span>
          );
        }

        return (
          <button
            key={index}
            onClick={(e) => handlePageClick(page as number, e)}
            className={`${
              currentPage === page
                ? "active mx-2 md:px-4 md:py-2 px-2 py-1 rounded-sm text-white bg-primary"
                : `md:px-4 md:py-2 mx-2 px-2 py-1 ${
                    id === "type1"
                      ? "rounded-sm text-white bg-secondary w-full"
                      : "rounded-md bg-[#F4F4F5] text-black"
                  }`
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            if (!window.location.pathname.includes("organizer")) {
              scrollToElement();
            }
          }
        }}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 ${
          id === "type1"
            ? "mx-1 text-white rounded-sm bg-secondary"
            : "mx-2 rounded-[2px] bg-[#F4F4F5]"
        }`}
      >
        <Icons
          variant="next"
          strokeColor={
            currentPage === totalPages
              ? "#808080"
              : id === "type1"
              ? "white"
              : "#212529"
          }
        />
      </button>
    </div>
  );
};

export default Pagination;
