import styled from 'styled-components';
import { theme } from '../../../styles/theme';



const Text = styled.p`
  font-size: ${props => props.$accent ? `${theme.fontSizes.large}` : `${theme.fontSizes.medium}`};
  font-weight: ${props => props.$accent ? '500' : '400'};
  margin-bottom: 10px;
  text-align: ${props => props.$center ? "center" : "right"};
`;

export default function Subtitle(props) {

  return (
      <Text $center={props.center} $accent={props.accent}>{props.children}</Text>
  )
}
