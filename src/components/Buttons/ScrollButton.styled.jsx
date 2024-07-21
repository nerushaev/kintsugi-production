import styled from 'styled-components'; 

export const Heading = styled.h1` 
text-align: center; 
color: black; 
`; 

export const Content = styled.div` 
overflowY: scroll; 
height: 2500px; 
`; 

export const Button = styled.div` 
position: fixed; 
width: 70px;
right: 0; 
bottom: 0; 
height: 70px; 
display: flex;
justify-content: center;
font-size: 3rem; 
z-index: 1000; 
cursor: pointer; 
color: pink; 
`
