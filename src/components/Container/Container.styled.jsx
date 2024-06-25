import styled from 'styled-components';

export const Container = styled.div`
margin: 0 auto;
// padding: 0 10px;
@media (min-width: 479px) {
  max-width: 440px;
}
@media (min-width: 767px) {
  max-width: 720px;
}
@media (min-width: 1199px) {
  max-width: 960px;
}
`;