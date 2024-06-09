import styled from "styled-components";

export const List = styled.ul`
  display: grid;
	grid-template-columns: 1fr 1fr;
  justify-content: center;
  @media(min-width: 479px) {
	  grid-template-columns: 1fr 1fr 1fr;
  }
  @media(min-width: 767px) {
	  grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media(min-width: 1199px) {
	  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const ListWrapper = styled.div`
  @media (max-width: 479px) {
    margin-bottom: 60px;
  }
`;