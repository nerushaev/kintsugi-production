import styled from "styled-components";
import {Text} from '../../pages/PublicOfferPage';
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function ErrorMessage({ message }) {
  return (
    <Wrapper>
      <Text>{message}</Text>
    </Wrapper>
  );
}
