import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { findInputError, isFormInvalid } from "./utils";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.$checkbox ? "space-between" : ""};
  align-items: ${props => props.$checkbox ? "center" : ""};
  padding-bottom: ${props => props.$checkbox ? "10px" : ""};
  gap: 8px;
  width: 100%;
  margin-bottom: 20px;
  grid-column-end: ${props => props.$grid ? "3" : ""};
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  color: ${theme.colors.black};
  font-weight: 600;
  text-transform: math-auto;
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 20px;
  font-weight: 500;
  border-width: 1px;
  border-radius: 6px;
  border-color: ${theme.colors.darkBlue};
  &::placeholder {
    opacity: 0.6;
  }
`;

const AnimatedP = styled(motion.p)`
  display: flex;
  align-items: center;
  gap: 3px;
  color: ${theme.colors.red};
`;

export const Input = ({ label, type, id, validation, name, placeholder, disabled = false }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <InputWrapper $checkbox={type === "checkbox"} $grid={name === "confirmPassword"}>
      <LabelWrapper>
        <Label htmlFor={id}>{label}</Label>
        <AnimatePresence mode="wait" initial={false}>
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
      </AnimatePresence>
      </LabelWrapper>
      <CustomInput
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validation)}
      />
    </InputWrapper>
  );
};

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
