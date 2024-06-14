import { FaStar } from "react-icons/fa6";
import { IconContext } from "react-icons";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

export default function Score({score}) {
  return (
      <Wrapper>
      <IconContext.Provider value={{color: `${score >= 1 ? 'gold' : 'gray'}`}}>
      <FaStar />
      </IconContext.Provider>
      <IconContext.Provider value={{color: `${score >= 2 ? 'gold' : 'gray'}`}}>
      <FaStar />
      </IconContext.Provider>
      <IconContext.Provider value={{color: `${score >= 3 ? 'gold' : 'gray'}`}}>
      <FaStar />
      </IconContext.Provider>
      <IconContext.Provider value={{color: `${score >= 4 ? 'gold' : 'gray'}`}}>
      <FaStar />
      </IconContext.Provider>
      <IconContext.Provider value={{color: `${score >= 5 ? 'gold' : 'gray'}`}}>
      <FaStar />
      </IconContext.Provider>
      </Wrapper>
  )
}
