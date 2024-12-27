import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useQueryStr from "@hooks/useQueryStr";
import { IoSearch } from "react-icons/io5";
import PropTypes from "prop-types";

function SearchBar() {
  const [keyword, setKeyword] = useState(useQueryStr().get("keyword") || "");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = event => {
    event.preventDefault();
    navigate(`${location.pathname}?keyword=${keyword}`);
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

AdminSearchBar.propTypes = {
  children: PropTypes.node,
};

export default function AdminSearchBar({ children }) {
  return (
    <div className="flex justify-between mt-4">
      <SearchBar />
      {children}
    </div>
  );
}
