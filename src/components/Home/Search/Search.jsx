import {
  SearchInput,
  SearchIcon,
  SearchForm,
  IconWrapper,
} from "./Search.styled.jsx";
import svg from "../../../assets/filterIcons.svg";
import React from "react";
import useSearch from "../../../hooks/useSearch.js";

export default function Search() {
  const { searchRef, handleSearchSubmit } = useSearch();

  return (
    <SearchForm onSubmit={handleSearchSubmit}>
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
