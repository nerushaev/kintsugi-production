import styled from "styled-components";

export const List = styled.ul`
  display: flex;
	flex-wrap: wrap;
  justify-content: center;
	margin-right: -5px;
	margin-left: -5px;

`;

export const ListWrapper = styled.div`
  @media (max-width: 479px) {
    margin-bottom: 60px;
  }
`;