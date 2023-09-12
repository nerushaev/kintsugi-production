import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid black;
  border-collapse: collapse;
`;

export const Caption = styled.caption`
  margin-bottom: 20px;
  font-size: 20px;
`;

export const Th = styled.th`
  border: 1px solid black;

`;

export const Tr = styled.tr`
  border: 1px solid black;
  &:hover, &:focus {
    background-color: lightsalmon;
  }
`;