import styled from "styled-components";

export const FilterWrapper = styled.div`
  margin-bottom: 30px;
  @media (min-width: 480px) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  }
`;

export const FilterButton = styled.button`
  background-color: rgba(162, 210, 255, 1);
  border-radius: 5px;
  padding: 10px 15px;
  @media (min-width: 320px) and (max-width: 387px) {
    &:nth-child(3n+1),
    &:nth-child(2){
      margin-right: 15px;
      }
    &:nth-child(-n+3){
      margin-bottom: 15px;
      }
  }
  @media (min-width: 388px) and (max-width: 479px) {
    &:nth-child(-n+4){
      margin-bottom: 15px;
      margin-right: 15px;
    }
  }
`;