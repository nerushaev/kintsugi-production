import styled from "styled-components";
import { theme } from "../../styles/theme";

export const BusketList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: -5px;
  margin-left: -5px;
  margin-bottom: 30px;
  min-height: 300px;
  gap:40px;
`;

export const Item = styled.li`
  margin-left: 5px;
  margin-right: 5px;
  flex-basis: calc((100% - 30px) / 3);
  background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
`;

export const TextWrapper = styled.div`
  margin-bottom: 10px;
`;

export const Title = styled.p`
    font-size: ${theme.fontSizes.small};
    font-weight: 600;
    min-height: 50px;
`;

export const Image = styled.img`
`;

export const Text = styled.p`
  @media(min-width: 320px) and (max-width: 430px) {
    font-size: ${theme.fontSizes.small};
  }
`;

export const IncrementButton = styled.span`
    width: 32px;
    height: 32px;
    margin-right: 20px;
`;

export const DecrementButton = styled.span`
    width: 32px;
    height: 32px;
`;

