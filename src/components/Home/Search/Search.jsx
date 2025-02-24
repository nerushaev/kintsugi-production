import {
  SearchInput,
  SearchIcon,
  SearchForm,
  IconWrapper,
} from "./Search.styled.jsx";
import svg from "../../../assets/filterIcons.svg";
import React from "react";
import useSearch from "../../../hooks/useSearch.js";
import { StyledSelect, StyledSelectWrapper } from "../Products/Filter/Filter.styled.jsx";
import useFilters from "../../../hooks/useFilter.js";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  display:flex;
  gap: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
`;

export default function Search() {
  const { searchRef, handleSearchSubmit } = useSearch();

  const { price, handleFilterChange } = useFilters();

  const handlePriceFilter = (e) => {
    const { value } = e.target;
    handleFilterChange("price", value === "none" ? "" : value);
  };

  return (
    <Wrapper>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput
          ref={searchRef}
          type="text"
          placeholder="Введіть назву"
          id="search"
          name="search"
        />
        <IconWrapper type="submit">
          <SearchIcon width="22" height="22">
            <use xlinkHref={`${svg}#icon-search`} />
          </SearchIcon>
        </IconWrapper>
      </SearchForm>
      <StyledSelectWrapper>
        <StyledSelect
          value={!price ? "none" : price}
          onChange={handlePriceFilter}
        >
          <option value="none">Спочатку нові товари</option>
          <option value="low">За зростанням ціни</option>
          <option value="high">За зменшенням ціни</option>
        </StyledSelect>
      </StyledSelectWrapper>
    </Wrapper>
  );
}
