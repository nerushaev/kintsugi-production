import React from 'react'
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Label = styled.label`
color: ${theme.colors.black};
font-size: ${theme.fontSizes.medium};
font-weight: 500;
text-transform: math-auto;
display: flex;
gap: 10px;
align-items: center;
justify-content: flex-start;
position: relative;
margin-bottom: 20px;
`;

const CheckboxInput = styled.input`
  content: "";
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 6px;
`;

export default function Checkbox({label, type, id, validation, name}) {
  const {
    register,
  } = useFormContext();

  return (
    <Label>{label}
    <CheckboxInput type={type} {...register(name)}/>
    </Label>
  )
}
