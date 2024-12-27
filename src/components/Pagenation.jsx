import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";

import tw from "tailwind-styled-components";
import PropTypes from "prop-types";

Pagination.propTypes = {
  maxPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
};

export default function Pagination({ maxPage = 10, currentPage = 1 }) {
  const [width, setWidth] = useState(900);
  const [paginationArray, setPaginationArray] = useState([]);

  // 현재 페이지의 쿼리스트링을 제외한 나머지 쿼리스트링을 가져옴
  const location = useLocation();
  const currentSearchParams = new URLSearchParams(location.search)
    .toString()
    .replace(/page=\d+&?/g, "");

  // 브라우저 리사이즈 이벤트. width 상태 변경
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    } else {
      return () => {
        // cleanup
        window.removeEventListener("resize", () => {
          return null;
        });
      };
    }
  }, []);

  // 페이지네이션 배열 생성
  useEffect(() => {
    let viewPage = Math.floor(Number(width) / 56);
    if (viewPage > 21) {
      viewPage = 21;
    } else if (7 > viewPage) {
      viewPage = 7;
    } else if (viewPage % 2 === 0) {
      viewPage += 1;
    }
    let half = Math.floor(viewPage / 2);
    if (half % 2 !== 0) {
      half += 1;
    }

    if (maxPage > viewPage) {
      if (half - 1 > currentPage || currentPage > maxPage - (half - 2)) {
        let front = Array.from({ length: half - 1 }, (e, i) => i + 1);
        let back = Array.from(
          { length: half - 1 },
          (e, i) => i + maxPage - (half - 2),
        );
        setPaginationArray([...front, "...", ...back]);
      } else {
        let arr = Array.from(
          { length: viewPage - half },
          (e, i) => i + currentPage - Math.floor((viewPage - half) / 2),
        );
        setPaginationArray([1, "...", ...arr, "...", maxPage]);
      }
    } else {
      setPaginationArray(Array.from({ length: maxPage }, (e, i) => i + 1));
    }
  }, [maxPage, currentPage, width]);

  return (
    <div className="flex items-center justify-center w-full px-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center flex-1 gap-2">
          <ArrowBtn
            to={{
              pathname: location.pathname,
              search: `?${currentSearchParams}&page=${
                currentPage === maxPage ? "#" : currentPage - 1
              }`,
            }}
          >
            <IoChevronBackOutline />
          </ArrowBtn>
          {paginationArray.map((page, index) => {
            return (
              <PageBtn
                to={{
                  pathname: location.pathname,
                  search: `?${currentSearchParams}$page=${page}`,
                }}
                key={index}
                $isActive={currentPage === page}
              >
                {page}
              </PageBtn>
            );
          })}
          <>
            <ArrowBtn
              to={{
                pathname: location.pathname,
                search: `?${currentSearchParams}&page=${
                  currentPage === maxPage ? "#" : currentPage + 1
                }`,
              }}
            >
              <IoChevronForwardOutline />
            </ArrowBtn>
          </>
        </div>
      </div>
    </div>
  );
}

const BtnSquare = tw(Link)`
  w-8 h-8
  flex justify-center items-center
  rounded-md
  transition-all duration-300
`;
const PageBtn = tw(BtnSquare)`
  ${({ $isActive = false }) =>
    $isActive ? `bg-gray-500 text-white	` : `hover:bg-gray-100`}
`;
const ArrowBtn = tw(BtnSquare)`
  bg-gray-200
  hover:bg-gray-300
`;
