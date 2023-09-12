import styled from "styled-components";

export const CityList = styled.ul`
  display: ${(props) => (props.disable ? "none" : "block")};
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px;
  margin-top: -20px;
  @media (min-width: 480px) {
    margin-top: -30px;
  }
  @media (min-width: 768px) {
    margin-top: -40px;
  }
  @media (min-width: 768px) {
    margin-top: -50px;
  }
`;

export const CityItem = styled.li`
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px solid black;
  &:hover,
  &:focus {
    background-color: rgb(0, 0, 0, 0.1);
  }
`;
