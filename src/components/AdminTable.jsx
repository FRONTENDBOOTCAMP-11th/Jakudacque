import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import PropTypes from "prop-types";

SearchBar.propTypes = {
  params: PropTypes.string,
};

export function SearchBar({ params }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = event => {
    event.preventDefault();
    navigate(`${params}?keyword=${keyword}`);
  };

  return (
    <div className="flex items-center justify-between w-1/3 p-2 pl-4 text-sm bg-white border rounded-full shadow-sm">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="flex-1 focus:outline-none"
        value={keyword}
        onChange={event => setKeyword(event.target.value)}
        onKeyDown={event => event.key === "Enter" && handleSearch(event)}
      />
      <button className="p-1" onClick={handleSearch}>
        <IoSearch />
      </button>
    </div>
  );
}

const TableTitle = tw.h1`
  text-2xl font-semibold
`;

const StyledTable = tw.table`
  w-full my-8
  table-auto
`;
const StyledThead = tw.thead`
  text-xs text-neutral-700 bg-neutral-50
`;
const StyledTh = tw.th`
  p-4 pl-2
  text-xs text-start
  border-b  
`;
const StyledTd = tw.td`
  p-2
  text-xs text-start
  border-b  
`;

export { TableTitle, StyledTable, StyledThead, StyledTh, StyledTd };
