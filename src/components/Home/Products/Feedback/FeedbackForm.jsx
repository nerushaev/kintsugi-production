import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/auth-selectors";
import { useParams } from "react-router";
import { addFeedback } from "../../../../redux/feedback/feedback-operations";
import ScoreInput from "./ScoreInput";
import styled from 'styled-components';
import { useAuth } from "../../../../hooks/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import {CustomForm, InputsWrapper, ButtonWrapper, Button, ErrorMessage} from "../../../Form/Form.styled";
import { Input } from "../../../Input/Input";
import { feedbackSchema } from "../../../../helpers/feedbackSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export default function FeedbackForm() {
  const methods = useForm(
    { resolver: yupResolver(feedbackSchema) }
    );
  const user = useSelector(selectUser);
  const {isLoggedIn} = useAuth();
  const dispatch = useDispatch();
  const { name, email } = user;
  const {product_id} = useParams();
  const [scoreError, setScoreError] = useState(null);
  const [score, setScore] = useState(0);

  const onSubmit = methods.handleSubmit((data) => {
    if(score === 0) {
      setScoreError("Оцініть товар!")
    } else {
      console.log(data);
      dispatch(addFeedback(
        {
          name,
          email,
          product_id,
          score,
          comment: data.comment
        }
      ))
    }
    console.log(scoreError);
    // const {comment} = data;
    // const newComment = {
    //   name,
    //   email,
    //   score,
    //   comment,
    //   product_id: product_id
    // };
  });

  const comment_input = {
    name: 'comment',
    label: 'Ваш коментар',
    type: 'text',
    id: 'comment',
    placeholder: 'Введіть вашу коментар',
  }

  return (
    <FormProvider {...methods}>
    <CustomForm onSubmit={(e) => e.preventDefault()} noValidate>
    <ScoreWrapper>
        <p>Ваша оцінка:</p>
        <ScoreInput setScore={setScore} />
        </ScoreWrapper>
      <InputsWrapper $oneInput >
      <Input {...comment_input} />
      </InputsWrapper>
      <ButtonWrapper>
        {scoreError && <ErrorMessage>{scoreError}</ErrorMessage>}
        
      {!isLoggedIn && <ErrorMessage message="Коментувати можуть лише зареєстровані користувачі!"/>}
      <Button disabled={!isLoggedIn} onClick={onSubmit}>Відправити</Button> 
      </ButtonWrapper>
    </CustomForm>
    </FormProvider>
  );
}
