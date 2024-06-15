import styled from "styled-components";
import { theme } from "../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  border: 1px solid red;
  margin-bottom: 10px;
  text-align: center;
`;

const Text = styled.p`
  font-size: ${(props) =>
    props.accent ? `${theme.fontSizes.large}` : `${theme.fontSizes.medium}`};
  font-weight: ${(props) => (props.accent ? "500" : "400")};
`;

export default function ErrorMessage({ message }) {
  return (
    <Wrapper>
      <Text>{message}</Text>
    </Wrapper>
  );
}
