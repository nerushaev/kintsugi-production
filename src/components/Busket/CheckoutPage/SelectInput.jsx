import React from "react"
import { useFormContext } from "react-hook-form";
import styled from 'styled-components';
import { theme } from "../../../styles/theme";
import { findInputError, isFormInvalid } from "../../Input/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 20px 0;
  padding-right: 15%;
  padding-left: 20px;
  border-radius: 6px;
  border: 1px solid black;
  background: url(https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-down-20.png)
  no-repeat;
  background-position-x: 95%;
  background-position-y: 50%;
`;

const Label = styled.label`
color: ${theme.colors.black};
font-weight: 600;
text-transform: math-auto;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AnimatedP = styled(motion.p)`
  display: flex;
  align-items: center;
  gap: 3px;
  color: ${theme.colors.red};
`;

export const SelectInput = ({
  data,
  name,
  label,
}) => {
  const {
    register,
    formState: {errors}
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <Wrapper>
      <LabelWrapper>
    <Label htmlFor={name}>{label}</Label>
    <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
      </LabelWrapper>
      <Select
      type="select"
      name={name}
      {...register(name)}
    >
      {data.map((elt, index) => (
        <option key={index} value={elt.value}>
          {elt.label}
        </option>
      ))}
    </Select>
    </Wrapper>
  )
}

export const InputError = ({ message }) => {
  return (
    <AnimatedP {...framer_error}>
      <MdError />
      {message}
    </AnimatedP>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};