import styled from "styled-components";
import { Select } from "../../../Busket/CheckoutPage/SelectInput";
import { theme } from "../../../../styles/theme";

export const CategoryWrapper = styled.div`
  background-color: white;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
`;
export const CategoryItem = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$active ? `${theme.colors.formButtonAccent}` : `${theme.colors.formButton}`};
  color: ${(props) => (props.$accent ? `${theme.colors.redAccent}` : "none")};
  cursor: pointer;
  font-size: ${theme.fontSizes.small};
  &:hover {
    background-color: ${theme.colors.formButtonAccent};
  }
`;

export const StyledSelectWrapper = styled.div`
  padding: 0 10px;
`;

export const StyledSelect = styled(Select)`
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: white;
  color: gray;
`;