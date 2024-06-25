import {
  SearchInput,
  SearchIcon,
  SearchForm,
  IconWrapper
} from './Search.styled.jsx';
import svg from '../../../assets/filterIcons.svg';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../../redux/search/search-slice.js';
import React, { useEffect, useRef } from 'react';

export default function Search({setSearchParams}) {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements[0];
    setSearchParams('page', 1)
    dispatch(setSearch(value));
  }

  useEffect(() => {
      if(!searchRef.current.value) {
        dispatch(setSearch(''));
      }
  }, [searchRef, dispatch])

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        ref={searchRef}
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
