import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const useSearch = (initialValue = "") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef();
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (!searchParam) {
      searchRef.current.value = "";
    } else {
      searchRef.current.value = searchParam;
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements[0];
    searchParams.set("page", 1);
    searchParams.set("search", value);
    setSearchParams(searchParams);
    setSearchTerm(value);  // сохраняем значение в состоянии
  };

  return { searchRef, searchTerm, handleSearchSubmit };
};

export default useSearch;
