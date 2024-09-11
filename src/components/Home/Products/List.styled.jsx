import styled from "styled-components";

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
    @media (min-width: 479px) {
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;

    }
    @media (min-width: 767px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;

    }
    @media (min-width: 1199px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 15px;

    }
`;

export const ListWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
`;