import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 290px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  text-align: center;
  max-width: 500px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

export const Input = styled.input`
  display: block;
  min-width: 300px;
  height: 30px;
  border: none;
  border: 1px solid black;
  border-radius: 5px;
`;

export const Button = styled.button`
  margin-right: 15px;
  display: inline-block;
  font-weight: 500;
  border: none;
  border-radius: ${p => p.delete ? "2px" : "5px"};
  cursor: pointer;
  color: black;
  background-color: rgb(220,220,220);
  width: ${p => p.delete ? "50px" : "100px"};
  height: ${p => p.delete ? "20px" : "40px"};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover, :focus {
    background-color:	#008000;
    color: white;
    border-radius: ${p => p.delete ? "5px" : "10px"};
  }
`;

export const Select = styled.select`
  min-width: 280px;
`;

export const Option = styled.option`
  width: 300px;
`;

export const FieldContainer = styled.div`
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;