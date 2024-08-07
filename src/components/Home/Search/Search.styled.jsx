import styled from "styled-components";

export const SearchForm = styled.form`
  position: relative;
  min-width: 270px;
  margin-bottom: 20px;
  padding: 0 10px;
`;

export const SearchInput = styled.input`
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  padding: 10px 10px;
  border: 1px solid black;
`;

export const SearchIcon = styled.svg`
  fill: black;
  cursor: pointer;
`;

export const IconWrapper = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
`;
