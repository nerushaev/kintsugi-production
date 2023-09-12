import {
  SearchInput,
  SearchIcon,
  SearchForm,
  IconWrapper
} from './Search.styled.jsx';
import svg from '../../../assets/filterIcons.svg';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/search/search-slice.js';
import React from 'react';

export default function Search() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements[0];
    dispatch(setSearch(value));
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="Введіть назву товару"
        id="search"
        name="search" />
      <IconWrapper type="submit">
        <SearchIcon width="22" height="22">
          <use xlinkHref={`${svg}#icon-search`} />
        </SearchIcon>
        </IconWrapper>
        
    </SearchForm>
  )
}
