import { useDispatch, useSelector } from "react-redux";
import { restorePassword } from "../../../redux/auth/auth-operations";
import { Input } from "../../Input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectError, selectResponse } from "../../../redux/auth/auth-selectors";
import {CustomForm, InputsWrapper, ButtonWrapper, Button, ErrorMessage} from "../../Form/Form.styled";
import { restorePasswordSchema } from "../../../helpers/restorePasswordSchema";

export default function RestorePassForm() {
  const methods = useForm({ resolver: yupResolver(restorePasswordSchema) });
  const response = useSelector(selectResponse);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const onSubmit = methods.handleSubmit((data) => {
    dispatch(restorePassword(data));
  });

  const email_input = {
    name: 'email',
    label: 'Пошта',
    type: 'text',
    id: 'email',
    placeholder: 'Введіть вашу пошту',
  }

  return (
    <FormProvider {...methods}>
      <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
        <InputsWrapper $oneInput>
          <Input {...email_input} />
        </InputsWrapper>
        <ButtonWrapper>
        {response && <ErrorMessage>{response.message}</ErrorMessage>}
          <Button onClick={onSubmit}>
            <GrMail />
            Відновити пароль
          </Button>
        </ButtonWrapper>
      </CustomForm>
    </FormProvider>
  );
}
