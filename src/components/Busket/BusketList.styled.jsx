import styled from "styled-components";

export const Item = styled.li`
  @media(min-width: 320px) and (max-width: 430px) {
    gap: 5px;
    justify-content: space-around;
  } 
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 0;
  margin-bottom: 30px;
`;

export const TextWrapper = styled.div`
    @media(min-width: 320px) and (max-width: 430px) {
    padding: 5px;
  }
  flex-basis: calc((100% - 150px) / 5);
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Title = styled.h3`
  font-size: 14px;
  @media(min-width: 320px) and (max-width: 430px) {
    font-size: 12px;
  }
`;

export const Image = styled.img`
  max-width: 100px;
`;

export const Text = styled.p`
  @media(min-width: 320px) and (max-width: 430px) {
    font-size: 12px;
  }
`;

export const List = styled.ul`
`;

export const IncrementButton = styled.span`
    width: 16px;
    height: 16px;
  @media (min-width: 700px) {
    width: 32px;
    height: 32px;
  }
  left: 85%;
  right: 50%;
  position: absolute;
`;

export const DecrementButton = styled.span`
    width: 16px;
    height: 16px;
  @media (min-width: 700px) {
    width: 32px;
    height: 32px;
  }
  left: 90%;
  right: 50%;
  position: absolute;
`;

