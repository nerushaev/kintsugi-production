import styled from 'styled-components';

export const Container = styled.div`
margin: 0 auto;
margin-top: 20px;
padding: 0 10px;

@media (min-width: 479px) {
  // max-width: 540px;
}
@media (min-width: 767px) {
  // max-width: 720px;
padding: 0 20px;

}
@media (min-width: 1199px) {
  max-width: 1020px;
padding: 0 30px;

}
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
