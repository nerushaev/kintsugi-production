import React from "react"
import { FieldWrapper, Label, Select, Text } from "../../Fields/Fields.styled"

export const SelectInput = ({
  text,
  names,
  label,
  value,
  type,
  onChange
}) => {
  
  return (
    <>
      
        <Text accent={true}>{text}</Text>
      <FieldWrapper select>
        <Label noMargin>{label[0]}</Label>
      <Select
        noMargin
        name={names[0]}
        type={type}
        onChange={onChange}
        checked={value[0]}
        />
      </FieldWrapper>

      <FieldWrapper select> 
        <Label noMargin>{label[1]}</Label>
      <Select
        noMargin
        name={names[1]}
        type={type}
        onChange={onChange}
        checked={value[1]}
        />
      </FieldWrapper>
        
    </>
  )
}