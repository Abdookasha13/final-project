import { useLocation, useNavigate } from "react-router-dom";
import "./SearchInput.css";
import { useRef, useState } from "react";
const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lastPage = useRef("/");
  if (pathname !== "/search") {
    lastPage.current = pathname;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/search/" + searchTerm);
    }
    if (e.target.value.trim() === "") {
      navigate(lastPage.current);
    }
  };
  return (
    <>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchInput;
