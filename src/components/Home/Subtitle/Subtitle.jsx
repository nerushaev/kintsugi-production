import styled from 'styled-components';
import { theme } from '../../../styles/theme';



const Text = styled.p`
  font-size: ${props => props.$accent ? `${theme.fontSizes.large}` : `${theme.fontSizes.medium}`};
  font-weight: ${props => props.$accent ? '500' : '400'};
  margin-bottom: 10px;
  text-align: right;
`;

export default function Subtitle(props) {

  return (
      <Text $accent={props.accent}>{props.children}</Text>
  )
}
