import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const PaginationItem = styled.p`
  content: "";
  width: 24px;
  height: 24px;
  background: ${(props) => (props.active ? "#EFCFE3" : "#F3F3F3")};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: ${(props) => (props.disable ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;
