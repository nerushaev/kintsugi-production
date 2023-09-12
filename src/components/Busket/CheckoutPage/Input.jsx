import React from "react";
import { FieldWrapper, Label, Input } from "../../Fields/Fields.styled";

export const Inputt = ({
  label,
  type,
  name,
  onChange,
  select,
  placeholder,
  value,
  disable,
  position,
  min,
  multiple,
  disabled,
}) => {
  return (
    <FieldWrapper select={select}>
      <Label position={position} htmlFor={name}>
        {label}
      </Label>
      <Input
        $disabled={disabled}
        min={min}
        disable={disable}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
        multiple={multiple}
      />
    </FieldWrapper>
  );
};
