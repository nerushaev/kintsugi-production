import {
  SearchInput,
  SearchIcon,
  SearchForm,
  IconWrapper,
} from "./Search.styled.jsx";
import svg from "../../../assets/filterIcons.svg";
import React, { useEffect, useRef } from "react";

export default function Search({ setSearchParams, searchParams }) {
  const searchRef = useRef();
  const searchParam = searchParams.get("search");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements[0];
    searchParams.set("page", 1);
    searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParam) {
      searchRef.current.value = '';
    } else {
      searchRef.current.value = searchParam;
    }
  }, [searchParam, searchRef]);

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        ref={searchRef}
        type="text"
        placeholder="Введіть назву товару"
        id="search"
        name="search"
      />
      <IconWrapper type="submit">
        <SearchIcon width="22" height="22">
          <use xlinkHref={`${svg}#icon-search`} />
        </SearchIcon>
      </IconWrapper>
    </SearchForm>
  );
}
